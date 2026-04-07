<script lang="ts">
	import { goto } from '$app/navigation';

	let error =
		'Password reset via the browser is not wired to the published PHP API. Use your backend tools, then sign in again.';
</script>

<svelte:head>
	<title>Reset Password | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<div
		class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative"
		style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;"
	>
		<div class="w-full max-w-md animate-fade-in">
			<div class="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded mb-6" style="font-family: 'Space Grotesk', sans-serif;">
				{error}
			</div>
			<button
				type="button"
				on:click={() => goto('/auth/sign-in')}
				class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium btn-press"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Back to sign in
			</button>
		</div>
	</div>
	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
