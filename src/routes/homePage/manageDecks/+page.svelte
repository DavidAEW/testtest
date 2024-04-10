<script>
	// Importiere die Funktionen onMount und goto
	import { Circle2 } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';
	export let data;

	// Deklaration der Variablen
	let deckName = '';
	let message = '';
	let options = [];
	let deckId = '';
	let message1 = '';

// Funktion um einen neuen Stapel hinzuzufügen
	async function addDeck() {
		const API_URL = 'https://cardhubserver.azurewebsites.net/Deck';
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
			message = 'Stapel erfolgreich erstellt!';
			deckName = '';
			window.location.reload();
		} catch (error) {
			console.error('Fehler:', error);
			message = 'Fehler beim Erstellen des Stapels.';
		}
	}

	// Funktion um den ausgewählten Stapel zu speichern
	function handleChange(event) {
		deckId = event.target.value;
	}

	// Funktion um einen Stapel zu löschen
	async function deleteDeck(deckId) {
		const isConfirmed = confirm('Bist du sicher, dass du diesen Stapel löschen möchtest?');
    
    if (!isConfirmed) {
        return;
    }
		const API_URL = 'https://cardhubserver.azurewebsites.net/Deck';
		try {
			const response = await fetch(API_URL, {
				method: 'DELETE',
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
			message1 = 'Stapel erfolgreich gelöscht!';
			window.location.reload();
		} catch (error) {
			console.error('Fehler:', error);
			message1 = 'Fehler beim Löschen des Stapels.';
		}
	}

	// Funktion um zur Startseite zurückzukehren
	function back() {
		goto('/homePage');
	}
</script>
<main class="h-full flex flex-row justify-center items-center flex-wrap">
	<!-- Formular um einen neuen Stapel hinzuzufügen -->
	<div class="text-center w-1/3 p-4 border-r border-gray-300">
		<h1 class="text-3xl font-bold mb-4 text-primary-100">Neuen Stapel hinzufügen</h1>
		<div class="mb-4">
			<input type="text" placeholder="Stapelname" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-background-0 border-primary-250 placeholder-primary-300 text-primary-400" bind:value={deckName}>
		</div>
		<button on:click={addDeck} class="bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
			Stapel hinzufügen
		</button>
		{#if message}
			<p class="mt-4 text-primary-200">{message}</p>
		{/if}
	</div>
	<!-- Formular um einen Stapel zu löschen -->
	<div class="text-center w-1/3 p-4 border-gray-300">
		<h1 class="text-3xl font-bold mb-4 text-primary-100">Stapel löschen</h1>
		<div class="mb-4">
			{#await data.decks}
				<span><Circle2 /></span>
			{:then decks} 
			<select class="dark:bg-primary-60 block appearance-none w-full bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" on:change={handleChange}>
				<option value="">Wählen Sie einen Stapel aus</option>
				{#each decks as deck}
					<option value={deck.value}>{deck.label}</option>
				{/each}
			</select>
				
			{/await}
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
