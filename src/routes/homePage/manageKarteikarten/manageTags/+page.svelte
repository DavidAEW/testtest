<script>

    let isChecked = false;
    let selected;
    let isAddClicked = false;
    let isDeleteClicked = false;
    let neuerTag;

    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    const endpoint = "http://localhost:3001/SelectTagNameFromTag";
    const endpoint2 = "http://localhost:3001/SelectAllFromStack";
    let tagname = []; 
    let stackname = [];
    export let data;

    onMount(async () => {
        await getEndpoint1()
        await getEndpoint2()
    });

    async function getEndpoint1() {
      const response = await fetch(endpoint);
      const data = await response.json();
      tagname = data.map(item => item.tagname); 
      console.log(tagname);
      console.log("wird aufgerufen");
    }

    async function getEndpoint2() {
      const response = await fetch(endpoint2);
      const data = await response.json();
      stackname = data.map(item => item.stackname); 
      console.log(stackname);
    }

    function goBack(){
        goto("../manageKarteikarten");
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
        const response = await fetch('http://localhost:3001/HinzufuegenTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagname: neuerTag,
            }),
        });
        tagname = [...tagname, {tagname: neuerTag}]
    }

    async function deleteTag(tagname){
        const response = await fetch('http://localhost:3001/LoeschenTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagname: tagname,
            }),
        });
        getEndpoint1;
    }
</script>

<main>
    <div class="container h-full mx-auto flex justify-center items-center mt-4" >
    <select bind:value={selected} class="border rounded-lg shadow-m bg-primary-300 text-primary-50">
        {#each stackname as stackname}
        <option value={stackname}>
        {stackname}
        </option>
        {/each}
    </select>
    </div>

    <div class="container h-full mx-auto flex justify-center items-center mt-4">
        <div class="space-y-5 grid grid-flow-row grid-cols-1">
            {#if tagname && tagname.length > 0}
                {#each tagname as Tagname}
                    <label class="inline-flex items-center cursor-pointer">
                        {#if isDeleteClicked}
                        <div class="w-8 h-8 rounded mr-4">
                            <button type="button" class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" on:click={deleteTag(Tagname)}>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                            <span class="sr-only">Icon description</span>
                            </button>                                
                        </div>
                        {/if}
                        <!-- Checkbox -->
                        <input type="checkbox" class="w-8 h-8 bg-primary-100 rounded mr-4" bind:checked="{isChecked}">
                        <!-- Beschriftung -->
                        <div class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">
                            <p>{Tagname}</p>
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
    <div class="container h-full mx-auto flex justify-center items-center mt-4">
        <h2>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50"on:click={goBack}>Zurück</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" on:click={clickAdd}>Tag hinzufügen</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50"on:click={clickDelete}>Tag löschen</button>
        </h2>
    </div>
</main>




