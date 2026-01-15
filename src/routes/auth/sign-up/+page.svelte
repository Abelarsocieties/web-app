<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let loading = false;
	let error = '';
	let showSocialError = false;

	async function handleSignUp() {
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		if (password.length < 6) {
			error = 'Password must be at least 6 characters';
			return;
		}

		loading = true;
		error = '';
		
		try {
			const supabase = createClient();
			const { data, error: signUpError } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						first_name: firstName,
						last_name: lastName,
						name: `${firstName} ${lastName}`
					}
				}
			});

			if (signUpError) {
				error = signUpError.message;
				loading = false;
			} else {
				// Check if email confirmation/OTP is required
				if (data.user && !data.session) {
					// OTP/Email confirmation required - redirect to OTP page
					sessionStorage.setItem('signupEmail', email);
					goto('/auth/otp');
				} else if (data.session) {
					// Successfully signed up and logged in (no confirmation needed)
					goto('/app/home');
				}
			}
		} catch (err) {
			error = 'An unexpected error occurred. Please try again.';
			loading = false;
			console.error('Sign up error:', err);
		}
	}

	async function handleGoogleSignUp() {
		showSocialError = true;
		error = '';
		
		// Hide the error after 5 seconds
		setTimeout(() => {
			showSocialError = false;
		}, 5000);
	}
</script>

<svelte:head>
	<title>Sign Up | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<!-- Left Side - Form -->
	<div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
		<div class="w-full max-w-md animate-fade-in">
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
					Hi there 👋
				</h1>
				<p class="text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">
					Welcome to Abelar! Let's get you started.
				</p>
			</div>
			
			<form on:submit|preventDefault={handleSignUp} class="space-y-5">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 text-sm transition-all duration-300 rounded">
						{error}
					</div>
				{/if}
				
				{#if showSocialError}
					<div class="p-4 bg-amber-50 border-2 border-amber-300 text-amber-800 text-sm transition-all duration-300 rounded animate-fade-in" role="alert">
						<div class="flex items-start gap-3">
							<div class="flex-shrink-0 mt-0.5">
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
								</svg>
							</div>
							<div class="flex-1">
								<p class="font-semibold mb-1">🚧 Social Sign-In Temporarily Unavailable</p>
								<p class="text-xs opacity-90">We're polishing our social authentication features. For now, please use email and password to create your account.</p>
							</div>
						</div>
					</div>
				{/if}

				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">First Name</label>
					<input
						id="firstName"
						type="text"
						bind:value={firstName}
						required
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
						placeholder="Enter your first name"
					/>
				</div>

				<div>
					<label for="lastName" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Last Name</label>
					<input
						id="lastName"
						type="text"
						bind:value={lastName}
						required
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
						placeholder="Enter your last name"
					/>
				</div>

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

				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Confirm Password</label>
					<input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						required
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
						placeholder="••••••••"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium disabled:opacity-50 btn-press"
				>
					{loading ? 'Processing...' : 'Proceed'}
				</button>

				<button
					type="button"
					on:click={handleGoogleSignUp}
					disabled={loading}
					class="w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
					title="Google sign-in will be available soon"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24">
						<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
						<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
						<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
						<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
					</svg>
					Continue with Google
				</button>
			</form>

			<div class="mt-6 text-center">
				<p class="text-sm text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">
					Already have an account? <a href="/auth/sign-in" class="text-primary hover:underline font-medium transition-colors duration-300">Sign in</a>
				</p>
			</div>
		</div>
	</div>

	<!-- Right Side - Image -->
	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
