<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (browser) {
			goto('/auth/sign-in');
		}
	});
</script>

<svelte:head>
	<title>Authenticating... | Abelar</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-white">
	<p class="text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">Redirecting…</p>
</div>
