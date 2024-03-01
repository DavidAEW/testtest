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

    let mode = true;

    function switchMode() {
        mode = !mode;
    }

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
    regionPage={mode ? "relative bg-background-350 text-background-50" : "relative"}
    slotSidebarLeft={mode ? "bg-secondary-250 text-background-60 {classesSidebar}" : "bg-secondary-80 {classesSidebar}"}
    slotPageHeader={mode ? "sticky top-0 z-10 bg-accent-300 text-white" : "sticky top-0 z-10 bg-accent-300 text-white"}
>
    <svelte:fragment slot="header">
        <AppBar gridColumns="grid-cols-3" class="bg-primary-300 text-white" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead">
                <div class="flex items-center">
                    <button class="lg:hidden btn btn-sm mr-4 bg-accent-300 hover:bg-accent-350 focus:ring-accent-300 focus:ring-offset-2" on:click={drawerOpen}>
                        <span>
                            <svg viewBox="0 0 100 80" class="fill-current w-4 h-4">
                                <rect width="100" height="20"></rect>
                                <rect y="30" width="100" height="20"></rect>
                                <rect y="60" width="100" height="20"></rect>
                            </svg>
                        </span>
                    </button>
                    <img class="w-40 ml-5" src={logoTransparent} alt="logo" />
                </div>
            </svelte:fragment>
            <strong class="text-xl uppercase">Karteikartenmanager</strong>
            <svelte:fragment slot="trail">
                <button class="bg-background-400 text-text-30 border border-solid border-gray-500 px-4 py-2 rounded-full hover:bg-background-500 shadow-lg transition duration-300 ease-in-out" type="button" on:click={switchMode}>
                    Swap modes
                  </button>                  
                {#if !isOnHomePage}
                    <a href="/navbarPages/profile">
                        <Avatar src={person} class="w-9 h-9 mr-6 rounded-full border-2 border-accent-300" />
                    </a>
                {:else}
                    <Avatar src={person} class="w-9 h-9 mr-6 rounded-full border-2 border-accent-300" />
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
                <li>Legal</li>
            </ul>
        </div>
    </svelte:fragment>
</AppShell>
