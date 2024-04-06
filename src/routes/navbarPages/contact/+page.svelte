<script>
    /** @type {import('./$types').PageData} */
    export let data;
    let name = '';
    let email = '';
    let message = '';

    function handleSubmit() {
        // insert Request-Logic
        alert("Request submitted successfully!");
        location.reload();
    }
</script>

<main class="h-full flex items-center justify-center bg-background-500 overflow-hidden">
    <div class="max-w-md w-full space-y-8 p-10 bg-background-50 rounded-lg shadow-md">
        <div>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-primary-300">Contact Page</h1>
        </div>
        <form class="mt-8 space-y-6" on:submit={handleSubmit}>
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="name" class="sr-only">Name</label>
                    <input id="name" name="name" type="text" required bind:value={name} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Your Name">
                </div>
                <div>
                    <label for="email" class="sr-only">Email</label>
                    <input id="email" name="email" type="email" required bind:value={email} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Your Email">
                </div>
                <div>
                    <label for="message" class="sr-only">Message</label>
                    <textarea id="message" name="message" required bind:value={message} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Your Message"></textarea>
                </div>
            </div>
            <div>
                <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background-50 bg-primary-300 hover:bg-primary-350 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Send Message
                </button>
            </div>
        </form>
    </div>
</main>