<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let showProgramsDropdown = false;
	let dropdownRef: HTMLElement;
	let buttonRef: HTMLElement;

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && buttonRef && !dropdownRef.contains(event.target as Node) && !buttonRef.contains(event.target as Node)) {
			showProgramsDropdown = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<header class="bg-white border-b transition-smooth" style="border-color:#000000;">
	<nav class="container mx-auto px-4" style="padding-top: 0.1rem; padding-bottom: 0.1rem;">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center transition-transform hover:scale-105">
				<img src="/main-icon.png" alt="Abelar" class="h-16 transition-smooth" />
			</a>
			
			<!-- Navigation Links -->
			<div class="hidden md:flex items-center gap-0">
				<a href="/" class="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 relative group">
					<span class="relative z-10">Home</span>
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
				</a>
				<div class="h-4 w-px bg-primary transition-opacity duration-300" style="transform: skewX(15deg);"></div>
				<a href="/works" class="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 relative group">
					<span class="relative z-10">Works</span>
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
				</a>
				<div class="h-4 w-px bg-primary transition-opacity duration-300" style="transform: skewX(15deg);"></div>
				<div class="relative">
					<button 
						bind:this={buttonRef}
						on:click|stopPropagation={() => showProgramsDropdown = !showProgramsDropdown}
						class="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 relative group flex items-center gap-1"
					>
						<span class="relative z-10">Programs</span>
						<svg class="w-4 h-4 transition-transform duration-300 {showProgramsDropdown ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
						<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
					</button>
					{#if showProgramsDropdown}
						<div 
							bind:this={dropdownRef}
							class="absolute top-full left-0 mt-1 bg-white border border-black shadow-lg z-50 min-w-[200px] animate-fade-in"
							transition:fly={{ y: -10, duration: 200 }}
						>
							<a href="/programs" class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300" on:click={() => showProgramsDropdown = false}>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
								All Programs
							</a>
							<a href="/opportunities" class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300 border-t border-gray-200" on:click={() => showProgramsDropdown = false}>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								Opportunities
							</a>
						</div>
					{/if}
				</div>
				<div class="h-4 w-px bg-primary transition-opacity duration-300" style="transform: skewX(15deg);"></div>
				<a href="/about" class="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 relative group">
					<span class="relative z-10">About</span>
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
				</a>
				<div class="h-4 w-px bg-primary transition-opacity duration-300" style="transform: skewX(15deg);"></div>
				<a href="/writing-guide" class="px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 relative group">
					<span class="relative z-10">Writing Guide</span>
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
				</a>
			</div>
			
			<!-- Action Buttons -->
			<div class="flex items-center gap-3">
				<a href="/support" class="px-4 py-2 border-2 border-black text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 rounded btn-press">
					Contact Us
				</a>
				<a href="/app/submit" class="px-4 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded btn-press shadow-md hover:shadow-lg">
					Submit Work
				</a>
			</div>
		</div>
	</nav>
</header>
