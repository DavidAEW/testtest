<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	onMount(() => {
	  getUserInfo();
	});
	
let name =""
let email = ""

	async function getUserInfo() {
	  const url = "http://localhost:3001/user/";
	  try {
		const response = await fetch(url, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  credentials: "include" // Um sicherzustellen, dass das Cookie mit dem Token gesendet wird
		}); // wir machen mit httponly cookie also wird das cookie damit automatisch mitgesendet.
		
		if (response.ok) {
		  const userData = await response.json();
		  name = userData.username
		  email = userData.email
		} else {
		  console.error('Fehler beim Abrufen der Benutzerdaten.');
		}
	  } catch (error) {
		console.error('Fehler:', error);
	  }
	}

	// logout 
	async function logout() {
	  const url = "http://localhost:3001/session";
	  try {
		const response = await fetch(url, {
		  method: 'DELETE',
		  credentials: "include"
		});
		if (response.ok) {
			goto('/');
		  console.log('Erfolgreich ausgeloggt');
		} else {
		  console.error('Logout fehlgeschlagen.');
		}
	  } catch (error) {
		console.error('Fehler beim Ausloggen:', error);
	  }
	}
  </script>
  
  
<main class="h-full flex items-center justify-center bg-background-500">
	<div class="max-w-md w-full space-y-8 p-10 bg-background-50 rounded-lg shadow-md">
		<div>
			<h1 class="mt-6 text-center text-3xl font-extrabold text-primary-300">Profile Page</h1>
		</div>
		<div class="divide-y divide-gray-200">
			<div class="py-8 text-base leading-6 space-y-4 text-primary-300 sm:text-lg sm:leading-7">
				<p>E-Mail: <span class="font-semibold text-primary-300">{email}</span></p>
				<p>Benutzername: <span class="font-semibold text-primary-300">{name}</span></p>
			</div>
			<div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
				<button on:click={logout} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background-50 bg-primary-300 hover:bg-primary-350 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
					Logout
				</button>
				<a href="/navbarPages/logo" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background-50 bg-primary-300 hover:bg-primary-350 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-4">
					Surprise me?!
				</a>
			</div>
		</div>
	</div>
</main>
  
