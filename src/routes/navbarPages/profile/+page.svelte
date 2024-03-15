<script>
	import { onMount } from 'svelte';
	
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
	  const url = "http://localhost:3001/logout";
	  try {
		const response = await fetch(url, {
		  method: 'POST',
		  credentials: "include"
		});
		if (response.ok) {
			window.location.href = "/";
		  console.log('Erfolgreich ausgeloggt');
		} else {
		  console.error('Logout fehlgeschlagen.');
		}
	  } catch (error) {
		console.error('Fehler beim Ausloggen:', error);
	  }
	}
  </script>
  
  
  <main>
	<div class="container h-full mx-auto flex justify-center items-center my-4">
	  <div class="space-y-5">
		<h1>Profile Page</h1>
		
  
		<div>E-Mail: {email}</div>
		<div>Benutzername: {name} </div>
		<div class="text-center mt-8">
			<button on:click={logout} class="px-6 py-2 hover:bg-primary-90 dark:bg-primary-200 rounded-full">
				Logout
			</button>
		</div>
		
		
	  </div>
	</div>
  </main>
  