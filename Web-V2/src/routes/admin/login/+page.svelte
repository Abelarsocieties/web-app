<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form; // Data from server action

	let email = '';
	let password = '';
	let loading = false;
	let error = form?.message || '';

	function handleSignInSubmit() {
		loading = true;
		error = '';
	}

	function handleEnhance({ formData }: any) {
		loading = true;
		error = '';
		return async ({ result, update }: any) => {
			loading = false;
			// If redirect happened (success), don't update - let SvelteKit handle the redirect
			if (result.type === 'redirect') {
				return;
			}
			if (result.type === 'failure' && result.data) {
				const data = result.data as { message?: string };
				error = data?.message || 'Sign in failed. Please try again.';
			}
			await update();
		};
	}

	// Update error message if form data changes
	$: if (form?.message) {
		error = form.message;
		loading = false;
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
			
			<form method="POST" action="?/signIn" use:enhance={handleEnhance} class="space-y-5">
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
						name="email"
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
						name="password"
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
