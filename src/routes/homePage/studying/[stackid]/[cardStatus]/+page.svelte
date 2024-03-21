<!--- Study --->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let stackId = $page.params.stackid;
	let cardStatus = $page.params.cardStatus;
	let options = [];
	const cardOptions = [
		{ value: 0, label: 'neu' },
		{ value: 1, label: 'etwas gelernt' },
		{ value: 2, label: 'kann ich teilweise' },
		{ value: 3, label: 'kann ich' }
	];
	let showBack = false;
	console.log("stackId: "+stackId);
	console.log("cardStatus: "+cardStatus);
	function toggleBack() {
		showBack = !showBack;
	}
	function back() {
		goto('/homePage');
	}
	let cardData = null;
	let error = null;


	async function getDecks() {
		const API_URL = 'http://localhost:3001/SelectAllFromStack';
		const response = await fetch(API_URL);
		const data = await response.json();

		options = data.map((item) => ({
			value: item.stackid,
			label: item.stackname
		}));
	}

	async function getCards() {
		const API_URL = 'http://localhost:3001/GetRandomCardWithStatus';
try {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			cardStatus: Number(cardStatus),
			stackId: Number(stackId)
		})
	});
	const data = await response.json();
	console.log(data);

	if (response.ok) {
		cardData = data;
	} else {
		error = data.error;
	}
}catch(error) {
	console.error('Fehler beim Laden der Karten:', error);
	cardData = null;
}
	}
	async function updateCardStatus(cardId) {
		const API_URL = `http://localhost:3001/UpdateCardStatusTo1`;

		const response = await fetch(API_URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				front: cardData.front,
				back: cardData.back,
				newCardStatus: 1 // Set status to 1 (learned)
			})
		});

		if (!response.ok) {
			//window.location.reload();
			console.error('Error updating card status:', await response.text());
			return;
		}

		console.log('Card status updated successfully!');
		// You can optionally fetch a new card here
		//window.location.reload();
		await getCards();
	}

	async function updateCardStatusTo2(cardId) {
		const API_URL = `http://localhost:3001/UpdateCardStatusTo2`; // Update URL with your endpoint

		const response = await fetch(API_URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				front: cardData.front,
				back: cardData.back,
				newCardStatus: 2 // Set status to 1 (learned)
			})
		});

		if (!response.ok) {
			//window.location.reload();
			console.error('Error updating card status:', await response.text());
			return;
		}

		console.log('Card status updated successfully!');
		// You can optionally fetch a new card here
		//window.location.reload();
		await getCards();
	}

	async function updateCardStatusTo3(cardId) {
		const API_URL = `http://localhost:3001/UpdateCardStatusTo3`; // Update URL with your endpoint

		const response = await fetch(API_URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				front: cardData.front,
				back: cardData.back,
				newCardStatus: 3 // Set status to 1 (learned)
			})
		});

		if (!response.ok) {
			//window.location.reload();
			console.error('Error updating card status:', await response.text());
			return;
		}

		console.log('Card status updated successfully!');
		// You can optionally fetch a new card here
		//window.location.reload();
		await getCards();
	}

	async function handleChangeStatus(event) {
		goto('/homePage/studying/'+stackId+'/'+event.target.value+'/');
		console.log(cardStatus);
		await getCards();
	}
	async function handleChangeID(event) {
		goto('/homePage/studying/'+event.target.value+'/'+cardStatus+'/');
		console.log(cardStatus);
		await getCards();
	}

	onMount(() => {
		getDecks();
		getCards();
	});
</script>

<main>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Wähle deinen Stapel</h2>

			<select class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60" bind:value={stackId} on:change={handleChangeID}>
				{#each options as option}
					<option value={option.value}>
						{option.label}
					</option>
				{/each}
			</select>
		</div>
	<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
		<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Wähle deinen Status</h2>

		<select class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60" bind:value={cardStatus} on:change={handleChangeStatus}>
				{#each cardOptions as option}
					<option value={option.value}>
						{option.label}
					</option>
				{/each}
			</select>
		</div>
	</div>


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

	{#if error}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Fehler!</h2>
				<div
					class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				>
					{error}
				</div>
			</div>
		</div>
	{/if}
	{#if !cardData}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">
					Glückwunsch, keine neue Karte gefunden!
				</h2>
				<div
					class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				>
					Du hast alle neuen Karten gelernt! Füge neue Karten hinzu oder lerne alte Karten erneut,
					um diese weiter zu festigen.
				</div>
			</div>
		</div>
	{/if}

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={toggleBack}
		>
			{showBack ? 'Antwort ausblenden' : 'Antwort zeigen'}
		</button>
	</div>

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
				on:click={() => updateCardStatus(cardData.id)}
			>
				gelernt
			</button>
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
				on:click={() => updateCardStatusTo2(cardData.id)}
			>
				kann ich fast
			</button>
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
				on:click={() => updateCardStatusTo3(cardData.id)}
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
