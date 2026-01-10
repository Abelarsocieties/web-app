<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let token = '';
	let loading = false;
	let error = '';

	async function handleVerify() {
		loading = true;
		error = '';
		
		const supabase = createClient();
		const { error: verifyError } = await supabase.auth.verifyOtp({
			token,
			type: 'email'
		});

		if (verifyError) {
			error = verifyError.message;
			loading = false;
		} else {
			goto('/app/home');
		}
	}
</script>

<PublicHeader />

<section class="py-16 bg-white min-h-screen">
	<div class="container mx-auto px-4">
		<div class="max-w-md mx-auto">
			<h1 class="text-4xl font-bold text-black mb-8 text-center" style="font-weight: 900;">Verify Email</h1>
			
			<form on:submit|preventDefault={handleVerify} class="space-y-6">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
						{error}
					</div>
				{/if}

				<div>
					<label for="token" class="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
					<input
						id="token"
						type="text"
						bind:value={token}
						required
						class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
						placeholder="000000"
						maxlength="6"
					/>
					<p class="mt-2 text-sm text-gray-500">Enter the 6-digit code sent to your email</p>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
				>
					{loading ? 'Verifying...' : 'Verify'}
				</button>
			</form>
		</div>
	</div>
</section>

<Footer />
