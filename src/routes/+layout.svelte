<script>
	import '../app.postcss';
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';
	import person from '$lib/img/person.webp';
	import logo from '$lib/img/logofinal.png';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();
	const drawerStore = getDrawerStore();

	$: classesSidebar = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';
	$: isOnHomePage = $page.url.pathname === '/';

	function drawerOpen() {
		drawerStore.open({});
	}
</script>

<Drawer class="bg-secondary-50 text-text-300">
    <h2 class="p-4 text-primary-300">Navigation</h2>
    <hr class="border-accent-300" />
    <Navigation />
</Drawer>

<AppShell
    regionPage="relative dark:bg-background-350 "
    slotSidebarLeft="bg-secondary-60 {classesSidebar} dark:bg-secondary-250 "
    slotPageHeader="sticky top-0 z-10 bg-accent-300 text-white"
>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			class="bg-primary-300 text-white grid items-center"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button
						class="lg:hidden btn btn-sm mr-4 bg-accent-300 hover:bg-accent-350 focus:ring-accent-300 focus:ring-offset-2"
						on:click={drawerOpen}
					>
						<span>
							<svg viewBox="0 0 100 80" class="fill-current w-4 h-4">
								<rect width="100" height="20"></rect>
								<rect y="30" width="100" height="20"></rect>
								<rect y="60" width="100" height="20"></rect>
							</svg>
						</span>
					</button>
					<a href="/navbarPages/logo"><img class="hidden lg:block w-40 ml-5" src={logo} alt="logo"/></a>
				</div>
			</svelte:fragment>
			
			<svelte:fragment slot="trail">
				<ThemeSwitch />
				{#if !isOnHomePage}
					<a href="/navbarPages/profile">
						<Avatar src={person} class="w-40px h-40px mx-6 rounded-full border-2 border-accent-300" />
					</a>
				{:else}
					<div>
					<Avatar src={person} class="w-40px h-40px mx-6 rounded-full border-2 border-accent-300" />
				</div>
					{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="flex justify-center items-center bg-background-300 text-background-50">
			<ul class="text-sm">
				<a href="/navbarPages/legal">Legal |</a>
				<a href="/navbarPages/eagle">Eagle</a>
			</ul>
		</div>
	</svelte:fragment>
</AppShell>
