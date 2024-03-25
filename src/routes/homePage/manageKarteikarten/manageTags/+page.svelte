<script>
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    const endpoint = "http://localhost:3001/SelectAllFromTag";
    const endpoint2 = "http://localhost:3001/SelectAllFromStack";
    let selected;
    let isAddClicked = false;
    let isDeleteClicked = false;
    let neuerTag;
    let stackList = [];
    let tagList = [];
    let isLoading = true; // Hilfsvariable für den Ladezustand
    let tagIdsWhoAreChecked = [];

    class Stack {
        constructor(stackid, stackname) {
            this.stackid = stackid;
            this.stackname = stackname;
        }
    }
    class Tag {
        constructor(tagid, tagname, isChecked = false){
            this.tagid = tagid;
            this.tagname = tagname;
            this.isChecked = isChecked;
        }
    }

    onMount(async () => {
        await getEndpoint1()
        await getEndpoint2()
        isLoading = false; // Markiere das Laden als abgeschlossen
    });

    async function getEndpoint1() {
      const response = await fetch(endpoint);
      const data = await response.json();
      data.map(item => {
            const newTag = new Tag(item.tagid, item.tagname);
            tagList.push(newTag);
        });
        console.log(tagList);
    }

    async function getEndpoint2() {
      const response = await fetch(endpoint2);
      const data = await response.json();
      
        // Verwenden von map, um jedes Objekt in ein Stack-Objekt umzuwandeln und zur Liste hinzuzufügen
        data.map(item => {
            const newStack = new Stack(item.stackid, item.stackname);
            stackList.push(newStack);
        });
        console.log(stackList);
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
        try{
            const response = await fetch('http://localhost:3001/HinzufuegenTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagname: neuerTag,
            }),
        });
        const data = await response.json(); // Wenn die Antwort JSON enthält
        getEndpoint1();
        neuerTag = '';
        }catch(error){
            console.error('Fehler beim Löschen des Tags:', error);
        }
    }

    async function deleteTag(deletedtagname){
        try{
            const response = await fetch('http://localhost:3001/LoeschenTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tagname: deletedtagname,
            }),
        });
        const data = await response.json(); // Wenn die Antwort JSON enthält
        console.log("Rückmeldung vom Server:", data); // Hier kannst du mit der Antwort des Servers arbeiten
        getEndpoint1();
        console.log(tagname);
        } catch(error){
            console.error('Fehler beim Löschen des Tags:', error);
        }
    }

    async function selectStack(stackid){
        console.log("wird aufgerufen");
        try{
            const response = await fetch('http://localhost:3001/AnzeigenStackTag', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stackid: stackid,
            }),
        });
        const data = await response.json(); // Wenn die Antwort JSON enthält
        tagIdsWhoAreChecked = data.map(item => item.tagid);
        console.log(tagIdsWhoAreChecked + "hier auch nochmal");
        loadTagIdsWhoAreChecked(tagIdsWhoAreChecked);
        }catch(error){
            console.error('Fehler beim Löschen des Tags:', error);
        }
    }

    async function loadTagIdsWhoAreChecked(tagIdsWhoAreChecked){

        // Durchlaufe die Liste und setze das Attribut auf false
        for (var i = 0; i < tagList.length; i++) {
            tagList[i].isChecked = false;
        }

        tagIdsWhoAreChecked.forEach(function(element) {
        let index = tagList.findIndex(objekt => objekt.tagid == element);
        tagList[index].isChecked = true;
        });
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
    <select bind:value={selected} on:change={() => selectStack(selected)} class="border rounded-lg shadow-m bg-primary-300 text-primary-50">
        {#each stackList as stack}
        <option value={stack.stackid}>
        {stack.stackname}
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
                            <button type="button" class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" on:click={deleteTag(tag.tagname)}>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                            <span class="sr-only">Icon description</span>
                            </button>                                
                        </div>
                        {/if}
                        <!-- Checkbox -->
                        <input type="checkbox" class="w-8 h-8 bg-primary-100 rounded mr-4" bind:checked={tagList[i].isChecked}>
                        <!-- Beschriftung -->
                        <div class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">
                            <p>{tag.tagname}</p>
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




