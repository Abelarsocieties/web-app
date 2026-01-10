<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let password = '';
	let confirmPassword = '';
	let loading = false;
	let error = '';

	async function handleResetPassword() {
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		loading = true;
		error = '';
		
		const supabase = createClient();
		const { error: resetError } = await supabase.auth.updateUser({
			password
		});

		if (resetError) {
			error = resetError.message;
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
			<h1 class="text-4xl font-bold text-black mb-8 text-center" style="font-weight: 900;">Reset Password</h1>
			
			<form on:submit|preventDefault={handleResetPassword} class="space-y-6">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
						{error}
					</div>
				{/if}

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
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
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
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
					{loading ? 'Resetting...' : 'Reset Password'}
				</button>
			</form>
		</div>
	</div>
</section>

<Footer />
