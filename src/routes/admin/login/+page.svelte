<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	onMount(async () => {
		if (browser) {
			// Check if already signed in as admin
			const supabase = createClient();
			const { data: { session } } = await supabase.auth.getSession();
			
			if (session) {
				// Check if user is admin (you would check against your profiles table)
				const { data: profile } = await supabase
					.from('profiles')
					.select('role')
					.eq('id', session.user.id)
					.single();
				
				if (profile?.role === 'admin') {
					goto('/admin/dashboard');
				}
			}
		}
	});

	async function handleSignIn() {
		loading = true;
		error = '';
		
		const supabase = createClient();
		const { data, error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (signInError) {
			error = signInError.message;
			loading = false;
			return;
		}

		// Check if user is admin
		const { data: profile, error: profileError } = await supabase
			.from('profiles')
			.select('role')
			.eq('id', data.user.id)
			.single();

		if (profileError || profile?.role !== 'admin') {
			error = 'You do not have admin access';
			await supabase.auth.signOut();
			loading = false;
			return;
		}

		goto('/admin/dashboard');
	}
</script>

<svelte:head>
	<title>Admin Login | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<!-- Left Side - Form -->
	<div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
		<div class="w-full max-w-md animate-fade-in">
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
					Admin Portal 🔐
				</h1>
				<p class="text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">
					Welcome! Please enter your admin credentials.
				</p>
			</div>
			
			<form on:submit|preventDefault={handleSignIn} class="space-y-5">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 text-sm transition-all duration-300">
						{error}
					</div>
				{/if}

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
						placeholder="Enter your admin email"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
						placeholder="••••••••"
					/>
				</div>

				<div class="flex items-center justify-end">
					<a href="/admin/forgot" class="text-sm text-primary hover:underline font-medium transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">Forgot password</a>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium disabled:opacity-50 btn-press"
				>
					{loading ? 'Signing in...' : 'Sign in'}
				</button>
			</form>

			<div class="mt-8 text-center">
				<a href="/" class="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">
					← Back to main site
				</a>
			</div>
		</div>
	</div>

	<!-- Right Side - Image -->
	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
