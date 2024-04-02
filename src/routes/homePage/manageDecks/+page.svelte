<script>

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let deckName = '';
	let message = '';
	let options = [];
	let deckId = '';
	let message1 = '';


	async function addDeck() {
		const API_URL = 'http://localhost:3001/decks/create';
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ deckName }),
				credentials: 'include' 
			});

			if (!response.ok) {
				throw new Error('Netzwerkantwort war nicht ok');
			}

			const data = await response.json();
			console.log('Erfolg:', data);
			message = 'Stapel erfolgreich erstellt!';
			deckName = '';
			await getOptions();
			setTimeout(() => {
				message = '';
			}, 5000);
		} catch (error) {
			console.error('Fehler:', error);
			message = 'Fehler beim Erstellen des Stapels.';
		}
	}
	async function getOptions() {
		const API_URL = 'http://localhost:3001/SelectAllFromDeck'; 
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
				value: item.deckId,
				label: item.deckName
			}));
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}
	onMount(() => {
		getOptions();
	});

	function handleChange(event) {
		deckId = event.target.value;
		console.log('selectedOption:', deckId);
	}

	async function deleteDeck(deckId) {
		const isConfirmed = confirm('Bist du sicher, dass du diesen Stapel löschen möchtest?');
    
    if (!isConfirmed) {
        return;
    }
		const API_URL = 'http://localhost:3001/deleteDecks';
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ deckId }),
				credentials: 'include'
			});

			if (!response.ok) {
				throw new Error('Netzwerkantwort war nicht ok');
			}

			const data = await response.json();
			console.log('Erfolg:', data);
			message1 = 'Stapel erfolgreich gelöscht!';
			await getOptions();
			setTimeout(() => {
				message1 = '';
			}, 5000);
		} catch (error) {
			console.error('Fehler:', error);
			message1 = 'Fehler beim Löschen des Stapels.';
		}
	}
	function back() {
		goto('/homePage');
	}
</script>
<main class="h-full flex flex-row justify-center items-center flex-wrap">
	<div class="text-center w-1/3 p-4 border-r border-gray-300">
		<h1 class="text-3xl font-bold mb-4 text-primary-100">Neuen Stapel hinzufügen</h1>
		<div class="mb-4">
			<input type="text" placeholder="Stapelname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-background-0 border-primary-250 placeholder-primary-300 text-primary-400" bind:value={deckName}>
		</div>
		<button on:click={addDeck} class="bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
			Stapel hinzufügen
		</button>
		{#if message}
			<p class="mt-4 text-primary-200">{message}</p>
		{/if}
	</div>
	<div class="text-center w-1/3 p-4 border-gray-300">
		<h1 class="text-3xl font-bold mb-4 text-primary-100">Stapel löschen</h1>
		<div class="mb-4">
			<select class="dark:bg-primary-60 block appearance-none w-full bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" on:change={handleChange}>
				<option value="">Wählen Sie einen Stapel aus</option>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
		<button on:click={deleteDeck(deckId)} class="bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
			Stapel löschen
		</button>
		{#if message1}
			<p class="mt-4 text-primary-200">{message1}</p>
		{/if}
	</div>
	<div class="w-full p-4 text-center">
		<button on:click={back} class="bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
			Zurück
		</button>
	</div>
</main>
