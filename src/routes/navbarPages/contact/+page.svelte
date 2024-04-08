<script>
    /** @type {import('./$types').PageData} */


    let name = '';
    let email = '';
    let message = '';
    let test = "";
    export let form;


    function updateTest() {
        test = `Contact details:\n\tname: ${name}\n\tmail: ${email}\n\nmessage:\n ${message}`;
    }
</script>

<main class="h-full flex items-center justify-center bg-background-500 overflow-hidden flex-col">
    {#if form?.success}
        <aside class="alert variant-ghost bg-background-50 text-primary-300 rounded-lg mb-10">
            <!-- Icon -->
            <div class="text-center font-bold text-xl mt-2">Message sent successfully</div>
            <!-- Message -->
            <div class="alert-message m-2">
                <p>Your request has been sent successfully. We will get back to you as soon as possible.</p>
            </div>
            <!-- Actions -->
        </aside>
    {/if}
    <div class="max-w-md w-full space-y-8 p-10 bg-background-50 rounded-lg shadow-md">
        <div>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-primary-300">Contact Page</h1>
        </div>
        <div class="wrapper">

                <form class="container mt-8 space-y-6" method="POST">


                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="name" class="sr-only">Name</label>
                            <input id="name" name="name" type="text" required bind:value={name} on:input={updateTest} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Your Name">
                        </div>
                        <div>
                            <label for="email" class="sr-only">Email</label>
                            <input id="email" name="email" type="email" required bind:value={email} on:input={updateTest} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Your Email">
                        </div>
                        <div>
                            <label for="message" class="sr-only">Message</label>
                            <textarea id="message" name="message" required bind:value={message} on:input={updateTest} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Your Message"></textarea>
                        </div>
                    </div>
                    <div>
                        <div class="input hidden">
                            <label for="">Subject:</label>
                            <input name="subject" type="text" value="New request on CardHub from {name}"/>
                        </div>
                        <div class="input hidden">
                            <label for="">Body:</label>

                            <textarea name="body" rows="6" value="{test}"/>

                        </div>
                    </div>
                    <button id="sendmail2" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background-50 bg-primary-300 hover:bg-primary-350 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Send</button>


                </form>

        </div>
    </div>
</main>