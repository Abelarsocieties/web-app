<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	async function handleSignIn() {
		loading = true;
		error = '';
		
		const supabase = createClient();
		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (signInError) {
			error = signInError.message;
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
			<h1 class="text-4xl font-bold text-black mb-8 text-center" style="font-weight: 900;">Sign In</h1>
			
			<form on:submit|preventDefault={handleSignIn} class="space-y-6">
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

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="••••••••"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
				>
					{loading ? 'Signing in...' : 'Sign In'}
				</button>
			</form>

			<div class="mt-6 text-center space-y-2">
				<a href="/auth/forgot" class="text-primary hover:underline text-sm">Forgot password?</a>
				<p class="text-sm text-gray-600">
					Don't have an account? <a href="/auth/sign-up" class="text-primary hover:underline">Sign up</a>
				</p>
			</div>
		</div>
	</div>
</section>

<Footer />
