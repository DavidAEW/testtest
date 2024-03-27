<!--- Study --->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let stackid = $page.params.stackid;
	let cardStatus = $page.params.cardStatus;
	let options = [];
	const cardOptions = [
		{ value: 0, label: 'neu' },
		{ value: 1, label: 'etwas gelernt' },
		{ value: 2, label: 'kann ich teilweise' },
		{ value: 3, label: 'kann ich' }
	];
	let showBack = false;
	console.log('stackId: ' + stackid);
	console.log('cardStatus: ' + cardStatus);
	function toggleBack() {
		showBack = !showBack;
	}
	function back() {
		goto('/homePage');
	}
	let cardData = null;
	let error = null;

	async function getDecks() {
		const API_URL = 'http://localhost:3001/SelectAllFromStack'; // Ersetzen Sie dies mit Ihrer tatsächlichen API-URL
		try {
			const response = await fetch(API_URL,

				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include'
				});
			const data = await response.json();

			options = data.map((item) => ({
				value: item.stackid,
				label: item.stackname
			}));
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}

	async function getCards() {
		const API_URL = 'http://localhost:3001/GetRandomCardWithStatus';
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					cardStatus: Number(cardStatus),
					stackId: Number(stackid)
				})
			});
			const data = await response.json();
			console.log(data);

			if (response.ok) {
				cardData = data;
			} else {
				error = data.error;
			}
		} catch (error) {
			console.error('Fehler beim Laden der Karten:', error);
			cardData = null;
		}
	}
	async function updateCardStatus(cardId, learnStatus) {
		const API_URL = `http://localhost:3001/UpdateCardStatus`;

		const response = await fetch(API_URL, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				front: cardData.front,
				back: cardData.back,
				newCardStatus: Number(learnStatus)
			})
		});

		if (!response.ok) {
			console.error('Error updating card status:', await response.text());
			return;
		}

		console.log('Card status updated successfully!');
		// You can optionally fetch a new card here
		await getCards();
	}

	async function handleChangeStatus(event) {
		goto('/homePage/studying/' + stackid + '/' + event.target.value + '/');
		await getCards();
	}
	async function handleChangeID(event) {
		goto('/homePage/studying/' + event.target.value + '/' + cardStatus + '/');
		await getCards();
	}
	async function loadOptionsAndSetValue() {
		await getDecks();
		stackid = $page.params.stackid;
		cardStatus = $page.params.cardStatus;
		const selectElement = document.querySelector('select');
		selectElement.value = stackid;
		const selectElementStatus = document.querySelector('select[name="cardStatus"]');
		selectElementStatus.value = cardStatus;
	}
	onMount(() => {
		loadOptionsAndSetValue();
		getCards();
	});
</script>

<main>
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 flex-row flex">
			<h2 class="font-bold mb-2 text-center text-primary-900 my-auto mr-2">Stapel</h2>
			<select
				class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60 mr-4"
				bind:value={stackid}
				on:change={handleChangeID}
			>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>

			<h2 class="font-bold mb-2 text-center text-primary-900 my-auto mr-2">Status</h2>

			<select
				name="cardStatus"
				class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				bind:value={cardStatus}
				on:change={handleChangeStatus}
			>
				{#each cardOptions as cardoption}
					<option value={cardoption.value}>{cardoption.label}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if !cardData}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">
					Glückwunsch, keine neue Karte gefunden!
				</h2>
				<div
					class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				>
					Du hast alle Karten mit diesem Status/in diesem Deck gelernt! Füge neue Karten hinzu oder
					lerne alte Karten erneut, um diese weiter zu festigen.
				</div>
			</div>
		</div>
	{/if}

	{#if cardData}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
				<div
					class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				>
					{cardData?.front}
				</div>
			</div>
		</div>

		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
				on:click={toggleBack}
			>
				{showBack ? 'Antwort ausblenden' : 'Antwort zeigen'}
			</button>
		</div>
	{/if}

	{#if showBack}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Rückseite</h2>
				<div
					class="border border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				>
					{cardData?.back}
				</div>
			</div>
		</div>
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
				on:click={() => updateCardStatus(cardData.id, 1)}
			>
				gelernt
			</button>
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
				on:click={() => updateCardStatus(cardData.id, 2)}
			>
				kann ich fast
			</button>
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
				on:click={() => updateCardStatus(cardData.id, 3)}
			>
				weiß ich
			</button>
		</div>
	{/if}

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={back}
		>
			Zurück
		</button>
	</div>
</main>
