<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';

	let email = '';
	let loading = false;
	let error = '';

	async function handleForgotPassword() {
		if (!email) {
			error = 'Please enter your email address';
			return;
		}

		loading = true;
		error = '';
		
		try {
			const supabase = createClient();
			
			// Request OTP for password reset
			const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/reset`
			});

			if (resetError) {
				error = resetError.message || 'Failed to send reset code. Please try again.';
				loading = false;
			} else {
				// Store email for OTP page
				sessionStorage.setItem('resetEmail', email);
				goto('/auth/otp');
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
			loading = false;
			console.error('Forgot password error:', err);
		}
	}
</script>

<svelte:head>
	<title>Forgot Password | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<!-- Left Side - Form -->
	<div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
		<div class="w-full max-w-md animate-fade-in">
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
					Forgot Password?
				</h1>
				<p class="text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">
					A code will be sent to your email to help you reset your password.
				</p>
			</div>
			
			<form on:submit|preventDefault={handleForgotPassword} class="space-y-5">
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
						placeholder="Enter your email"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium disabled:opacity-50 btn-press"
				>
					{loading ? 'Sending...' : 'Proceed'}
				</button>
			</form>

			<div class="mt-6 text-center">
				<a href="/auth/sign-in" class="text-sm text-gray-600 hover:text-primary transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">
					← Back to Sign in
				</a>
			</div>
		</div>
	</div>

	<!-- Right Side - Image -->
	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
