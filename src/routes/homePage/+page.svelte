<script>
	import { onMount } from 'svelte';

	let deckOptions = [];
	let tagOptions = [];

	async function getDeckOptions() {
		const API_URL = 'http://localhost:3001/Deck';
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

			deckOptions = data.map((item) => ({
				value: item.deckId,
				label: item.deckName
			}));
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}

	async function getTagOptions() {
		const API_URL = 'http://localhost:3001/Tag';
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

			tagOptions = data.map((item) => ({
				value: item.tagId,
				label: item.tagName
			}));
		} catch (error) {
			console.error('Fehler beim Laden der Daten:', error);
		}
	}

	let username = '';
	async function getUserInfo() {
		const url = 'http://localhost:3001/User';
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

	let selectedDeckOption = '';

	function handleDeckChange(event) {
		selectedDeckOption = event.target.value;
		console.log(selectedDeckOption);
	}
	let selectedTagOption = '';

	function handleTagChange(event) {
		selectedTagOption = event.target.value;
		console.log(selectedTagOption);
	}

	onMount(() => {
		getUserInfo();
		getDeckOptions();
		getTagOptions();
	});
</script>

<main class="h-full flex flex-col">
	<div class="my-8 text-center">
		<h1 class="text-3xl font-extrabold text-text-100">Welcome back {username}</h1>
	</div>
	<div class="flex-grow flex flex-col items-center">
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

			<a
				href="/homePage/importDeck"
				class="bg-primary-100 border rounded font-bold mx-4 border-gray-200 text-primary-400 py-3 px-4 hover:bg-primary-70 hover:border-gray-500"
				>Import a Deck</a
			>
		</div>
		{#if deckOptions.length > 0}
			<h2 class="text-2xl font-bold mb-5">Choose a deck</h2>
			<select
				class="bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4"
				on:change={handleDeckChange}
			>
				<option value="">Choose a deck</option>
				{#each deckOptions as deckOption}
					<option value={deckOption.value}>{deckOption.label}</option>
				{/each}
			</select>
		{/if}
		{#if selectedDeckOption !== '' && selectedDeckOption !== undefined}
			<div class="flex justify-center space-x-4 mb-10">
				<a
					href="/homePage/studyDeck/{selectedDeckOption}/0"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Start Studying</a
				>
				<a
					href="/homePage/addKarteikarten/{selectedDeckOption}"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Add a flashcard</a
				>
				<a
					href="/homePage/manageKarteikarten/deck/{selectedDeckOption}"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Manage flashcards</a
				>
				<a
					href="/homePage/shareDeck/{selectedDeckOption}"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Share the deck</a
				>
			</div>
		{/if}

		{#if tagOptions.length > 0}
			<h2 class="text-2xl font-bold mb-5">Choose a tag</h2>
			<select
				class="bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4"
				on:change={handleTagChange}
			>
				<option value="">Choose a deck</option>
				{#each tagOptions as tagOption}
					<option value={tagOption.value}>{tagOption.label}</option>
				{/each}
			</select>
		{/if}
		{#if selectedTagOption !== '' && selectedTagOption !== undefined}
			<div class="flex justify-center space-x-4 mb-10">
				<a
					href="/homePage/studyTag/{selectedTagOption}/0"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Start Studying</a
				>
				<a
					href="/homePage/manageKarteikarten/tag/{selectedTagOption}"
					class="dark:bg-primary-200 bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 rounded-full hover:bg-primary-100 dark:hover:bg-primary-70 hover:border-gray-500"
					>Manage flashcards</a
				>
			</div>
		{/if}
	</div>
</main>
