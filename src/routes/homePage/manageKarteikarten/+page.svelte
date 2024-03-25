<script>
	import { onMount } from 'svelte';
	let data;
	let stack;
	let status;

	async function getAll() {
		const API_URL = "http://localhost:3001/SelectAllFromCard"; // Ersetzen Sie dies mit Ihrer tatsächlichen API-URL

		const response = await fetch(API_URL);
		const data = await response.json();
		return data;
	}

	onMount(async () => {
		try {
			data = await getAll();
			stack = await getStack();
			status = await getStatus();
		} catch (error) {
			console.error("Fehler beim Laden der Daten:", error);
			// Fehlermeldung anzeigen oder Benutzer benachrichtigen
		}
	});

	async function updateCard(cardid, row) {
		// Holen Sie die aktualisierten Werte aus den Eingabefeldern
		const front = row.front;
		const back = row.back;
		const cardstatus = row.cardstatus;
		const stackid = row.stackid;

		console.log('row:', row);
		console.log('front:', front);
		console.log('back:', back);
		console.log('cardstatus:', cardstatus);
		console.log('stackid:', stackid);
		console.log('cardid:', cardid);

		// Senden Sie eine Fetch-Anfrage an das Backend
		try {
			const response = await fetch('http://localhost:3001/updateCard', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: "include",
				body: JSON.stringify({
					cardid,
					front,
					back,
					cardstatus,
					stackid,
				}),
			});

			if (response.ok) {
				console.log('Datensatz erfolgreich aktualisiert!');
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

	async function getStack() {
		const API_URL = "http://localhost:3001/SelectAllStacks"; // Replace with your actual API endpoint
		const response = await fetch(API_URL);
		const fetchedData = await response.json();
		return fetchedData;
	}

	async function getStatus() {
		const API_URL = "http://localhost:3001/SelectAllStatus"; // Replace with your actual API endpoint
		const response = await fetch(API_URL);
		const fetchedData = await response.json();
		return fetchedData;
	}


</script>

<main>

	<div class="container h-full mx-auto flex flex-row justify-center items-center mt-4">
		<div class="space-y-5">
			<h1 class="text-4xl text-center">Karteikarten verwalten</h1>

			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 mx-auto w-5/6">
		{#if data}
			<table class="text-center">
				<thead>
				<tr>
					<th class="w-32">Card-ID</th>
					<th class="w-64">Vorderseite</th>
					<th class="w-64">Rückseite</th>
					<th class="w-32">Cardstatus</th>
					<th class="w-32">Stack-ID</th>
					<th class="w-32">Update</th>
				</tr>
				</thead>
				<tbody>
				{#each data as row}
					<tr>
						<td>{row.cardid}</td>
						<td><input class="text-accent-400" bind:value={row.front}/></td>
						<td><input class="text-accent-400" bind:value={row.back}/></td>
						<td><input class="text-accent-400 w-1/2" bind:value={row.cardstatus}/></td>
						<td><input class="text-accent-400 w-1/2" bind:value={row.stackid}/></td>
						<td><button on:click={updateCard(row.cardid, row)}>✓</button>
						</td>

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
		{#if stack}
			<table class="text-center bg-white dark:bg-accent-50 text-accent-400 rounded">
				<thead>
				<tr>
					<th class="w-32">Stack-ID</th>
					<th class="w-64">Stackname</th>

				</tr>
				</thead>
				<tbody>
				{#each stack as row1}
					<tr>
						<td>{row1.stackid}</td>
						<td>{row1.stackname}</td>
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
		<div>
			<p>
				<a href="/homePage" class="text-blue-600 hover:text-blue-800 underline">
					Click here to go back!
				</a>
			</p>
			<p>
				<a href="/homePage/addKarteikarten" class="text-blue-600 hover:text-blue-800 underline">
					Click here to go to routes/addKarteikarten/+page.svelte
				</a>
			</p>
			<p>
				<a
					href="/homePage/manageKarteikarten/manageTags"
					class="text-blue-600 hover:text-blue-800 underline"
				>
					Click here to go to routes/manageKarteikarten/manageTags/+page.svelte
				</a>
			</p>
			<p>
				<a
					href="/homePage/manageKarteikarten/shareKarteikarten"
					class="text-blue-600 hover:text-blue-800 underline"
				>
					Click here to go to routes/manageKarteikarten/shareKarteikarten/+page.svelte
				</a>
			</p>
		</div>


</main>
