<script>
	import { onMount } from 'svelte';

	let options = [];

	async function getOptions() {
		const API_URL = 'http://localhost:3001/SelectAllFromDeck';
		try {
			const response = await fetch(
				API_URL,

				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include'
				}
			);
			const data = await response.json();

			options = data.map((item) => ({
				value: item.deckId,
				label: item.deckName
			}));
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}

	let username = '';
	async function getUserInfo() {
		const url = 'http://localhost:3001/user/';
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			if (response.ok) {
				const userData = await response.json();
				username = userData.username;
			} else {
				console.error('Fehler beim Abrufen der Benutzerdaten.');
			}
		} catch (error) {
			console.error('Fehler:', error);
		}
	}

	let selectedOption = '';

	function handleChange(event) {
		selectedOption = event.target.value;
		console.log(selectedOption);
	}

	onMount(() => {
		getUserInfo();
		getOptions();
	});
</script>

<main class="h-full flex flex-col">
	<div class="mt-4 mb-8 text-center">
		<h1 class="text-3xl font-extrabold text-text-100">Welcome back {username}</h1>
	</div>
	<div class="flex-grow flex flex-col items-center mt-16">
		<div class="mb-10">
			<a
				href="/homePage/manageDecks"
				class="bg-primary-100 border rounded font-bold mx-4 border-gray-200 text-primary-400 py-3 px-4 hover:bg-primary-70 hover:border-gray-500"
				>Manage decks</a
			>
			<a
				href="/homePage/manageTags"
				class="bg-primary-100 border rounded font-bold mx-4 border-gray-200 text-primary-400 py-3 px-4 hover:bg-primary-70 hover:border-gray-500"
				>Manage tags</a
			>
		</div>
		{#if options.length > 0}
			<h2 class="text-2xl font-bold mb-5">Choose a deck</h2>
			<select
				class="bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4"
				on:change={handleChange}
			>
				<option value="">Choose a deck</option>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{/if}
		{#if selectedOption !== '' && selectedOption !== undefined}
			<div class="flex justify-center space-x-4 mb-10">
				<a
					href="/homePage/studying/{selectedOption}/0"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Start Studying</a
				>
				<a
					href="/homePage/addKarteikarten/{selectedOption}"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Add a flashcard</a
				>
				<a
					href="/homePage/manageKarteikarten/{selectedOption}"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Manage flashcards</a
				>
			</div>
		{/if}
		<div class="space-y-5 mt-10">
			<p>These are some of the other pages:</p>
			<ul class="space-y-1">
				<li>
					Click here to go to
					<a href="/homePage/addKarteikarten" class="text-blue-600 hover:text-blue-800 underline"
						>routes/addKarteikarten/+page.svelte</a
					>
				</li>
				<li>
					Click here to go to
					<a href="/homePage/manageKarteikarten" class="text-blue-600 hover:text-blue-800 underline"
						>routes/manageKarteikarten/+page.svelte</a
					>
				</li>
				<li>
					Click here to go to
					<a href="/homePage/manageDecks" class="text-blue-600 hover:text-blue-800 underline"
						>routes/manageDecks/+page.svelte</a
					>
				</li>
				<li>
					<a href="/farben" class="text-blue-600 hover:text-blue-800 underline"
						>Click here to go checkout our colorscheme</a
					>
				</li>
			</ul>
		</div>
	</div>
</main>
