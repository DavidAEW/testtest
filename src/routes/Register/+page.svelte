<script>
  async function handleRegister() {

    event.preventDefault(); // Verhindert das standard submit Verhalten
    let email = document.getElementById('email-address').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const userData = {
      email,
      username,
      password,
    };

    console.log('Daten:', userData);
    const url = "http://localhost:3001";
    const endpoint = "/addUser/";

    const endpointURL= url + endpoint;   
    try {
      const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Registrierung erfolgreich
        console.log('Registrierung erfolgreich.');
        // Weiterleitung oder Anzeige einer Erfolgsmeldung
      } else {
        // Fehlerbehandlung
        console.error('Registrierung fehlgeschlagen.');
      }
    } catch (error) {
      console.error('Fehler beim Senden der Daten:', error);
    
  }
}
</script>

<div class="min-h-screen flex items-center justify-center bg-background-500">
    <div class="max-w-md w-full space-y-8 p-10 bg-background-50 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-primary-300">
          Register
        </h2>
        <p class="mt-2 text-center text-sm text-primary-300">
          Or <a href="/" class="font-medium text-accent-400 hover:text-accent-350">
            log in
          </a> if you already have an account.
        </p>
      </div>
      <form class="mt-8 space-y-6" on:submit|preventDefault={handleRegister}>
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email Address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Email Address">
          </div>
          <div>
            <label for="username" class="sr-only">Username</label>
            <input id="username" name="username" type="text" autocomplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Username">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Password">
          </div>
        </div>
  
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background-50 bg-primary-300 hover:bg-primary-350 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Become a Member
        </button>
        </div>
      </form>
    </div>
  </div>
