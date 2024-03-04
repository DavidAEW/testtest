<!-- Manage Tags --->
<script>
    import { onMount } from "svelte";
    const endpoint = "http://localhost:3001/tags";
    let Titel = []; // Hier Titel als leeres Array initialisieren

    onMount(async function () {
      const response = await fetch(endpoint);
      const data = await response.json();
      Titel = data.map(item => item.Titel); // Hier auf den Schlüssel Titel zugreifen
      console.log(Titel);
    });

    export let name;
    let isChecked = false;
</script>

<main>
    <div class="container h-full mx-auto flex justify-center items-center mt-4">
        <div class="space-y-5 grid grid-flow-row grid-cols-1">
            {#if Titel && Titel.length > 0}
                {#each Titel as titel}
                    <label class="inline-flex items-center cursor-pointer">
                        <!-- Checkbox -->
                        <input type="checkbox" class="w-8 h-8 bg-primary-100 rounded mr-4" bind:checked="{isChecked}">
                        <!-- Beschriftung -->
                        <div class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">
                            <p>{titel}</p>
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
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">Zurück</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">Tag hinzufügen</button>
            <button class="p-1 max-w-sm mx-auto border rounded-lg shadow-m bg-primary-300 text-primary-50">Tag löschen</button>
            <a href="../manageKarteikarten" class="text-blue-600 hover:text-blue-800 underline">Click here to go back!</a>
        </h2>
    </div>
</main>





