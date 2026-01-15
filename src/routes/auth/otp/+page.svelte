<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import { browser } from '$app/environment';

	let otp = ['', '', '', '', '', ''];
	let loading = false;
	let error = '';
	let success = false;
	let maskedEmail = '';
	let email = '';
	let inputRefs: HTMLInputElement[] = [];
	let resendCooldown = 0;

	onMount(() => {
		if (browser) {
			email = sessionStorage.getItem('resetEmail') || sessionStorage.getItem('signupEmail') || '';
			if (email) {
				// Mask the email
				const [localPart, domain] = email.split('@');
				const maskedLocal = localPart.substring(0, 2) + '*'.repeat(Math.max(localPart.length - 2, 5));
				maskedEmail = `${maskedLocal}@${domain}`;
			} else {
				maskedEmail = 'email**********@gmail.com';
			}
			// Focus first input
			setTimeout(() => {
				if (inputRefs[0]) {
					inputRefs[0].focus();
				}
			}, 100);
		}
	});

	function handleInput(index: number, event: Event) {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		
		// Only allow numbers
		if (!/^\d*$/.test(value)) {
			otp[index] = '';
			return;
		}

		otp[index] = value.slice(-1);
		
		// Move to next input
		if (value && index < 5) {
			inputRefs[index + 1]?.focus();
		}
		
		// Auto-submit when all 6 digits are entered
		if (value && index === 5 && otp.every(d => d !== '')) {
			handleVerify();
		}
	}

	function handleKeydown(index: number, event: KeyboardEvent) {
		if (event.key === 'Backspace' && !otp[index] && index > 0) {
			inputRefs[index - 1]?.focus();
		}
	}

	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const clipboardText = event.clipboardData?.getData('text');
		if (!clipboardText) return;
		
		const pastedData = clipboardText.slice(0, 6).replace(/\D/g, '');
		
		if (pastedData.length > 0) {
			pastedData.split('').forEach((char, i) => {
				if (i < 6) otp[i] = char;
			});
			const nextIndex = Math.min(pastedData.length, 5);
			if (inputRefs[nextIndex]) {
				inputRefs[nextIndex].focus();
			}
		}
	}

	async function handleVerify() {
		const otpCode = otp.join('');
		if (otpCode.length !== 6) {
			error = 'Please enter the complete 6-digit code';
			return;
		}

		if (!email) {
			error = 'Email not found. Please start over.';
			return;
		}

		loading = true;
		error = '';
		
		try {
			const supabase = createClient();
			
			// Determine OTP type based on context
			const isPasswordReset = sessionStorage.getItem('resetEmail') !== null;
			const otpType = isPasswordReset ? 'recovery' : 'signup';
			
			const { data, error: verifyError } = await supabase.auth.verifyOtp({
				email,
				token: otpCode,
				type: otpType as 'signup' | 'recovery' | 'email'
			});

			if (verifyError) {
				error = verifyError.message || 'Invalid or expired code. Please try again.';
				loading = false;
			} else if (data.session) {
				// Successfully verified
				success = true;
				sessionStorage.removeItem('resetEmail');
				sessionStorage.removeItem('signupEmail');
				
				// Redirect based on context - default to user dashboard
				if (isPasswordReset) {
					setTimeout(() => {
						goto('/auth/reset');
					}, 1000);
				} else {
					setTimeout(() => {
						goto('/app/home');
					}, 1000);
				}
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
			loading = false;
			console.error('OTP verification error:', err);
		}
	}

	async function handleResend() {
		if (resendCooldown > 0 || !email) return;
		
		loading = true;
		error = '';
		
		try {
			const supabase = createClient();
			const isPasswordReset = sessionStorage.getItem('resetEmail') !== null;
			
			if (isPasswordReset) {
				// Resend password reset OTP
				const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
					redirectTo: `${window.location.origin}/auth/reset`
				});
				if (resetError) {
					error = resetError.message;
					loading = false;
					return;
				}
			} else {
				// Resend signup OTP
				const { error: signupError } = await supabase.auth.signInWithOtp({
					email,
					options: {
						shouldCreateUser: true
					}
				});
				if (signupError) {
					error = signupError.message;
					loading = false;
					return;
				}
			}
			
			// Set cooldown timer
			resendCooldown = 60;
			const interval = setInterval(() => {
				resendCooldown--;
				if (resendCooldown <= 0) {
					clearInterval(interval);
				}
			}, 1000);
			
			success = true;
			setTimeout(() => {
				success = false;
			}, 3000);
			loading = false;
		} catch (err) {
			error = 'Failed to resend code. Please try again.';
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Verify Email | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<!-- Left Side - Form -->
	<div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
		<div class="w-full max-w-md animate-fade-in">
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-gray-900 mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
					Check your email
				</h1>
				<p class="text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">
					Input the code sent to your email<br/>
					<span class="text-primary font-medium">{maskedEmail}</span>
				</p>
			</div>
			
			<form on:submit|preventDefault={handleVerify} class="space-y-5">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 text-sm transition-all duration-300">
						{error}
					</div>
				{/if}

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-3" style="font-family: 'Space Grotesk', sans-serif;">Code</label>
					<div class="flex gap-3 justify-start" on:paste={handlePaste}>
						{#each otp as digit, index}
							<input
								type="text"
								inputmode="numeric"
								maxlength="1"
								bind:value={otp[index]}
								bind:this={inputRefs[index]}
								on:input={(e) => handleInput(index, e)}
								on:keydown={(e) => handleKeydown(index, e)}
								class="w-14 h-14 text-center text-xl font-bold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
								style="font-family: 'Space Grotesk', sans-serif;"
							/>
						{/each}
					</div>
					<p class="text-xs text-gray-500 mt-2" style="font-family: 'Space Grotesk', sans-serif;">
						Enter the 6-digit code sent to your email
					</p>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium disabled:opacity-50 btn-press"
				>
					{loading ? 'Verifying...' : 'Proceed'}
				</button>
			</form>

			{#if success && !loading}
				<div class="p-3 bg-green-50 border border-green-200 text-green-700 text-sm transition-all duration-300 rounded">
					Code sent! Please check your email.
				</div>
			{/if}

			<div class="mt-6 text-center">
				<p class="text-sm text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">
					Didn't receive the code? 
					<button 
						type="button"
						on:click={handleResend}
						disabled={resendCooldown > 0 || loading}
						class="text-primary hover:underline font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
					</button>
				</p>
			</div>
		</div>
	</div>

	<!-- Right Side - Image -->
	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
