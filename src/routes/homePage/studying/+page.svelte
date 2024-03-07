<!--- Study --->
<script>
	let frontsite = "Frontseite";
</script>
<main>
	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="space-y-5">
			<h1>Study!</h1>
			<p>Have fun Studying</p>
		</div>

	</div>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<div class="bg-primary-60 rounded-lg shadow-md p-4 w-5/6 ">
			<h2 class="text-xl font-bold mb-2 text-center text-primary-900">Vorderseite</h2>
			<textarea class="border border-gray-300 p-2 w-full h-56 text-primary-900" bind:value={frontsite}></textarea>
		</div>
	</div>

	<div class="container h-full mx-auto flex justify-center items-center mt-4">

	<button class="bg-accent-300 hover:bg-primary-60 hover:text-text-400 text-text-50 font-bold py-2 px-4 rounded">
		Antwort zeigen
	</button>
</div>


	<div class="container h-full mx-auto flex justify-center items-center mt-4">
		<h2>
		<a href = "../homePage" class="text-blue-600 hover:text-blue-800 underline">Click here to go back!</a>
		</h2>
	</div>
</main>
