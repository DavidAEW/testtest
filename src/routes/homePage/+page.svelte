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

<main class="h-full overflow-hidden">
	<div class="flex justify-center items-center">
		<h1 class="text-3xl font-extrabold text-text-100 mt-4" id="usernameDisplay">Welcome back</h1>
	</div>
	<div class="h-full flex justify-center items-center space-y-5">
		<div class="space-y-5">
			<h2 class="text-2xl font-bold my-5">Choose a deck to study</h2>
			<div class="space-y-5">
				<select
					class="dark:bg-primary-60 bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					on:change={handleChange}
				>
					<option value="">Deck auswählen</option>
					{#each options as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
				<a href="/homePage/studying/{selectedOption}/1" class="dark:bg-primary-200 bg-primary-0 border border-gray-200 text-primary-400 py-3 px-4 rounded-full focus:bg-white focus:border-gray-500">Start Studying</a>
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
						<a
							href="/homePage/manageKarteikarten"
							class="text-blue-600 hover:text-blue-800 underline"
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
	</div>
</main>
