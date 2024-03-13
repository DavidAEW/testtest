<script>
	import { onMount } from 'svelte';
	
	onMount(() => {
	  getUserInfo();
	});
	
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
		  document.getElementById('emailDisplay').textContent = `E-Mail: ${userData.email}`;
		  document.getElementById('usernameDisplay').textContent = `Benutzername: ${userData.username}`;
		} else {
		  console.error('Fehler beim Abrufen der Benutzerdaten.');
		}
	  } catch (error) {
		console.error('Fehler:', error);
	  }
	}
  </script>
  
  
  <main>
	<div class="container h-full mx-auto flex justify-center items-center my-4">
	  <div class="space-y-5">
		<h1>Profile Page</h1>
		
  
		<div id="emailDisplay">E-Mail: </div>
		<div id="usernameDisplay">Benutzername: </div>
  
		
	  </div>
	</div>
  </main>
  