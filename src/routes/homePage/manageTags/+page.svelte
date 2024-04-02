<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    const endpoint = "http://localhost:3001/SelectAllFromTag";
    const endpoint2 = "http://localhost:3001/SelectAllFromDeck";
    let selected;
    let isAddClicked = false;
    let isDeleteClicked = false;
    let neuerTag;
    let deckList = [];
    let tagList = [];
    let selectedDeck;


    let isLoading = true; 
    let tagIdsWhoAreChecked = [];

    class Deck {
        constructor(deckId, deckName) {
            this.deckId = deckId;
            this.deckName = deckName;
        }
    }
    class Tag {
        constructor(tagId, tagName, isChecked = false){
            this.tagId = tagId;
            this.tagName = tagName;
            this.isChecked = isChecked;
        }
    }

    onMount(async () => {
        await GetAllTags()
        await getDeckListe()
        isLoading = false; 
    });

    async function GetAllTags() {
      const response = await fetch(endpoint,
      {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        });
      const data = await response.json();
      data.map(item => {
            const newTag = new Tag(item.tagId, item.tagName);
            tagList.push(newTag);
        });
    }

    async function getDeckListe() {
      const response = await fetch(endpoint2,
      {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        });
      const data = await response.json();
      
        data.map(item => {
            const newDeck = new Deck(item.deckId, item.deckName);
            deckList.push(newDeck);
        });
    }

    function goBack(){
        goto("/homePage");
    }

    function clickAdd(){
        if(isAddClicked == false){
        isAddClicked = true;
        }
        else{
           isAddClicked = false;
        }
    }

    function clickDelete(){
        if(isDeleteClicked == false){
        isDeleteClicked = true;
        }
        else{
           isDeleteClicked = false;
        }
    }

    async function hinzufuegenTag(){
        tagList = [];
            const response = await fetch('http://localhost:3001/HinzufuegenTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagName: neuerTag,
            }),
            credentials: 'include'
        });
        const data = await response.json(); 
        await GetAllTags();
        loadTagIdsWhoAreChecked(tagIdsWhoAreChecked);
        neuerTag = '';
    }

    async function deleteTag(deletedTagName){
        tagList = [];
            const response = await fetch('http://localhost:3001/LoeschenTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagName: deletedTagName,
            }),
            credentials: 'include'
        });
        const data = await response.json(); 
        await GetAllTags();
        loadTagIdsWhoAreChecked(tagIdsWhoAreChecked);
        isDeleteClicked = false;
    }

    async function selectDeck(deckId){
            const response = await fetch('http://localhost:3001/AnzeigenDeckTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deckId: deckId,
            }),
            credentials: 'include'
        });
        const data = await response.json(); 
        tagIdsWhoAreChecked = data.map(item => item.tagId);
        loadTagIdsWhoAreChecked(tagIdsWhoAreChecked);
    }

    async function loadTagIdsWhoAreChecked(tagIdsWhoAreChecked){

        for (var i = 0; i < tagList.length; i++) {
            tagList[i].isChecked = false;
        }

        tagIdsWhoAreChecked.forEach(function(element) {
        let index = tagList.findIndex(objekt => objekt.tagId == element);
        tagList[index].isChecked = true;
        });
    }

    async function changeStatusOfCheckBox(Tag, deckId){
        if(Tag.isChecked == false){
            const response = await fetch('http://localhost:3001/HinzufuegenInDeckTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagId: Tag.tagId,
                deckId: deckId
            }),
            credentials: 'include'
            });
            const data = await response.json(); 
        }
        else{
            const response = await fetch('http://localhost:3001/LoeschenDeckTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagId: Tag.tagId,
                deckId: deckId
            }),
            credentials: 'include'
            });
            const data = await response.json(); 
        }
    }

</script>

<main>
    {#if isLoading}
    <p>Lade Daten...</p>
{:else}
    <div class="container h-full mx-auto flex justify-center items-center mt-4">
        <h2>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50"on:click={goBack}>Zurück</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" on:click={clickAdd}>Tag hinzufügen</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50"on:click={clickDelete}>Tag löschen</button>
        </h2>
    </div>
    <div class="container h-full mx-auto flex justify-center items-center mt-4" >
    <select bind:value={selected} on:change={() => selectDeck(selected)} class="border rounded-lg shadow-m bg-primary-300 text-primary-50">
        <option value="" elected="selected">Wähle einen Stapel aus:</option>
        {#each deckList as deck}
        <option value={deck.deckId}>
        {deck.deckName}
        </option>
        {/each}
    </select>    
    </div>

    <div class="container h-full mx-auto flex justify-center items-center mt-4">
        <div class="space-y-5 grid grid-flow-row grid-cols-1">
            {#if tagList && tagList.length > 0}
                {#each tagList as tag, i}
                    <label class="inline-flex items-center cursor-pointer">
                        {#if isDeleteClicked}
                        <div class="w-8 h-8 rounded mr-4">
                            <button type="button" class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" on:click={deleteTag(tag.tagName)}>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                            <span class="sr-only">Icon description</span>
                            </button>                                
                        </div>
                        {/if}
                        <input type="checkbox" class="w-8 h-8 bg-primary-100 rounded mr-4"on:click={changeStatusOfCheckBox(tagList[i], selected)} bind:checked={tagList[i].isChecked}>
                        <div class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">
                            <p>{tag.tagName}</p>
                        </div>
                    </label>
                {/each}
            {:else}
                <p>Noch keine Tags verfügbar.</p>
            {/if}
        </div>
    </div>
        <div class="container h-full mx-auto flex justify-center items-center mt-4">
            <div class="space-y-5 grid grid-flow-row grid-cols-1">
            {#if isAddClicked}
                <input class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" bind:value={neuerTag} placeholder="Tagnamen eingeben">
                <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" on:click={hinzufuegenTag} on:click={clickAdd}>hinzufügen</button>
            {/if}
            </div>
        </div>
        {/if}
</main>




