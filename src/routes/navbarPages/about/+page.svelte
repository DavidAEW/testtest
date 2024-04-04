<script>

    
    let showParticipants = false;

    function toggleParticipants() {
        showParticipants = !showParticipants;
    }
</script>

<main class="h-full flex items-center justify-center bg-background-500 overflow-hidden">
    <div class="max-w-md w-full space-y-8 p-10 bg-background-50 rounded-lg shadow-md">
        <div>
            <h1 class="mt-6 text-center text-3xl font-extrabold text-primary-300">About Page</h1>
        </div>
        <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-primary-300 sm:text-lg sm:leading-7">
                <!-- Die Beschreibung der App ist immer sichtbar -->
                <div class="mt-4 space-y-4">
                    <p>The flashcard project aims to create a web-based learning platform that enables users to learn efficiently and interactively. Inspired by the Anki system, this platform offers a dynamic method of repeating and consolidating knowledge through flashcards. Developed by DHBW students on the Business Informatics course, this project combines modern web technologies with proven learning methods.</p>
                    <br/>
                </div>
                <div class="mt-4 flex space-x-4">
                    <!-- Die Teilnehmer werden immer angezeigt -->
                    <div>
                        <img src="/path/to/image1.jpg" alt="Bild von Tyler" class="w-16 h-16 rounded-full object-cover">
                        <p>Sean Tyler Straub</p>
                    </div>
                    <div>
                        <img src="/path/to/image2.jpg" alt="Bild von Kim" class="w-16 h-16 rounded-full object-cover">
                        <p>Uiyoung Kim</p>
                    </div>
                    <div>
                        <img src="/path/to/image3.jpg" alt="Bild von David" class="w-16 h-16 rounded-full object-cover">
                        <p>David Alexander Eugen Wolf</p>
                    </div>
                    <div>
                        <img src="/path/to/image4.jpg" alt="Bild von Samuel" class="w-16 h-16 rounded-full object-cover">
                        <p>Samuel Julius Hilpert III.</p>
                    </div>
                    <div>
                        <img src="/path/to/image5.jpg" alt="Bild von Louis" class="w-16 h-16 rounded-full object-cover">
                        <p>Bob Ross</p>
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