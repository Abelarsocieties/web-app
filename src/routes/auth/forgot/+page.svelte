<script lang="ts">
	import { createClient } from '$lib/supabase/client';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let email = '';
	let loading = false;
	let success = false;
	let error = '';

	async function handleForgotPassword() {
		loading = true;
		error = '';
		success = false;
		
		const supabase = createClient();
		const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/auth/reset`
		});

		if (resetError) {
			error = resetError.message;
			loading = false;
		} else {
			success = true;
			loading = false;
		}
	}
</script>

<PublicHeader />

<section class="py-16 bg-white min-h-screen">
	<div class="container mx-auto px-4">
		<div class="max-w-md mx-auto">
			<h1 class="text-4xl font-bold text-black mb-8 text-center" style="font-weight: 900;">Forgot Password</h1>
			
			{#if success}
				<div class="p-4 bg-green-50 border border-green-200 text-green-700 rounded mb-6">
					Check your email for a password reset link.
				</div>
			{:else}
				<form on:submit|preventDefault={handleForgotPassword} class="space-y-6">
					{#if error}
						<div class="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
							{error}
						</div>
					{/if}

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							required
							class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="your@email.com"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
					>
						{loading ? 'Sending...' : 'Send Reset Link'}
					</button>
				</form>
			{/if}

			<div class="mt-6 text-center">
				<a href="/auth/sign-in" class="text-primary hover:underline text-sm">Back to Sign In</a>
			</div>
		</div>
	</div>
</section>

<Footer />
