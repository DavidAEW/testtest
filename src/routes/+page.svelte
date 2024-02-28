<!--- Log in page --->
<div class="container h-full mx-auto flex justify-center items-center space-y-16">
	<main>
		<h1 style="font-size: 4rem; margin-bottom: 2rem;">Log in</h1>
		<form action="login" method="post">
			<div>
				<label for="email">Email</label>
				<input type="email" id="email" name="email" required />
			</div>
			<div>
				<label for="password">Password</label>
				<input type="password" id="password" name="password" required />
			</div>
			<button type="submit" class="btn variant-soft-primary mt-6"> Log in </button>
		</form>
		<a href="/homePage" class="text-blue-500 hover:text-blue-700 underline"
			>Click here for the bypass</a
		>
	</main>
</div>
