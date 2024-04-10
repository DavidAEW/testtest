<!--- Study --->
<script>
	// Imortieren der benötigten Funktionen und Stores
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Circle2 } from 'svelte-loading-spinners';
  // Initialisieren der Variablen
	export let data;
	let deckId = $page.params.deckId;
	let cardStatus = $page.params.cardStatus;

	const cardOptions = [
		{ value: 0, label: 'neu' },
		{ value: 1, label: 'etwas gelernt' },
		{ value: 2, label: 'kann ich teilweise' },
		{ value: 3, label: 'kann ich' }
	];
	let showBack = false;
	// Funktion um Variable showBack zu ändern, um die Rückseite der Karte anzuzeigen oder zu verstecken
	function toggleBack() {
		showBack = !showBack;
	}
	// Funktion um zurück zur Home-Seite zu navigieren
	function back() {
		goto('/homePage');
	}




	// Funktion um den Status einer Karte zu aktualisieren
	async function updateCardStatus(cardId, learnStatus, front, back, deckId) {
		const API_URL = `http://localhost:3001/Card`;
		const response = await fetch(
			API_URL, {
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

		showBack = false;

	}

	// Funktion um die Deck-ID zu ändern
	async function handleChangeStatus(event) {
		goto(`/homePage/studyDeck/${deckId}/${event.target.value}/`);
		showBack = false;

	}

	// Funktion um die Status zu ändern
	async function handleChangeID(event) {
		window.location.href = `/homePage/studyDeck/${event.target.value}/${cardStatus}/`;

		showBack = false;

	}

	// Funktion um die Optionen zu laden und die Werte zu setzen
	async function loadOptionsAndSetValue() {
		await data.decks;
		await data.cardData;
		deckId = $page.params.deckId;
		cardStatus = $page.params.cardStatus;
		const selectElement = document.querySelector('select');
		selectElement.value = deckId;
		const selectElementStatus = document.querySelector('select[name="cardStatus"]');
		selectElementStatus.value = cardStatus;
	}


	// Führt die Funktionen aus, wenn die Seite geladen wird
	onMount(async () => {
		await loadOptionsAndSetValue();
	});
</script>

<main>
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<!--- Dropdowns um Deck und Status zu wählen --->
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 flex-row flex">
			{#await data.decks}
				<span><Circle2 /></span>
			{:then decks}
				<h2 class="font-bold mb-2 text-center text-primary-900 my-auto mr-2">Stapel</h2>
				<select
					class="border border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60 mr-4"
					bind:value={deckId}
					on:change={handleChangeID}
				>
					{#each decks as deck}
						<option value={deck.value}>
							{deck.label}
						</option>
					{/each}
				</select>
			{/await}

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

	{#await data.cardData}
		<span><Circle2 /></span>
	{:then cardData}
	<!--- Vorderseite zeigen wenn möglich --->
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

		<!-- Button um die Rückseite der Karte anzuzeigen oder zu verstecken -->
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
				on:click={toggleBack}
			>
				{showBack ? 'Antwort ausblenden' : 'Antwort zeigen'}
			</button>
		</div>


	<!-- Anzeigen der Rückseite der Karte, wenn verfügbar und gewolllt -->

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
					on:click={() =>
						updateCardStatus(cardData.cardId, 1, cardData?.front, cardData?.back, deckId)}
				>
					kann ich nicht
				</button>
				<button
					class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
					on:click={() =>
						updateCardStatus(cardData.cardId, 2, cardData?.front, cardData?.back, deckId)}
				>
					kann ich bisschen
				</button>
				<button
					class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
					on:click={() =>
						updateCardStatus(cardData.cardId, 3, cardData?.front, cardData?.back, deckId)}
				>
					kann ich gut
				</button>
			</div>
		{/if}
		
		<!-- Buttons um den Lernstatus der Karte zu aktualisieren -->
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
			on:click={() => updateCardStatus(cardData.cardId, 1, cardData?.front, cardData?.back, deckId)}
			>
			kann ich nicht
		</button>
		<button
		class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
		on:click={() => updateCardStatus(cardData.cardId, 2, cardData?.front, cardData?.back, deckId)}
		>
		kann ich bisschen
	</button>
	<button
	class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
	on:click={() => updateCardStatus(cardData.cardId, 3, cardData?.front, cardData?.back, deckId)}
	>
	kann ich gut
</button>
</div>
{:catch}
<!-- Wenn keine Karte gefunden wurde, wird dies angezeigt -->
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
{/await}


	<!-- Buttons zum Navigieren -->
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={back}
		>
			Zurück
		</button>
	</div>
</main>
