<!--- Study --->
<script>
import { onMount } from 'svelte';
	let showBack = false;
	function toggleBack() {
		showBack = !showBack;
	}
	function back() {
		window.location.href = "/homePage";
	}
	let cardData = null;

	async function fetchCard() {
		const response = await fetch('/GetRandomCardWithCardStatus0');
		const data = await response.json();
		cardData = data;
	}

	let frontsite = cardData?.frontsite;
	let backsite = cardData?.backsite;

	onMount(async () => {
		await fetchCard();
	});
</script>
<main>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 ">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
			<div class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60">
				{frontsite}
			</div>
		</div>
	</div>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">

	<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"  on:click={toggleBack}>
		{showBack ? "Antwort ausblenden" : "Antwort zeigen"}
	</button>
</div>

	{#if showBack}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 ">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Rückseite</h2>
				<div class="border border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60">
					{backsite}
				</div>
			</div>
		</div>
		<div class="container h-full mx-auto flex justify-center items-center mt-4">

			<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16">
				gelernt
			</button>
			<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16">
			kann ich fast
			</button>
			<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded">
				weiß ich
			</button>
			
		</div>
	{/if}

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
	<button class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded" on:click={back}>
		Zurück
	</button>
	</div>
	
</main>
