<!--- Karteikarten hinzufuegen --->
<script>

	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';




	let userInputFront = "";
	let userInputBack = "";
	let cardContentFront = "";
	let cardContentBack = "";
	let selectedOption = "";

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
				//deck: selectedOption,
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

				<select class="dark:bg-primary-60 block appearance-none w-full bg-primary-0 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								value={selectedOption}
								on:change={handleChange}>
					<option value="">Bitte auswählen</option>
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</select>
			</div>
		</div>

	</div>





	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 ">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
			<textarea class="dark:bg-primary-60 dark:text-primary-400 border border-gray-300 p-2 w-full h-32 text-primary-900" placeholder="Geben Sie Ihren Text hier ein" bind:value={userInputFront}></textarea>

		</div>
	</div>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Rückseite</h2>
			<textarea class="dark:bg-primary-60 border border-gray-300 p-2 w-full h-32 text-primary-900 dark:text-primary-400" placeholder="Geben Sie Ihren Text hier ein" bind:value={userInputBack}></textarea>
		</div>

	</div>

	<div class="flex justify-center mt-5">
		<button class="bg-accent-300 hover:bg-primary-60 hover:text-text-400 text-text-50 font-bold py-2 px-4 rounded"  on:click={sendData}>
			+
		</button>
		<button class="mr-10 md:mr-16 ml-10 md:ml-16 bg-accent-300 hover:bg-primary-60 hover:text-text-400 text-text-50 font-bold py-2 px-4 rounded" on:click={save}>
			Karteikarte hinzufügen</button>

		<button class="bg-accent-300 hover:bg-primary-60 hover:text-text-400 text-text-50 font-bold py-2 px-4 rounded" on:click={back}>
			Zurück
		</button>
	</div>

	<div>
		<p class="mt-2 whitespace-pre-line text-primary-50">{cardContentFront}</p>
		<p class="mt-2 whitespace-pre-line text-primary-50">{cardContentBack}</p>
		<p class="mt-2 whitespace-pre-line text-primary-50">{selectedOption}</p>
	</div>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<h2>
		<a href = "/homePage" class="text-blue-600 hover:text-blue-800 underline">Click here to go back!</a>
		</h2>
	</div>
</main>
