<script>
	import { onMount } from 'svelte';

	let options = [];

	async function getOptions() {
		const API_URL = 'http://localhost:3001/SelectAllFromDeck';
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

    let selectedOption = '';

function handleChange(event) {
    selectedOption = event.target.value;
    console.log(selectedOption);
}

    onMount(() => {		
		getOptions();
	});

    async function exportCards() {
    if (!selectedOption) {
        console.log('Keine Deck-ID ausgewählt');
        return;
    }
   
    const API_URL = `http://localhost:3001/exportCards/${selectedOption}`;
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
        console.log('Exportierte Karten:', data);
        // Hier kannst du weitere Logik hinzufügen, z.B. die Daten im UI anzeigen oder herunterladen
    } catch (error) {
        console.error('Fehler beim Exportieren der Karten:', error);
    }
}


</script>

<main class="h-full flex flex-col">
    <div class="flex-grow flex flex-col items-center mt-16">
{#if options.length > 0}
			<h2 class="text-2xl font-bold mb-5">Choose a deck</h2>
			<select
				class="bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4"
				on:change={handleChange}
			>
				<option value="">Choose a deck</option>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{/if}

    </div>

    <button on:click={exportCards} class="bg-primary-70  text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4">
        Karten exportieren
    </button>
    

    </main>