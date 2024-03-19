<script>
	import { onMount } from 'svelte';
	let data;

	async function getAll() {
		const API_URL = "http://localhost:3001/SelectAllFromCard"; // Ersetzen Sie dies mit Ihrer tatsächlichen API-URL

		const response = await fetch(API_URL);
		const data = await response.json();
		return data;
	}

	onMount(async () => {
		try {
			data = await getAll();
		} catch (error) {
			console.error("Fehler beim Laden der Daten:", error);
			// Fehlermeldung anzeigen oder Benutzer benachrichtigen
		}
	});
</script>

<main>

	<div class="container h-full mx-auto flex flex-row justify-center items-center mt-4">
		<div class="space-y-5">
			<h1 class="text-4xl text-center">Karteikarten verwalten</h1>

	<div>
		{#if data}
			<table class="text-center">
				<thead>
				<tr>
					<th class="w-32">cardid</th>
					<th class="w-64">front</th>
					<th class="w-64">back</th>
					<th class="w-32">cardstatus</th>
					<th class="w-32">stackid</th>
				</tr>
				</thead>
				<tbody>
				{#each data as row}
					<tr>
						<td>{row.cardid}</td>
						<td>{row.front}</td>
						<td>{row.back}</td>
						<td>{row.cardstatus}</td>
						<td>{row.stackid}</td>
					</tr>
				{/each}
				</tbody>
			</table>
		{/if}

		{#await data}
			<p>Lade Daten...</p>
		{/await}


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
	</div>
	</div>

</main>
