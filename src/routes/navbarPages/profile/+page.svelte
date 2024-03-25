<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let email = '';
 	let username = '';
	
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
        credentials: "include"
      });

      if (response.ok) {
        const userData = await response.json();
        email = userData.email;
        username = userData.username;
      } else if (response.status === 401 || response.status === 403) {
        goto('/');
      } else {
        email = 'Fehler beim Laden';
        username = 'Fehler beim Laden';
        console.error('Fehler beim Abrufen der Benutzerdaten.');
      }
    } catch (error) {
      console.error('Fehler:', error);
      email = 'Fehler beim Laden';
      username = 'Fehler beim Laden';
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
		  <div>Benutzername: {username}</div>
		  <div class="text-center mt-8">
			<button on:click={logout} class="px-6 py-2 hover:bg-primary-90 dark:bg-primary-200 rounded-full">
			  Logout
			</button>
		  </div>
		  
		</div>
	  </div>
  </main>
  