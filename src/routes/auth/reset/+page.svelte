<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';

	let password = '';
	let confirmPassword = '';
	let loading = false;
	let error = '';

	// Password validation
	$: hasMinLength = password.length >= 8;
	$: hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	async function handleResetPassword() {
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		if (!hasMinLength || !hasSpecialChar) {
			error = 'Please meet all password requirements';
			return;
		}

		loading = true;
		error = '';
		
		const supabase = createClient();
		const { error: updateError } = await supabase.auth.updateUser({
			password
		});

		if (updateError) {
			error = updateError.message;
			loading = false;
		} else {
			// Clear session storage
			sessionStorage.removeItem('resetEmail');
			goto('/auth/sign-in');
		}
	}
</script>

<svelte:head>
	<title>Reset Password | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<!-- Left Side - Form -->
	<div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
		<div class="w-full max-w-md animate-fade-in">
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
					Reset Password
				</h1>
				<p class="text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">
					Input a new and secure password.
				</p>
			</div>
			
			<form on:submit|preventDefault={handleResetPassword} class="space-y-5">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 text-sm transition-all duration-300">
						{error}
					</div>
				{/if}

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

				<!-- Password Requirements -->
				<div class="space-y-2">
					<label class="flex items-center gap-2">
						<input
							type="checkbox"
							checked={hasMinLength}
							disabled
							class="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
						/>
						<span class="text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">Must be at least 8 characters</span>
					</label>
					<label class="flex items-center gap-2">
						<input
							type="checkbox"
							checked={hasSpecialChar}
							disabled
							class="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
						/>
						<span class="text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">Must Contain a special character</span>
					</label>
				</div>

				<button
					type="submit"
					disabled={loading || !hasMinLength || !hasSpecialChar}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium disabled:opacity-50 btn-press"
				>
					{loading ? 'Updating...' : 'Sign in'}
				</button>
			</form>
		</div>
	</div>

	<!-- Right Side - Image -->
	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
