<!--- Study Tag --->
<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Circle2 } from 'svelte-loading-spinners';
	export let data;
	let tagId = $page.params.tagId;
	let cardStatus = $page.params.cardStatus;

	const cardOptions = [
		{ value: 0, label: 'neu' },
		{ value: 1, label: 'etwas gelernt' },
		{ value: 2, label: 'kann ich teilweise' },
		{ value: 3, label: 'kann ich' }
	];
	let showBack = false;

	function toggleBack() {
		showBack = !showBack;
	}
	function back() {
		goto('/homePage');
	}
	let selectedTag = { value: '' };
	let selectedStatus = { value: '' };
	data.tags.then((opts) => {
		let idx = opts.findIndex((opt) => opt.value == tagId);
		if (idx !== -1) {
			selectedTag.value = opts[idx].value;
		} else {
			console.error(
				'You do not have the deck number: ',
				tagId,
				'. Please stick to navigating with links and buttons'
			);
		}
		selectedStatus.value = cardOptions[cardStatus].value;
	});

	async function updateCardStatus(cardId, learnStatus, front, back, deckId) {
		const API_URL = `https://cardhubserver.azurewebsites.net/Card`;

		const response = await fetch(API_URL, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cardId: Number(cardId),
				cardStatus: Number(learnStatus),
				front: front,
				back: back,
				deckId: deckId
			})
		});

		if (!response.ok) {
			console.error('Error updating card status:', await response.text());
			return;
		}
		showBack = false;
		window.location.reload();
	}

	async function handleChangeStatus(event) {
		goto(`/homePage/studyTag/${tagId}/${event.target.value}/`);
		showBack = false;
	}
	async function handleChangeID(event) {
		goto(`/homePage/studyTag/${event.target.value}/${cardStatus}/`);
		showBack = false;
	}
</script>

<main>
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6 flex-row flex">
			{#await data.tags}
				<span class="text-center"><Circle2 /></span>
			{:then tags}
				<h2 class="font-bold mb-2 text-center text-primary-900 my-auto mr-2">Tag</h2>
				<select
					class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60 mr-4"
					bind:value={selectedTag.value}
					on:change={handleChangeID}
				>
					{#each tags as tag}
						<option value={tag.value}>{tag.label} </option>
					{/each}
				</select>
			{/await}

			<h2 class="font-bold mb-2 text-center text-primary-900 my-auto mr-2">Status</h2>

			<select
				name="cardStatus"
				class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				bind:value={selectedStatus.value}
				on:change={handleChangeStatus}
			>
				{#each cardOptions as cardoption}
					<option value={cardoption.value}>{cardoption.label}</option>
				{/each}
			</select>
		</div>
	</div>

	{#await data.cardData}
		<span><Circle2 /></span>
	{:then cardData}
	{#if cardData !== null}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
				<div
					class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				>
					{cardData?.front}
				</div>
			</div>
		</div>

		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<button
				class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
				on:click={toggleBack}
			>
				{showBack ? 'Antwort ausblenden' : 'Antwort zeigen'}
			</button>
		</div>

		{#if showBack}
			<div class="container h-full mx-auto flex justify-center items-center mt-4">
				<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
					<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Rückseite</h2>
					<div
						class="border border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
					>
						{cardData?.back}
					</div>
				</div>
			</div>
			<div class="container h-full mx-auto flex justify-center items-center mt-4">
				<button
					class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
					on:click={() =>
						updateCardStatus(cardData.cardId, 1, cardData?.front, cardData?.back, cardData.deckId)}
				>
					kann ich nicht
				</button>
				<button
					class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded mr-16"
					on:click={() =>
						updateCardStatus(cardData.cardId, 2, cardData?.front, cardData?.back, cardData.deckId)}
				>
					kann ich bisschen
				</button>
				<button
					class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
					on:click={() =>
						updateCardStatus(cardData.cardId, 3, cardData?.front, cardData?.back, cardData.deckId)}
				>
					kann ich gut
				</button>
			</div>
		{/if}
	{:else}
		<div class="container h-full mx-auto flex justify-center items-center mt-4">
			<div class="bg-primary-60 dark:bg-secondary-250 rounded-lg shadow-md p-4 w-5/6">
				<h2 class="text-xl font-bold mb-2 text-center text-primary-900">
					Glückwunsch, keine neue Karte gefunden!
				</h2>
				<div
					class="border overflow-wrap: break-words border-gray-300 p-2 w-full h-auto rounded text-primary-900 dark:text-primary-400 bg-background-0 dark:bg-primary-60"
				>
					Du hast alle Karten mit diesem Status/in diesem Deck gelernt! Füge neue Karten hinzu oder
					lerne alte Karten erneut, um diese weiter zu festigen.
				</div>
			</div>
		</div>
	{/if}
	{/await}

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<button
			class="bg-primary-60 dark:bg-accent-300 dark:hover:bg-primary-60 dark:hover:text-text-400 hover:bg-accent-300 hover:text-text-50 text-primary-400 dark:text-text-50 font-bold py-2 px-4 rounded"
			on:click={back}
		>
			Zurück
		</button>
	</div>
</main>
