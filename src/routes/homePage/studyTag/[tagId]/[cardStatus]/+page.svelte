<!--- Study --->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let tagId = $page.params.tagId;
	let cardStatus = $page.params.cardStatus;
	let tagOptions = [];
	const cardOptions = [
		{ value: 0, label: 'neu' },
		{ value: 1, label: 'etwas gelernt' },
		{ value: 2, label: 'kann ich teilweise' },
		{ value: 3, label: 'kann ich' }
	];
	let showBack = false;
	console.log('tagId: ' + tagId);
	console.log('cardStatus: ' + cardStatus);
	function toggleBack() {
		showBack = !showBack;
	}
	function back() {
		goto('/homePage');
	}
	let cardData = null;
	let error = null;

	async function getTagOptions() {
		const API_URL = 'http://localhost:3001/Tag';
		try {
			const response = await fetch(
				API_URL,

				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include'
				}
			);
			const data = await response.json();

			tagOptions = data.map((item) => ({
				value: item.tagId,
				label: item.tagName
			}));
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}

	async function getCards() {
		const API_URL = `http://localhost:3001/Card/${cardStatus}/tagId/${tagId}`;
		try {
			const response = await fetch(API_URL, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
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

	async function updateCardStatus(cardId, learnStatus, front, back, deckId) {
		const API_URL = `http://localhost:3001/Card`;

		const response = await fetch(API_URL, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cardId: Number(cardId),
				cardStatus: Number(learnStatus),
				front: front,
				back: back,
				deckId: deckId
			})
		});

		if (!response.ok) {
			console.error('Error updating card status:', await response.text());
			return;
		}

		console.log('Card status updated successfully!');
		showBack = false;
		await getCards();
	}

	async function handleChangeStatus(event) {
		goto('/homePage/studyTag/' + tagId + '/' + event.target.value + '/');
		await getCards();
	}
	async function handleChangeID(event) {
		goto('/homePage/studyTag/' + event.target.value + '/' + cardStatus + '/');
		await getCards();
	}
	async function loadOptionsAndSetValue() {
		await getTagOptions();
		tagId = $page.params.tagId;
		cardStatus = $page.params.cardStatus;
		const selectElement = document.querySelector('select');
		selectElement.value = tagId;
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
			<h2 class="font-bold mb-2 text-center text-primary-900 my-auto mr-2">Tag</h2>
			<select
				class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60 mr-4"
				bind:value={tagId}
				on:change={handleChangeID}
			>
				{#each tagOptions as tagOption}
					<option value={tagOption.value}>{tagOption.label}</option>
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
				on:click={() => updateCardStatus(cardData.cardId, 1, cardData?.front, cardData?.back, cardData.deckId)}
			>
				kann ich nicht
			</button>
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
				on:click={() => updateCardStatus(cardData.cardId, 2, cardData?.front, cardData?.back, cardData.deckId)}
			>
				kann ich bisschen
			</button>
			<button	
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
				on:click={() => updateCardStatus(cardData.cardId, 3, cardData?.front, cardData?.back, cardData.deckId)}
			>
				kann ich gut
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
