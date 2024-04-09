<script>
	import { Circle2 } from 'svelte-loading-spinners';

	export let data;

	let selectedDeckOption = '';
	let selectedTagOption = '';

	function handleDeckChange(event) {
		selectedDeckOption = event.target.value;
		console.log(selectedDeckOption);
	}

	function handleTagChange(event) {
		selectedTagOption = event.target.value;
		console.log(selectedTagOption);
	}
</script>

<main class="h-full flex flex-col">
	<div class="my-8 text-center">
		{#await data.userData}
			<span><Circle2 /></span>
		{:then userData}
			<h1 class="text-3xl font-extrabold text-text-100">Welcome back {userData.username}</h1>
		{/await}
	</div>
	<div class="flex-grow flex flex-col items-center mt-40">
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
		{#await data.decks}
			<span><Circle2 /></span>
		{:then decks}
			{#if decks.length > 0}
				<h2 class="text-2xl font-bold mb-5">Choose a deck</h2>
				<select
					class="bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4"
					on:change={handleDeckChange}
				>
					<option value="">Choose a deck</option>
					{#each decks as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			{/if}
		{/await}
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
		{#await data.tags}
			<span><Circle2/></span>
		{:then tags}
			{#if tags.length > 0}
				<h2 class="text-2xl font-bold mb-5">Choose a tag</h2>
				<select
					class="bg-primary-70 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-primary-100 hover:border-gray-500 mb-4"
					on:change={handleTagChange}
				>
					<option value="">Choose a deck</option>
					{#each tags as tag}
						<option value={tag.value}>{tag.label}</option>
					{/each}
				</select>
			{/if}
		{/await}
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
