<!--- Study --->
<script>
import { onMount } from 'svelte';
	let showBack = false;
	function toggleBack() {
		showBack = !showBack;
	}
	function back() {
		window.location.href = "/homePage";
	}
	let cardData = null;
	let error = null;

async function getOptions() {
	const API_URL = "http://localhost:3001/GetRandomCardWithStatus0"; // Ersetzen Sie dies mit Ihrer tatsächlichen API-URL

	const response = await fetch(API_URL);
	const data = await response.json();
	console.log(data);

	if (response.ok) {
		cardData = data;
	} else {
		error = data.error;
	}
}
async function updateCardStatus(cardId) {
	const API_URL = `http://localhost:3001/UpdateCardStatusTo1`; // Update URL with your endpoint

	const response = await fetch(API_URL, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: "include",
		body: JSON.stringify({
			front: cardData.front,
			back: cardData.back,
			newCardStatus: 1 // Set status to 1 (learned)
		})
	});

	if (!response.ok) {
		window.location.reload();
		console.error('Error updating card status:', await response.text());
		return;
	}

	console.log('Card status updated successfully!');
	// You can optionally fetch a new card here
	window.location.reload();
	getOptions();
}

async function updateCardStatusTo2(cardId) {
	const API_URL = `http://localhost:3001/UpdateCardStatusTo2`; // Update URL with your endpoint

	const response = await fetch(API_URL, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: "include",
		body: JSON.stringify({
			front: cardData.front,
			back: cardData.back,
			newCardStatus: 2 // Set status to 1 (learned)
		})
	});

	if (!response.ok) {
		window.location.reload();
		console.error('Error updating card status:', await response.text());
		return;
	}

	console.log('Card status updated successfully!');
	// You can optionally fetch a new card here
	window.location.reload();
	getOptions();
}

async function updateCardStatusTo3(cardId) {
	const API_URL = `http://localhost:3001/UpdateCardStatusTo3`; // Update URL with your endpoint

	const response = await fetch(API_URL, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: "include",
		body: JSON.stringify({
			front: cardData.front,
			back: cardData.back,
			newCardStatus: 3 // Set status to 1 (learned)
		})
	});

	if (!response.ok) {
		window.location.reload();
		console.error('Error updating card status:', await response.text());
		return;
	}

	console.log('Card status updated successfully!');
	// You can optionally fetch a new card here
	window.location.reload();
	getOptions();
}


onMount(getOptions);




</script>
<main>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 ">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
			<div class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60">
				{cardData?.front}
			</div>
		</div>
	</div>

	{#if error}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Fehler!</h2>
				<div class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60">
					{error} </div>
			</div>
		</div>
	{/if}
	{#if !cardData}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Glückwunsch, keine neue Karte gefunden!</h2>
				<div class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60">
					Du hast alle neuen Karten gelernt! Füge neue Karten hinzu oder lerne alte Karten erneut, um diese weiter zu festigen.
				</div>
			</div>
		</div>
	{/if}

	<div class="container h-full mx-auto flex justify-center items-center mt-4">

	<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"  on:click={toggleBack}>
		{showBack ? "Antwort ausblenden" : "Antwort zeigen"}
	</button>
</div>

	{#if showBack}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 ">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Rückseite</h2>
				<div class="border border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60">
					{cardData?.back}
				</div>
			</div>
		</div>
		<div class="container h-full mx-auto flex justify-center items-center mt-4">

			<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16" on:click={() => updateCardStatus(cardData.id)}>
				gelernt
			</button>
			<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16" on:click={() => updateCardStatusTo2(cardData.id)}>
			kann ich fast
			</button>
			<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded" on:click={() => updateCardStatusTo3(cardData.id)}>
				weiß ich
			</button>
			
		</div>
	{/if}

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
	<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded" on:click={back}>
		Zurück
	</button>
	</div>
	
</main>
