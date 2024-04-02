<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let data = [];
	let deck;
	let status;
	let options = [];
	let deckId = $page.params.deckId;

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
	async function loadOptionsAndSetValue() {
		await getOptions();
		deckId = $page.params.deckId;
		const selectElement = document.querySelector('select');
		selectElement.value = deckId;
	}

	async function getAll(selectedOption) {
		const API_URL = 'http://localhost:3001/SelectAllFromCardWithDeck'; // Ersetzen Sie dies mit Ihrer tatsächlichen API-URL
		const options = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ selectedOption })
		};

		const response = await fetch(API_URL, options);
		const data = await response.json();
		return data;
	}

	onMount(async () => {
		loadOptionsAndSetValue();
		try {
			data = await getAll(deckId);
			deck = await getDeck();
			status = await getStatus();
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
			// Fehlermeldung anzeigen oder Benutzer benachrichtigen
		}
	});

	async function updateCard(cardid, row) {
		// Holen Sie die aktualisierten Werte aus den Eingabefeldern
		const front = row.front;
		const back = row.back;
		const cardstatus = row.cardstatus;
		const newDeckId = row.deckId;

		console.log('row:', row);
		console.log('front:', front);
		console.log('back:', back);
		console.log('cardstatus:', cardstatus);
		console.log('deckId:', newDeckId);
		console.log('cardid:', cardid);

		// Senden Sie eine Fetch-Anfrage an das Backend
		try {
			const response = await fetch('http://localhost:3001/updateCard', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					cardid,
					front,
					back,
					cardstatus,
					deckId: newDeckId
				})
			});

			if (response.ok) {
				console.log('Datensatz erfolgreich aktualisiert!');
				getAll(deckId).then((result) => {
					data = result;
				});
				// Aktualisieren Sie die Daten in der Tabelle oder zeigen Sie eine Erfolgsmeldung an
			} else {
				console.error('Fehler beim Aktualisieren des Datensatzes:', response.statusText);
				// Zeigen Sie eine Fehlermeldung an
			}
		} catch (error) {
			console.error('Fehler bei der Fetch-Anfrage:', error);
			// Zeigen Sie eine Fehlermeldung an
		}
	}

	async function deleteCard(cardid, row) {
		// Holen Sie die aktualisierten Werte aus den Eingabefeldern

		const cardId = row.cardid;
		console.log('deleteDeckId:', cardId);
		const isConfirmed = confirm('Bist du sicher, dass du die Karte löschen möchtest?');
    
    if (!isConfirmed) {
        return;
    }

		// Senden Sie eine Fetch-Anfrage an das Backend
		try {
			const response = await fetch('http://localhost:3001/deleteCard', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					cardId
				})
			});

			if (response.ok) {
				console.log('Datensatz erfolgreich gelöscht!');
				getAll(deckId).then((result) => {
					data = result;
				});

				// Aktualisieren Sie die Daten in der Tabelle oder zeigen Sie eine Erfolgsmeldung an
			} else {
				console.error('Fehler beim Aktualisieren des Datensatzes:', response.statusText);
				// Zeigen Sie eine Fehlermeldung an
			}
		} catch (error) {
			console.error('Fehler bei der Fetch-Anfrage:', error);
			// Zeigen Sie eine Fehlermeldung an
		}
	}

	async function getDeck() {
		const API_URL = 'http://localhost:3001/SelectAllDecks';
		try {
			const response = await fetch(API_URL,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include'
				});


		const fetchedData = await response.json();
		return fetchedData;
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}



	async function getStatus() {
		const API_URL = 'http://localhost:3001/SelectAllStatus';
		try {
			const response = await fetch(API_URL,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include'
				});
			const fetchedData = await response.json();
			return fetchedData;
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}


	}

	function handleChange(event) {
		goto('/homePage/manageKarteikarten/' + event.target.value);
		deckId = event.target.value;
		console.log('selectedOption:', deckId);
		getAll(deckId).then((result) => {
			data = result;
		});
	}

	function back() {
		goto('/homePage');
	}
</script>

<main>
	<div class="container h-full mx-auto flex flex-row justify-center items-center mt-4">
		<div class="space-y-5">
			<h1 class="text-4xl text-center">Karteikarten verwalten</h1>

			<div class="container h-full mx-auto flex justify-center items-center mt-4">
				<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
					<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Deck wählen</h2>

					<select
						class="dark:bg-primary-60 block appearance-none w-full bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						on:change={handleChange}
					>
						{#each options as option}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 mx-auto w-5/6">
				{#if data}
					<table class="text-center">
						<thead>
							<tr>
								<th class="w-32">Card-ID</th>
								<th class="w-64">Vorderseite</th>
								<th class="w-64">Rückseite</th>
								<th class="w-32">Cardstatus</th>
								<th class="w-32">Deck-ID</th>
								<th class="w-32">Update</th>
								<th class="w-32">Delete</th>
							</tr>
						</thead>
						<tbody>
							{#each data as row}
								<tr>
									<td>{row.cardid}</td>
									<td><input class="text-accent-400" bind:value={row.front} /></td>
									<td><input class="text-accent-400" bind:value={row.back} /></td>
									<td><input class="text-accent-400 w-1/2" bind:value={row.cardstatus} /></td>
									<td><input class="text-accent-400 w-1/2" bind:value={row.deckId} /></td>
									<td><button on:click={updateCard(row.cardid, row)}>✓</button> </td>
									<td><button on:click={deleteCard(row.cardid, row)}>x</button></td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}

				{#await data}
					<p>Lade Daten...</p>
				{/await}
			</div>
		</div>
	</div>
	<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 mx-auto w-5/6 mt-5">
		<h2 class="text-2xl text-center">Legende</h2>
		<div class="flex flex-row justify-center gap-5 mt-4">
			{#if deck}
				<table class="text-center bg-white dark:bg-accent-50 text-accent-400 rounded">
					<thead>
						<tr>
							<th class="w-32">Deck-ID</th>
							<th class="w-64">Deckname</th>
						</tr>
					</thead>
					<tbody>
						{#each deck as row1}
							<tr>
								<td>{row1.deckId}</td>
								<td>{row1.deckName}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
			{#if status}
				<table class="text-center bg-white dark:bg-accent-50 text-accent-400 rounded">
					<thead>
						<tr>
							<th class="w-32">Cardstatus</th>
							<th class="w-64">Statusname</th>
						</tr>
					</thead>
					<tbody>
						{#each status as row2}
							<tr>
								<td>{row2.statusid}</td>
								<td>{row2.statusname}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</div>

	<div class="flex justify-center mx-auto mt-5 mb-5">
	<button
		class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
		on:click={back}
	>
		Zurück
	</button>
</div>

</main>
