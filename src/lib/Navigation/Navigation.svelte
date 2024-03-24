<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/homePage" on:click={drawerClose}>Homepage</a></li>
		<li><a href="/navbarPages/about" on:click={drawerClose}>About</a></li>
		<li><a href="/navbarPages/contact" on:click={drawerClose}>Contact</a></li>
	</ul>
</nav>