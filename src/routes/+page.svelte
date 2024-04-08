<script>
  import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

  let loggedIn = false;
	async function getUserInfo() {
		const url = 'http://localhost:3001/User';
		try {
			const response = await fetch(url, {
				method: 'GET',
        credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
			});

			if (response.ok) {
				const userData = await response.json();
				loggedIn = true;
			} else {
				console.error('Fehler beim Abrufen der Benutzerdaten.');
			}
		} catch (error) {
			console.error('Fehler:', error);
		}
	}

  onMount(() => {
     getUserInfo();
  });

  let email = '';
  let password = '';

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      email,
      password
    };


    const url = "http://localhost:3001";
    const endpoint = "/session";  
    const endpointURL= url + endpoint;

    try {
      const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials:"include"  // Include cookies
      });

      if (response.ok) {
        // Login successful
        console.log('Login successful.');
        goto("/homePage");
       
      } else {
        // Error handling
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  function handleRedirect() {
    goto("/homePage");
  }
</script>

{#if loggedIn}
  {handleRedirect()}
  {:else}
  <main class="h-full">
    <div class="grid h-full justify-center items-center ">
      <div class="w-full  max-w-md space-y-8 bg-background-70 dark:bg-background-90 shadow-md rounded-lg px-6 py-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-center text-primary-300 mb-6">Log in</h1>
        <form class="space-y-6" on:submit={handleSubmit}>
          <div>
            <label for="email" class="block text-sm font-bold mb-2 text-text-300">Email</label>
            <input type="email" id="email" bind:value={email} required class="appearance-none border rounded w-full py-2 px-3 text-text-300 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label for="password" class="block text-sm font-bold mb-2 text-text-300">Password</label>
            <input type="password" id="password" bind:value={password} required class="appearance-none border rounded w-full py-2 px-3 text-text-300 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button type="submit" class="w-full bg-primary-250 hover:bg-primary-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Log in
          </button>
        </form>
        
        <div class="text-center mt-8">
          <a href="/Register" class="px-6 py-2 text-sm font-semibold bg-primary-100 hover:bg-primary-90 dark:bg-primary-200 rounded-full dark:hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50">
            Register
          </a>
        </div>
      </div>
    </div>
  </main>
  {/if}