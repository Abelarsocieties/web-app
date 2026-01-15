<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { submitContactMessage } from '$lib/supabase/edge-functions';

	let firstName = '';
	let email = '';
	let message = '';
	let loading = false;
	let error = '';
	let success = false;
	let redirectCountdown = 10;

	onMount(() => {
		if (browser && success) {
			startCountdown();
		}
	});

	function startCountdown() {
		const interval = setInterval(() => {
			redirectCountdown--;
			if (redirectCountdown <= 0) {
				clearInterval(interval);
				goto('/');
			}
		}, 1000);
	}

	async function handleSubmit() {
		if (!firstName || !email || !message) {
			error = 'Please fill in all fields';
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			error = 'Please enter a valid email address';
			return;
		}

		loading = true;
		error = '';
		success = false;

		try {
			// Call Edge Function instead of direct DB access (secure)
			const { data, error: submitError } = await submitContactMessage({
				first_name: firstName,
				email: email,
				message: message
			});

			if (submitError) {
				throw new Error(submitError);
			}
			
			// Success
			success = true;
			firstName = '';
			email = '';
			message = '';
			redirectCountdown = 10;
			startCountdown();
		} catch (err) {
			error = 'Failed to send message. Please try again later.';
			console.error('Contact form error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Us | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<!-- Left Side - Form -->
	<div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
		<div class="w-full max-w-md animate-fade-in">
			<!-- Back button -->
			<a href="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 mb-6" style="font-family: 'Space Grotesk', sans-serif;">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				<span>Back</span>
			</a>
			
			<!-- Support label -->
			<!-- <p class="text-sm text-gray-500 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Support</p> -->
			
			<!-- Title -->
			<h1 class="text-4xl font-bold text-gray-900 mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
				Contact Us
			</h1>
			<p class="text-gray-500 mb-8" style="font-family: 'Space Grotesk', sans-serif;">
				Our lovely team would love to hear from you!
			</p>
			
			<form on:submit|preventDefault={handleSubmit} class="space-y-5">
				{#if error}
					<div class="p-4 bg-red-50 border border-red-200 text-red-700 text-sm transition-all duration-300 rounded">
						{error}
					</div>
				{/if}
				
				{#if success}
					<div class="p-4 bg-green-50 border border-green-200 text-green-700 text-sm transition-all duration-300 rounded">
						<p class="font-semibold mb-2">✓ Message sent successfully!</p>
						<p>Thank you for contacting us! We'll get back to you soon.</p>
						<p class="text-xs mt-2 opacity-75">Redirecting to home page in {redirectCountdown} seconds...</p>
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
					<label for="message" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Message</label>
					<textarea
						id="message"
						bind:value={message}
						required
						rows="6"
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
						placeholder="Enter message here"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={loading || success}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium disabled:opacity-50 btn-press rounded"
				>
					{loading ? 'Sending...' : 'Send'}
				</button>
			</form>

			{#if success}
				<div class="mt-6 text-center">
					<a 
						href="/" 
						class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-black text-black hover:bg-gray-50 transition-all duration-300 font-medium btn-press"
						style="font-family: 'Space Grotesk', sans-serif;"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
						Return to Main Page
					</a>
				</div>
			{:else}
				<div class="mt-6 text-center">
					<a 
						href="/" 
						class="text-sm text-gray-600 hover:text-primary transition-colors duration-300"
						style="font-family: 'Space Grotesk', sans-serif;"
					>
						← Return to Main Page
					</a>
				</div>
			{/if}
		</div>
	</div>

	<!-- Right Side - Image -->
	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
