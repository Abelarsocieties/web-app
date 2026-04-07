<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	let success = false;
	let redirectCountdown = 10;

	function startCountdown() {
		const interval = setInterval(() => {
			redirectCountdown--;
			if (redirectCountdown <= 0) {
				clearInterval(interval);
				goto('/');
			}
		}, 1000);
	}

	function formSucceeded(data: unknown): boolean {
		if (!data || typeof data !== 'object') return false;
		return (data as Record<string, unknown>).success === true;
	}
</script>

<svelte:head>
	<title>Contact Us | Abelar</title>
</svelte:head>

<div class="min-h-screen flex">
	<div
		class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative"
		style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;"
	>
		<div class="w-full max-w-md animate-fade-in">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 mb-6"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				<span>Back</span>
			</a>

			<h1 class="text-4xl font-bold text-gray-900 mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
				Contact Us
			</h1>
			<p class="text-gray-500 mb-6" style="font-family: 'Space Grotesk', sans-serif;">
				Connect this form to your PHP contact endpoint when available. Submitting here acknowledges locally only.
			</p>

			<form
				method="POST"
				action="?/support"
				class="space-y-5"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.type === 'success' && formSucceeded(result.data)) {
							success = true;
							redirectCountdown = 10;
							startCountdown();
						}
						await update();
					};
				}}
			>
				{#if success}
					<div class="p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded">
						<p class="font-semibold mb-1">Thanks — your message was received by the app.</p>
						<p class="text-xs opacity-80">Redirecting home in {redirectCountdown}s…</p>
					</div>
				{/if}

				<div>
					<label for="firstName" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">First Name</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						required
						disabled={success}
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
						placeholder="Enter your first name"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						disabled={success}
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
						placeholder="Enter your email"
					/>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-gray-700 mb-1.5" style="font-family: 'Space Grotesk', sans-serif;">Message</label>
					<textarea
						id="message"
						name="message"
						required
						rows="6"
						disabled={success}
						class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50"
						placeholder="Enter message here"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={success}
					class="w-full px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium btn-press rounded disabled:opacity-50"
				>
					Send
				</button>
			</form>

			<div class="mt-6 text-center">
				<a href="/" class="text-sm text-gray-600 hover:text-primary transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">
					← Return to Main Page
				</a>
			</div>
		</div>
	</div>

	<div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
		<img src="/auth-bg.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
	</div>
</div>
