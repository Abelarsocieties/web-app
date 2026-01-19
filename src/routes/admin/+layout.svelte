<script lang="ts">
	import '../../app.css';
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="min-h-screen flex flex-col bg-white">
	<AdminHeader user={data.user} />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
