<!-- Manage Tags --->
<script>
    import { onMount } from "svelte";
    const endpoint = "http://localhost:3001/SelectTagNameFromTag";
    let tagname = []; // Hier Titel als leeres Array initialisieren

    onMount(async function () {
      const response = await fetch(endpoint);
      const data = await response.json();
      tagname = data.map(item => item.tagname); // Hier auf den Schlüssel Titel zugreifen
      console.log(tagname);
    });

    // const endpoint2 = "http://localhost:3001/InsertCardBackCardFrontInCard";

    // onMount(async function () {
    //   body: JSON.stringify(data);
    //   const response = await fetch(endpoint);
    //   const data = await response.json();
    //   tagname = data.map(item => item.tagname); // Hier auf den Schlüssel Titel zugreifen
    //   console.log(tagname);
    // });

    let back = "hallo from frontend";
    let front = "hallo zuruck";

    async function doPost () {
        console.log("wird ausgeführt");
        console.log(back);
		const res = await fetch("http://localhost:3001/InsertCardBackCardFrontInCard", {
			method: 'POST',
            headers: {
          'Content-Type': 'application/json',
        },
			body: JSON.stringify({
				front,
				back
			})
		})
        const json = await res.json();
        result = JSON.stringify(json);
        console.log(result);
	}

    let isChecked = false;
</script>

<main>
    <div class="container h-full mx-auto flex justify-center items-center mt-4">
        <div class="space-y-5 grid grid-flow-row grid-cols-1">
            {#if tagname && tagname.length > 0}
                {#each tagname as Tagname}
                    <label class="inline-flex items-center cursor-pointer">
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
        <h2>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50" on:click={doPost}>Zurück</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">Tag hinzufügen</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">Tag löschen</button>
            <a href="../manageKarteikarten" class="text-blue-600 hover:text-blue-800 underline">Click here to go back!</a>
        </h2>
    </div>
</main>





