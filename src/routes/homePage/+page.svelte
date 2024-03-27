<script>
	import { onMount } from 'svelte';

	let options = [];

	async function getOptions() {
		const API_URL = 'http://localhost:3001/SelectAllFromStack';
		const response = await fetch(API_URL);
		const data = await response.json();

		options = data.map((item) => ({
			value: item.stackid,
			label: item.stackname
		}));
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
		<h2 class="text-2xl font-bold mb-5">Choose a deck</h2>
		<select
			class="dark:bg-primary-60 bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4"
			on:change={handleChange}
		>
			<option value="">Choose a deck</option>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<div class="flex justify-center space-x-4 mb-10">
			<a
				href="/homePage/studying/{selectedOption}/0"
				class="dark:bg-primary-200 bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 rounded-full focus:bg-white focus:border-gray-500"
				>Start Studying</a
			>
			<a
				href="/homePage/addKarteikarten/{selectedOption}"
				class="dark:bg-primary-200 bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 rounded-full focus:bg-white focus:border-gray-500"
				>Add a flashcard</a
			>
			<a
				href="/homePage/manageKarteikarten/{selectedOption}"
				class="dark:bg-primary-200 bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 rounded-full focus:bg-white focus:border-gray-500"
				>Manage flashcards</a
			>
			<a
				href="/homePage/addStack"
				class="dark:bg-primary-200 bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 rounded-full focus:bg-white focus:border-gray-500"
				>add Stack</a
			>
			
		</div>
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
