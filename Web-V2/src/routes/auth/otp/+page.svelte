<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (browser) {
			goto('/auth/sign-up');
		}
	});
</script>

<svelte:head>
	<title>Verification | Abelar</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-white px-4">
	<p class="text-gray-600 text-center max-w-md" style="font-family: 'Space Grotesk', sans-serif;">
		Verification is handled on the sign-up page (verification code + create account). Redirecting…
	</p>
</div>
