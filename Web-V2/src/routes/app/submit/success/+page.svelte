<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let submissionType: 'text' | 'upload' = 'text';

	onMount(() => {
		// Get submission type from URL params or default to text
		const type = $page.url.searchParams.get('type');
		if (type === 'upload') {
			submissionType = 'upload';
		}
	});
</script>

<svelte:head>
	<title>Submission Successful | Abelar</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Top indicator -->
	<div class="bg-gray-100 py-2">
		<div class="container mx-auto px-4">
			<p class="text-gray-500 text-sm" style="font-family: 'Space Grotesk', sans-serif;">Submitted!</p>
		</div>
	</div>

	<div class="container mx-auto px-4 py-8">
		<!-- Page Title -->
		<h1 class="text-4xl font-bold mb-6" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Submit Article</h1>

		<!-- Tabs (showing which method was used) -->
		<div class="flex gap-2 mb-6 border-b-2 border-black">
			<button
				class="px-6 py-3 font-medium transition-all duration-300 {submissionType === 'text' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 cursor-not-allowed'}"
				style="font-family: 'Space Grotesk', sans-serif; border-bottom-width: 3px;"
				disabled
			>
				Text Editor
			</button>
			<button
				class="px-6 py-3 font-medium transition-all duration-300 {submissionType === 'upload' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 cursor-not-allowed'}"
				style="font-family: 'Space Grotesk', sans-serif; border-bottom-width: 3px;"
				disabled
			>
				Document Upload
			</button>
		</div>

		<!-- Success Card -->
		<div class="bg-white border-2 border-black rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
			<!-- Illustration -->
			<div class="mb-8 flex justify-center">
				<svg width="300" height="250" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" class="max-w-full h-auto">
					<!-- Machine/Box (main body) -->
					<rect x="100" y="80" width="120" height="100" stroke="black" stroke-width="3" fill="white" rx="4"/>
					
					<!-- Slot opening on left side -->
					<rect x="95" y="110" width="10" height="40" stroke="black" stroke-width="2" fill="white"/>
					
					<!-- Circular elements on machine front -->
					<circle cx="130" cy="120" r="12" stroke="black" stroke-width="2" fill="none"/>
					<circle cx="160" cy="120" r="12" stroke="black" stroke-width="2" fill="none"/>
					<circle cx="190" cy="120" r="12" stroke="black" stroke-width="2" fill="none"/>
					
					<!-- Horizontal lines on machine -->
					<line x1="110" y1="145" x2="210" y2="145" stroke="black" stroke-width="2"/>
					<line x1="110" y1="155" x2="210" y2="155" stroke="black" stroke-width="2"/>
					<line x1="110" y1="165" x2="210" y2="165" stroke="black" stroke-width="2"/>
					
					<!-- Hand (simplified) -->
					<ellipse cx="60" cy="130" rx="20" ry="25" stroke="black" stroke-width="2" fill="white"/>
					<!-- Fingers -->
					<ellipse cx="45" cy="115" rx="8" ry="12" stroke="black" stroke-width="2" fill="white"/>
					<ellipse cx="50" cy="110" rx="6" ry="10" stroke="black" stroke-width="2" fill="white"/>
					<ellipse cx="55" cy="108" rx="5" ry="8" stroke="black" stroke-width="2" fill="white"/>
					
					<!-- Document being inserted -->
					<rect x="70" y="105" width="30" height="50" stroke="black" stroke-width="2" fill="white"/>
					<!-- Document lines -->
					<line x1="75" y1="115" x2="95" y2="115" stroke="black" stroke-width="1"/>
					<line x1="75" y1="125" x2="95" y2="125" stroke="black" stroke-width="1"/>
					<line x1="75" y1="135" x2="90" y2="135" stroke="black" stroke-width="1"/>
					
					<!-- Scroll/Paper coming out from right side -->
					<path d="M 220 130 Q 240 120 260 130 Q 280 140 300 130" stroke="black" stroke-width="3" fill="none"/>
					<path d="M 220 130 Q 240 140 260 130 Q 280 120 300 130" stroke="black" stroke-width="3" fill="none"/>
					
					<!-- Checkmark boxes on scroll -->
					<rect x="230" y="120" width="20" height="20" stroke="black" stroke-width="2" fill="white" rx="2"/>
					<rect x="255" y="120" width="20" height="20" stroke="black" stroke-width="2" fill="white" rx="2"/>
					<rect x="280" y="120" width="20" height="20" stroke="black" stroke-width="2" fill="white" rx="2"/>
					
					<!-- Checkmarks inside boxes -->
					<path d="M 235 130 L 240 135 L 245 125" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M 260 130 L 265 135 L 270 125" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M 285 130 L 290 135 L 295 125" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
					
					<!-- More scroll extending -->
					<path d="M 300 130 Q 310 125 320 130" stroke="black" stroke-width="2" fill="none" stroke-dasharray="3,3"/>
				</svg>
			</div>

			<!-- Confirmation Heading -->
			<h2 class="text-3xl font-bold text-center mb-4" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">
				Your Work Has Been Submitted!
			</h2>

			<!-- Confirmation Message -->
			<p class="text-gray-700 text-center mb-8 leading-relaxed" style="font-family: 'Space Grotesk', sans-serif;">
				Thank you for sharing your ideas with the Abelar Africa community. Our review team will go through your submission and get back to you soon. Expect a follow-up email with feedback or next steps within a few days.
			</p>

			<!-- Back to Home Button -->
			<div class="flex justify-center mb-8">
				<button
					on:click={() => goto('/app/home')}
					class="px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium flex items-center gap-2 btn-press shadow-md hover:shadow-lg"
					style="font-family: 'Space Grotesk', sans-serif;"
				>
					<span>Back to home</span>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</button>
			</div>

			<!-- What's next Section -->
			<div class="border-t-2 border-black pt-8">
				<!-- What's next Heading -->
				<div class="flex items-center gap-2 mb-6">
					<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<h3 class="text-xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">What's next?</h3>
				</div>

				<!-- What Happens Next -->
				<div class="mb-6">
					<div class="flex items-center gap-2 mb-3">
						<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
						<h4 class="text-lg font-semibold" style="font-weight: 700; font-family: 'Space Grotesk', sans-serif;">What Happens Next</h4>
					</div>
					<p class="text-gray-700 leading-relaxed ml-7" style="font-family: 'Space Grotesk', sans-serif;">
						We'll review your submission for quality and relevance. Once approved, it will be published on Abelar Africa and shared with our network of partners and readers.
					</p>
				</div>

				<!-- Stay in Touch -->
				<div>
					<div class="flex items-center gap-2 mb-3">
						<svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<h4 class="text-lg font-semibold" style="font-weight: 700; font-family: 'Space Grotesk', sans-serif;">Stay in Touch</h4>
					</div>
					<p class="text-gray-700 leading-relaxed ml-7" style="font-family: 'Space Grotesk', sans-serif;">
						You'll receive updates and feedback via your registered email. Our team may also reach out directly for clarifications or collaboration opportunities.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
