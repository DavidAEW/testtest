<!--- Homepage --->
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		getUserInfo();
	});

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
				document.getElementById('usernameDisplay').textContent =
					`Welcome back ${userData.username}`;
			} else {
				console.error('Fehler beim Abrufen der Benutzerdaten.');
			}
		} catch (error) {
			console.error('Fehler:', error);
		}
	}
</script>


<main class="h-full">
<div class="container mx-auto flex justify-center items-center">
	<h1 class="text-3xl font-extrabold text-text-100 mt-4" id="usernameDisplay">Welcome back</h1>
</div>
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<p>These are some of the other pages:</p>
		<ul>
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
				Click here to go to
				<a href="/homePage/studying" class="text-blue-600 hover:text-blue-800 underline"
					>routes/studying/+page.svelte</a
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
