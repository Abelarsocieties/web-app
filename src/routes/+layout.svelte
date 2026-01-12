<script lang="ts">
	import '../app.css';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
</script>

<div class="min-h-screen flex flex-col animate-fade-in">
	<PublicHeader />
	<main class="flex-1">
		{#key $page.url.pathname}
			<div in:fade={{ duration: 300 }}>
				<slot />
			</div>
		{/key}
	</main>
	<Footer />
</div>

