<script lang="ts">
	import { page } from '$app/stores';
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Error {$page.status} | Abelar</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-white py-20" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
	<div class="text-center animate-fade-in px-4">
		<!-- Error illustration -->
		<div class="relative mb-8">
			<div class="text-[180px] font-bold text-gray-100 leading-none select-none" style="font-family: 'Space Grotesk', sans-serif;">
				{$page.status}
			</div>
			<div class="absolute inset-0 flex items-center justify-center">
				<!-- <img src="/open-book.png" alt="Error" class="w-32 h-32 opacity-80" /> -->
			</div>
		</div>

		<!-- Error message -->
		<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
			{#if $page.status === 404}
				Page Not Found
			{:else if $page.status === 500}
				Server Error
			{:else if $page.status === 403}
				Access Denied
			{:else}
				Something Went Wrong
			{/if}
		</h1>

		<p class="text-gray-500 text-lg mb-8 max-w-md mx-auto" style="font-family: 'Space Grotesk', sans-serif;">
			{#if $page.status === 404}
				Oops! The page you're looking for doesn't exist or has been moved.
			{:else if $page.status === 500}
				Our servers are having some trouble. Please try again later.
			{:else if $page.status === 403}
				You don't have permission to access this page.
			{:else}
				{$page.error?.message || 'An unexpected error occurred.'}
			{/if}
		</p>

		<!-- Action buttons -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a 
				href="/" 
				class="px-8 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium btn-press"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Go to Homepage
			</a>
			<button 
				on:click={() => history.back()}
				class="px-8 py-3 bg-white border border-black text-black hover:bg-gray-50 transition-all duration-300 font-medium"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Go Back
			</button>
		</div>

		<!-- Helpful links -->
		<div class="mt-12 pt-8 border-t border-gray-200">
			<p class="text-sm text-gray-500 mb-4" style="font-family: 'Space Grotesk', sans-serif;">
				Maybe you were looking for:
			</p>
			<div class="flex flex-wrap items-center justify-center gap-4">
				<a href="/works" class="text-primary hover:underline text-sm transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">Works</a>
				<span class="text-gray-300">|</span>
				<a href="/programs" class="text-primary hover:underline text-sm transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">Programs</a>
				<span class="text-gray-300">|</span>
				<a href="/opportunities" class="text-primary hover:underline text-sm transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">Opportunities</a>
				<span class="text-gray-300">|</span>
				<a href="/about" class="text-primary hover:underline text-sm transition-colors duration-300" style="font-family: 'Space Grotesk', sans-serif;">About</a>
			</div>
		</div>
	</div>
</div>
