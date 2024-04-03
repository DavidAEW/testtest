<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<main class="min-h-screen flex items-center justify-center bg-background-500 overflow-hidden">
    <div class="max-w-md w-full space-y-8 p-10 bg-background-50 rounded-lg shadow-md">
        <div>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-primary-300">About Page</h1>
        </div>
        <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-primary-300 sm:text-lg sm:leading-7">
                <p>Hochschule: <span class="font-semibold text-primary-300">Duale Hochschule Baden-Würtemberg</span></p>
                <p>Kurs: <span class="font-semibold text-primary-300">WWI22SEA</span></p>
                <p>Gruppenmitglieder: <span class="font-semibold text-primary-300">Tyler, Kim, David, Samuel & Louis</span></p>
            </div>
            <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <a href="../homePage" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background-50 bg-primary-300 hover:bg-primary-350 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Go Back
                </a>
            </div>
        </div>
    </div>
</main>

