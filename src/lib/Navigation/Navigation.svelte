<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
    <ul class="h-full space-y-6 flex flex-col items-center text-xl">
        <li class="flex items-center justify-center h-10"><a href="/homePage" on:click="{drawerClose}">Homepage</a></li>
        <li class="h-px bg-black w-full"></li>
        <li class="flex items-center justify-center h-10"><a href="/homePage/manageDecks" on:click="{drawerClose}">Manage Decks</a></li>
        <li class="h-px bg-black w-full"></li>
        <li class="flex items-center justify-center h-10"><a href="/homePage/manageTags" on:click="{drawerClose}">Manage Tags</a></li>
        <li class="h-px bg-black w-full"></li>
        <li class="flex items-center justify-center h-10"><a href="/navbarPages/contact" on:click="{drawerClose}">Contact</a></li>
        <li class="h-px bg-black w-full"></li>
        <li class="flex items-center justify-center h-10"><a href="/navbarPages/about" on:click="{drawerClose}">About</a></li>
        <li class="h-px bg-black w-full"></li>
    </ul>
</nav>
