<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let loading = false;
	let error = '';

	async function handleSignUp() {
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		loading = true;
		error = '';
		
		const supabase = createClient();
		const { error: signUpError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name
				}
			}
		});

		if (signUpError) {
			error = signUpError.message;
			loading = false;
		} else {
			goto('/auth/otp');
		}
	}
</script>

<PublicHeader />

<section class="py-16 bg-white min-h-screen">
	<div class="container mx-auto px-4">
		<div class="max-w-md mx-auto">
			<h1 class="text-4xl font-bold text-black mb-8 text-center" style="font-weight: 900;">Sign Up</h1>
			
			<form on:submit|preventDefault={handleSignUp} class="space-y-6">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
						{error}
					</div>
				{/if}

				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						required
						class="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-primary"
						placeholder="Your name"
					/>
				</div>

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

				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
					<input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
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
					{loading ? 'Signing up...' : 'Sign Up'}
				</button>
			</form>

			<div class="mt-6 text-center">
				<p class="text-sm text-gray-600">
					Already have an account? <a href="/auth/sign-in" class="text-primary hover:underline">Sign in</a>
				</p>
			</div>
		</div>
	</div>
</section>

<Footer />
