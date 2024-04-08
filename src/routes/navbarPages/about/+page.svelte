<script>
    import { Avatar } from '@skeletonlabs/skeleton';
    import samuel from '$lib/img/samuel.jpg'
    import kim from '$lib/img/kim.jpg'
    import tyler from '$lib/img/tyler.jpg'
    import david from '$lib/img/david.jpg'
    import louis from '$lib/img/louis.jpg'

    let showParticipants = false;

    function toggleParticipants() {
        showParticipants = !showParticipants;
    }
</script>

<main class="h-full flex items-center justify-center bg-background-500 overflow-hidden">
    <div class="w-full md:w-1/2 space-y-8 p-10 bg-background-50 rounded-lg shadow-md">
        <div>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-primary-300">About Page</h1>
        </div>
        <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-primary-300 sm:text-lg sm:leading-7">
                <div class="mt-4 space-y-4">
                    <p>The flashcard project aims to create a web-based learning platform that enables users to learn efficiently and interactively. Inspired by the Anki system, this platform offers a dynamic method of repeating and consolidating knowledge through flashcards. Developed by DHBW students on the Business Informatics course, this project combines modern web technologies with proven learning methods.</p>
                    <br/>
                </div>
                <div class="mt-4 flex space-x-8 justify-center">
                    <div class="flex flex-col items-center">
                        <Avatar src={tyler} class="w-24 h-24 rounded-full" />
                        <p class="text-lg mt-2">S. Tyler Straub</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <Avatar src={kim} class="w-24 h-24 rounded-full" />
                        <p class="text-lg mt-2">Uiyoung Kim</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <Avatar src={david} class="w-24 h-24 rounded-full" />
                        <p class="text-lg mt-2">David A. E. Wolf</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <Avatar src={samuel} class="w-24 h-24 rounded-full" />
                        <p class="text-lg mt-2">Samuel J. Hilpert</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <Avatar src={louis} class="w-24 h-24 rounded-full" />
                        <p class="text-lg mt-2">Louis Rau</p>
                    </div>
                </div>
            </div>
            <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <a href="/homePage" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background-50 bg-primary-300 hover:bg-primary-350 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Go Back
                </a>
            </div>
        </div>
    </div>
</main>