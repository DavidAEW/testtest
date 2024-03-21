<script>
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  let email = '';
  let password = '';

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const userData = {
      email,
      password
    };

    console.log('Data:', userData);

    const url = "http://localhost:3001";
    const endpoint = "/login/";  
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
        window.location.href = "/homePage";
      } else {
        // Error handling
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
</script>
<main>
  <div class="container h-screen flex justify-center items-center">
    <div class="bg-background-70 dark:bg-background-90 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 class="text-4xl font-bold text-center text-primary-300 mb-8">Log in</h1>
      <form class="mt-8 space-y-6" on:submit={handleSubmit}>
        <div>
          <label for="email" class="block text-sm font-bold mb-2 text-text-300">Email</label>
          <input type="email" id="email" name="email" bind:value={email} required class="appearance-none border rounded w-full py-2 px-3 text-text-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label for="password" class="block text-sm font-bold mb-2 text-text-300">Password</label>
          <input type="password" id="password" name="password" bind:value={password} required class="appearance-none border rounded w-full py-2 px-3 text-text-300 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" class="w-full bg-primary-250 hover:bg-primary-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Log in
        </button>
      </form>
      <div class="mt-6 text-center">
        <a href="/homePage" class="text-accent-300 hover:text-accent-350 underline">Click here for the bypass</a>
      </div>
      <div class="text-center mt-8">
        <a href="/Register" class="inline-block px-6 py-2 text-sm font-semibold text-center bg-primary-100 hover:bg-primary-90 dark:bg-primary-200 rounded-full dark:hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50">
          Register
        </a>
      </div>
    </div>
  </div>
</main>
