<script>
	import { goto } from '$app/navigation';

	let selectedFile;
	let deckName = ''; // Variable für den Decknamen
	let cards = []; // Variable für die Karten aus der Datei
	let message = '';

	function handleFileInput(event) {
		selectedFile = event.target.files[0];
		// Wenn eine Datei ausgewählt wurde, lesen wir sie ein und speichern die Karten
		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = function (event) {
				cards = JSON.parse(event.target.result); // Die Karten aus der Datei speichern
			};
			reader.readAsText(selectedFile);
		}
	}

	function back() {
		goto('/homePage');
	}
	let success = false;
	async function handleUpload() {
		success = false;
		if (cards.length > 0 && deckName.trim() !== '') {
			// Erstellen des Formulardatenobjekts

			try {
				// Senden der Daten an den Server
				const response = await fetch('https://cardhubserver.azurewebsites.net/importCards', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include',
					body: JSON.stringify({
						cards: cards,
						deckName: deckName
					})
				});

				if (!response.ok) {
					throw new Error('Netzwerkantwort war nicht ok');
				}

				const data = await response.json();
				console.log('Response:', data);

				success = true;
				message = 'Karten erfolgreich importiert';
			} catch (error) {
				console.error('Fehler beim Hochladen der Datei:', error);
				message = 'Fehler beim Hochladen der Datei';
			}
		} else {
			message = 'Bitte wählen Sie eine Datei aus und geben Sie einen Decknamen ein';
		}
	}
</script>

<main class="h-full flex flex-col space-y-6">
	<div class="flex flex-col items-center mt-16 space-y-6">
		<h1>Upload JSON File</h1>
		<input type="file" accept=".json" on:change={handleFileInput} />
		<input class="text-black" type="text" placeholder="Deckname" bind:value={deckName} />
		{#if !success}
			<p class="text-red-500">{message}</p>
		{:else}
			<p class="text-green-500">{message}</p>
		{/if}
	</div>
	<div class="max-w-xs mx-auto flex flex-col space-y-4">
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={handleUpload}
		>
			Upload
		</button>
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={back}
		>
			Zurück
		</button>
	</div>
</main>
