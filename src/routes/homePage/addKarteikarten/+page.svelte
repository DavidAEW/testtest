<!--- Karteikarten hinzufuegen --->
<script>

	import { onMount } from 'svelte';

	let userInputFront = "";
	let userInputBack = "";
	let cardContentFront = "";
	let cardContentBack = "";
	let selectedOption = "";
	let options = [];

	async function getOptions() {
		const API_URL = "http://localhost:3001/SelectAllFromStack"; // Ersetzen Sie dies mit Ihrer tatsächlichen API-URL

		const response = await fetch(API_URL);
		const data = await response.json();

		options = data.map((item) => ({
			value: item.stackid,
			label: item.stackname,
		}));


	}
	onMount(getOptions);

	// Funktion, die aufgerufen wird, wenn sich die Auswahl ändert
	function handleChange(event) {
		selectedOption = event.target.value;
	}


	//funktion um den inhalt der karteikarten nach button klick anzuzeigen
	function showCardContent() {
		cardContentFront = userInputFront;
		cardContentBack = userInputBack;
	}


	function save() {
		sendData();
		userInputFront = "";
		userInputBack = "";
	}

	function back() {
		window.location.href = "/homePage";
	}

	async function sendData() {
		if (!userInputFront || !userInputBack || !selectedOption) {
			alert("Bitte füllen Sie alle Felder aus!");
			return;
		}

		const API_URL = "http://localhost:3001/InsertCardBackCardFrontInCard"; // Ersetzen Sie dies mit Ihrer tatsächlichen API-URL

		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				front: userInputFront,
				back: userInputBack,
				stackid: selectedOption,
			}),

		});

		if (response.ok) {
			alert("Karteikarte erfolgreich hinzugefügt!");
			// Leeren Sie die Felder nach erfolgreicher送信ung
			userInputFront = "";
			userInputBack = "";
			//selectedOption = "";
		} else {
			alert("Fehler beim Senden der Daten. Bitte versuchen Sie es erneut.");
		}
	}
	function handleInput(event) {
		const textarea = event.target;
		if (textarea.value.length > 100) { // Adjust the limit as needed
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

		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Deck wählen</h2>

				<select
					class="dark:bg-primary-60 block appearance-none w-full bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

					on:change={handleChange}
				>
					{#each options as option}
						<option value="{option.value}">{option.label}</option>
					{/each}
				</select>
			</div>
		</div>

	</div>





	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 ">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
			<textarea class="dark:bg-primary-60 dark:text-primary-400 border border-gray-300 p-2 w-full text-primary-900" placeholder="Geben Sie Ihren Text hier ein" bind:value={userInputFront} on:input={handleInput}></textarea>

		</div>
	</div>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Rückseite</h2>
			<textarea class="dark:bg-primary-60 dark:text-primary-400 border border-gray-300 p-2 w-full text-primary-900" placeholder="Geben Sie Ihren Text hier ein" bind:value={userInputBack} on:input={handleInput}></textarea>
		</div>

	</div>

	<div class="flex justify-center mt-5 mb-5">
		<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded">
			+
		</button>
		<button class="mr-10 md:mr-16 ml-10 md:ml-16 bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded" on:click={save}>
			Karteikarte hinzufügen</button>

		<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded" on:click={back}>
			Zurück
		</button>
	</div>

</main>
