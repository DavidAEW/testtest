<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';
	import person from '$lib/img/person.webp';
	import logoWeiss from '$lib/img/logoWeiss.png';
	import logoTransparent from '$lib/img/karteikartenmanager-high-resolution-logo-transparent.png';
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

<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation />
</Drawer>

<AppShell
	regionPage="relative"
	slotSidebarLeft="bg-surface-500/5 {classesSidebar}"
	slotPageHeader="sticky top-0 z-10"
>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<img class="w-40 ml-5" src={logoTransparent} alt="logo" />
				</div>
			</svelte:fragment>

			<strong class="text-xl uppercase">Karteikartenmanager</strong>
			<svelte:fragment slot="trail">
				{#if !isOnHomePage}
					<a href="/navbarPages/profile">
						<Avatar src={person} class="w-9 h-9 mr-6 rounded-full" />
					</a>
				{:else}
					<Avatar src={person} class="w-9 h-9 mr-6 rounded-full" />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<div class="flex justify-center items-center">
			<ul>
				<li>Legal</li>
			</ul>
		</div>
	</svelte:fragment>
</AppShell>
