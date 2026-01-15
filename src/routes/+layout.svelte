<script lang="ts">
	import '../app.css';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	// Check if current route is auth, admin, or support (no header/footer)
	$: isAuthRoute = $page.url.pathname.startsWith('/auth') || $page.url.pathname.startsWith('/admin') || $page.url.pathname === '/support';
	$: isAppRoute = $page.url.pathname.startsWith('/app');
</script>

<div class="min-h-screen flex flex-col animate-fade-in">
	{#if !isAuthRoute && !isAppRoute}
		<PublicHeader user={data.user} />
	{/if}
	<main class="flex-1">
		{#key $page.url.pathname}
			<div in:fade={{ duration: 300 }}>
				<slot />
			</div>
		{/key}
	</main>
	{#if !isAuthRoute && !isAppRoute}
		<Footer />
	{/if}
</div>

