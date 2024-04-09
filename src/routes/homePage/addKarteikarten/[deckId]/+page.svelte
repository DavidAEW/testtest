<!--- Karteikarten hinzufuegen --->
<script>
	// Importieren Sie die Funktionen, die Sie benötigen
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Deklaration der Variablen
	let deckId = 0;
	let userInputFront = '';
	let userInputBack = '';
	let options = [];

	// Funktion, um die Optionen für das Dropdown-Menü zu laden
	async function getOptions() {
		const API_URL = 'http://localhost:3001/Deck';
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


	// Funktion, um die Optionen für das Dropdown-Menü zu laden und den Slug-Wert zu setzen
	async function loadOptionsAndSetValue() {
		await getOptions();
		deckId = $page.params.deckId;
		const selectElement = document.querySelector('select');
		selectElement.value = deckId;
	}

	// Funktion, um die Optionen für das Dropdown-Menü zu laden und den Slug-Wert zu setzen
	onMount(() => {
		loadOptionsAndSetValue();
	});


	function getLabelForDeckId(deckId) {
		const firstoption = options.find((firstoption) => firstoption.value === deckId);
		return firstoption ? firstoption.label : null;
	}

	// Funktion, die aufgerufen wird, wenn sich die Auswahl ändert
	function handleChange(event) {
		goto('/homePage/addKarteikarten/' + event.target.value);
	}



	// Funktionen, um die Daten an die Funktion zum Sender der Daten an die Datenbank auszuführen und die Eingabefelder zu leeren
	function save() {
		sendData();
		userInputFront = '';
		userInputBack = '';
	}

	// Funktion, um zur Startseite zurückzukehren
	function back() {
		goto('/homePage');
	}

	// Funktion, um die Daten an die Datenbank zu senden
	async function sendData() {
		if (!userInputFront || !userInputBack) {
			alert('Bitte füllen Sie alle Felder aus!');
			return;
		}

		const API_URL = 'http://localhost:3001/Card';
		const response = await fetch(API_URL, {
			method: 'POST',
			credentials: 'include', //mitbringen des Cookies
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				front: userInputFront,
				back: userInputBack,
				deckId: deckId
			})
		});

		if (response.ok) {
			alert('Karteikarte erfolgreich hinzugefügt!');
			// Leeren der Felder nach erfolgreicher Übermittlung der Daten
			userInputFront = '';
			userInputBack = '';
		} else {
			alert('Fehler beim Senden der Daten. Bitte versuchen Sie es erneut.');
		}
	}

	// Funktion, um die Höhe des Textfelds automatisch anzupassen
	function handleInput(event) {
		const textarea = event.target;
		if (textarea.value.length > 100) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		} else {
			textarea.style.height = 'auto';
		}
	}
</script>

<main>
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="space-y-5">
			<h1 class="text-4xl text-center">Karteikarten hinzufügen</h1>
		</div>
	</div>
	<div>
		<!-- Dropdown-Menü, um das Deck auszuwählen -->
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Deck wählen</h2>

				<select
					class="dark:bg-primary-60 block appearance-none w-full bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					on:change={handleChange}
				>
					{#if options.length === 0}
						{#await getOptions()}
							<option value="">Laden...</option>
						{:then}
							{#each options as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						{:catch error}
							<option value="">Fehler beim Laden</option>
						{/await}
					{:else}
						{#each options as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					{/if}
				</select>
			</div>
		</div>
	</div>

	<!-- Box um den Inhalt der Vorderseite einzugeben -->
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
			<textarea
				class="dark:bg-primary-60 dark:text-primary-400 border border-gray-300 p-2 w-full text-primary-900"
				placeholder="Geben Sie Ihren Text hier ein"
				bind:value={userInputFront}
				on:input={handleInput}
			></textarea>
		</div>
	</div>

	<!-- Box um den Inhalt der Rückseite einzugeben -->
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Rückseite</h2>
			<textarea
				class="dark:bg-primary-60 dark:text-primary-400 border border-gray-300 p-2 w-full text-primary-900"
				placeholder="Geben Sie Ihren Text hier ein"
				bind:value={userInputBack}
				on:input={handleInput}
			></textarea>
		</div>
	</div>

	<!-- Button zum Speichern der Daten und zum Zurückkehren zur Startseite -->
	<div class="flex justify-center mt-5 mb-5">
		<button
			class="mr-10 md:mr-16 ml-10 md:ml-16 bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={save}
		>
			Karteikarte hinzufügen</button
		>

		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={back}
		>
			Zurück
		</button>
	</div>
</main>
