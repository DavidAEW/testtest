<script>

	let stackName = '';
	let message = '';

	async function addStack() {
		const API_URL = 'http://localhost:3001/stacks/create';
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ stackName }),
				credentials: 'include' 
			});

			if (!response.ok) {
				throw new Error('Netzwerkantwort war nicht ok');
			}

			const data = await response.json();
			console.log('Erfolg:', data);
			message = 'Stapel erfolgreich erstellt!';
			stackName = ''; // Feld leeren nach dem Erfolg
		} catch (error) {
			console.error('Fehler:', error);
			message = 'Fehler beim Erstellen des Stapels.';
		}
	}
</script>

<main class="h-full flex flex-col items-center justify-center ">
	<div class="text-center">
		<h1 class="text-3xl font-bold mb-4 text-primary-100">Neuen Stapel hinzufügen</h1>
		<div class="mb-4">
			<input
				type="text"
				placeholder="Stapelname"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-background-0 border-primary-250 placeholder-primary-300 text-primary-400"
				bind:value={stackName}
			>
		</div>
		<button
			on:click={addStack}
			class="bg-primary-100 hover:bg-primary-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
		>
			Stapel hinzufügen
		</button>
		{#if message}
			<p class="mt-4 text-primary-200">{message}</p>
		{/if}
	</div>
</main>


