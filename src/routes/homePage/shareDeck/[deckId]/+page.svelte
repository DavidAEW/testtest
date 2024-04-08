<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let deckId = $page.params.deckId;

	let options = [];

	async function getOptions() {
		const API_URL = 'http://localhost:3001/Deck';
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

			options = data.map((item) => ({
				value: item.deckId,
				label: item.deckName
			}));
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}

	async function handleChange(event) {
		goto('/homePage/shareDeck/' + event.target.value + '/');
	}
	
	async function loadOptionsAndSetValue() {
		await getOptions();
		deckId = $page.params.deckId;
		const selectElement = document.querySelector('select');
		selectElement.value = deckId;
	}

	onMount(() => {
		loadOptionsAndSetValue();
	});

	function back() {
		goto('/homePage');
	}
	
	let cards = [];
	async function exportCards() {
    const API_URL = `http://localhost:3001/exportCards/${deckId}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }

        const data = await response.json();
        cards = data.cards;
		const deckName = data.deckName;
        const jsonCards = JSON.stringify(cards);

        const blob = new Blob([jsonCards], { type: 'application/json' });

        // Create temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${deckName}_cards.json`;
        link.click();
    } catch (error) {
        console.error('Fehler beim Exportieren der Karten:', error);
    }
}

</script>

<main class="h-full flex flex-col">
	<div class="flex flex-col items-center mt-16">
		{#if options.length > 0}
			<h2 class="text-2xl font-bold mb-5">Choose a deck</h2>
			<select
				class="bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4"
				bind:value={deckId}
				on:change={handleChange}
			>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{/if}
	</div>
	<div class="max-w-xs mx-auto flex flex-col space-y-4">
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={exportCards}
		>
			Karten exportieren
		</button>
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={back}
		>
			Zurück
		</button>
	</div>
</main>
