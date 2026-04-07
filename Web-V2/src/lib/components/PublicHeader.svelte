<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let user: {
		id: string;
		name: string | null;
		email?: string | null;
		avatar_url: string | null;
		role: 'user' | 'editor' | 'admin';
	} | null = null;

	let showProgramsDropdown = false;
	let showUserDropdown = false;
	let showMobileMenu = false;
	let userEmail = '';
	let dropdownRef: HTMLElement;
	let buttonRef: HTMLElement;
	let userButtonRef: HTMLElement;
	let userDropdownRef: HTMLElement;

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && buttonRef && !dropdownRef.contains(event.target as Node) && !buttonRef.contains(event.target as Node)) {
			showProgramsDropdown = false;
		}
		if (userDropdownRef && userButtonRef && !userDropdownRef.contains(event.target as Node) && !userButtonRef.contains(event.target as Node)) {
			showUserDropdown = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		
		if (browser && user?.email) {
			userEmail = user.email;
		}
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleSignOut() {
		window.location.href = '/auth/sign-out';
	}
</script>

<header class="bg-white border-b transition-smooth" style="border-color:#000000;">
	<nav class="container mx-auto px-4" style="padding-top: 0.1rem; padding-bottom: 0.1rem;">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center transition-transform hover:scale-105">
				<img src="/main-icon.png" alt="Abelar" class="h-16 transition-smooth" />
			</a>
			
			<!-- Desktop Navigation Links -->
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
			
			<!-- Desktop Action Buttons / User Menu -->
			<div class="hidden md:flex items-center gap-3">
				{#if user}
					<!-- User Avatar with Dropdown -->
					<div class="relative">
						<button
							bind:this={userButtonRef}
							on:click|stopPropagation={() => showUserDropdown = !showUserDropdown}
							class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-all duration-300 rounded"
						>
							{#if user.avatar_url}
								<img src={user.avatar_url} alt={user.name || 'User'} class="w-10 h-10 rounded-full border-2 border-gray-300" />
							{:else}
								<div class="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
									<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
							{/if}
							<div class="text-left">
								<p class="text-sm font-semibold text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{user.name || 'User'}</p>
								{#if userEmail}
									<p class="text-xs text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">{userEmail}</p>
								{/if}
							</div>
							<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
						{#if showUserDropdown}
							<div
								bind:this={userDropdownRef}
								class="absolute right-0 top-full mt-2 bg-white border-2 border-black shadow-lg z-50 min-w-[200px] animate-fade-in"
								transition:fly={{ y: -10, duration: 200 }}
							>
								<a href="/app/settings" class="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
									<span style="font-family: 'Space Grotesk', sans-serif;">Settings</span>
								</a>
								<a href="/support" class="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
									<span style="font-family: 'Space Grotesk', sans-serif;">Support</span>
								</a>
								<button
									on:click={handleSignOut}
									class="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300"
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
									</svg>
									<span class="font-semibold" style="font-family: 'Space Grotesk', sans-serif;">Log out</span>
								</button>
							</div>
						{/if}
					</div>
				{:else}
					<!-- Not signed in - show action buttons -->
					<a href="/support" class="px-4 py-2 border-2 border-black text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 rounded btn-press">
						Contact Us
					</a>
					<a href="/app/submit" class="px-4 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded btn-press shadow-md hover:shadow-lg">
						Submit Work
					</a>
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<button
				on:click={() => showMobileMenu = !showMobileMenu}
				class="md:hidden p-2 text-gray-700 hover:text-primary transition-colors duration-300"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</nav>

	<!-- Mobile Side Menu (Not Logged In) -->
	{#if showMobileMenu && !user}
		<div class="fixed inset-0 z-50 md:hidden">
			<!-- Overlay -->
			<button
				type="button"
				class="absolute inset-0 bg-black/50 transition-opacity duration-300"
				on:click={() => showMobileMenu = false}
				aria-label="Close menu"
				transition:fly={{ duration: 300, opacity: 0.5 }}
			></button>
			
			<!-- Side Menu -->
			<div 
				class="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl flex flex-col"
				transition:fly={{ x: 320, duration: 300 }}
			>
				<div class="p-6 flex-1 flex flex-col">
					<!-- Header -->
					<div class="flex items-center justify-between mb-8">
						<h2 class="text-xl font-bold text-gray-900" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">Menu</h2>
						<button
							on:click={() => showMobileMenu = false}
							class="p-2 hover:bg-gray-100 rounded transition-colors duration-300"
						>
							<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- Navigation Items -->
					<nav class="space-y-0">
						<a href="/" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Home</span>
						</a>
						<a href="/works" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Articles</span>
						</a>
						<a href="/proposals" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Proposals</span>
						</a>
						<a href="/research-papers" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Research Papers</span>
						</a>
						<a href="/programs" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Our Programs</span>
						</a>
						<a href="/opportunities" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Opportunities</span>
						</a>
					</nav>

					<!-- Footer Items - Pushed to Bottom -->
					<div class="mt-auto pt-6 border-t border-gray-300">
						<a href="/support" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Support</span>
						</a>
						<a href="/auth/sign-in" class="flex items-center gap-3 px-4 py-3 text-primary hover:bg-primary/10 transition-all duration-300 font-semibold" on:click={() => showMobileMenu = false}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Sign in</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Mobile Side Menu (Authors) -->
	{#if showMobileMenu && user && user.role !== 'admin'}
		<div class="fixed inset-0 z-50 md:hidden">
			<!-- Overlay -->
			<button
				type="button"
				class="absolute inset-0 bg-black/50 transition-opacity duration-300"
				on:click={() => showMobileMenu = false}
				aria-label="Close menu"
				transition:fly={{ duration: 300, opacity: 0.5 }}
			></button>
			
			<!-- Side Menu -->
			<div 
				class="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl flex flex-col"
				transition:fly={{ x: 320, duration: 300 }}
			>
				<div class="p-6 flex-1 flex flex-col">
					<!-- Header -->
					<div class="flex items-center justify-between mb-8">
						<h2 class="text-xl font-bold text-gray-900" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">Menu Authors</h2>
						<button
							on:click={() => showMobileMenu = false}
							class="p-2 hover:bg-gray-100 rounded transition-colors duration-300"
						>
							<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- User Profile -->
					<div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-300">
						{#if user.avatar_url}
							<img src={user.avatar_url} alt={user.name || 'User'} class="w-16 h-16 rounded-full border-2 border-gray-400" />
						{:else}
							<div class="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
								<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
						{/if}
						<div>
							<p class="font-bold text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{user.name || 'User'}</p>
							{#if userEmail}
								<p class="text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">{userEmail}</p>
							{/if}
						</div>
					</div>

					<!-- Navigation Items -->
					<nav class="space-y-0">
						<a href="/app/home" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">My Dashboard</span>
						</a>
						<a href="/works" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Articles</span>
						</a>
						<a href="/proposals" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Proposals</span>
						</a>
						<a href="/research-papers" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Research Papers</span>
						</a>
						<a href="/programs" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Our Programs</span>
						</a>
						<a href="/opportunities" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Opportunities</span>
						</a>
					</nav>

					<!-- Footer Items -->
					<div class="mt-8 pt-6 border-t border-gray-300">
						<a href="/app/settings" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Settings</span>
						</a>
						<a href="/support" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Support</span>
						</a>
						<button
							on:click={handleSignOut}
							class="w-full flex items-center gap-3 px-4 py-3 text-primary hover:bg-red-50 transition-all duration-300"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							<span class="font-semibold" style="font-family: 'Space Grotesk', sans-serif;">Log out</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Mobile Side Menu (Admin) -->
	{#if showMobileMenu && user && user.role === 'admin'}
		<div class="fixed inset-0 z-50 md:hidden">
			<!-- Overlay -->
			<button
				type="button"
				class="absolute inset-0 bg-black/50 transition-opacity duration-300"
				on:click={() => showMobileMenu = false}
				aria-label="Close menu"
				transition:fly={{ duration: 300, opacity: 0.5 }}
			></button>
			
			<!-- Side Menu -->
			<div 
				class="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl flex flex-col"
				transition:fly={{ x: 320, duration: 300 }}
			>
				<div class="p-6 flex-1 flex flex-col">
					<!-- Header -->
					<div class="flex items-center justify-between mb-8">
						<h2 class="text-xl font-bold text-gray-900" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">Menu - Admin</h2>
						<button
							on:click={() => showMobileMenu = false}
							class="p-2 hover:bg-gray-100 rounded transition-colors duration-300"
						>
							<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- User Profile -->
					<div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-300">
						{#if user.avatar_url}
							<img src={user.avatar_url} alt={user.name || 'User'} class="w-16 h-16 rounded-full border-2 border-gray-400" />
						{:else}
							<div class="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
								<svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
						{/if}
						<div>
							<p class="font-bold text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{user.name || 'User'}</p>
							{#if userEmail}
								<p class="text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">{userEmail}</p>
							{/if}
						</div>
					</div>

					<!-- Navigation Items -->
					<nav class="space-y-0">
						<a href="/admin/dashboard" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Dashboard</span>
						</a>
						<a href="/app/home" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Home</span>
						</a>
						<a href="/admin/submissions" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Submissions</span>
						</a>
						<a href="/opportunities" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Opportunities</span>
						</a>
						<a href="/admin/admins" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Admins</span>
						</a>
					</nav>

					<!-- Footer Items - Pushed to Bottom -->
					<div class="mt-auto pt-6 border-t border-gray-300">
						<a href="/admin/settings" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Settings</span>
						</a>
						<a href="/support" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 border-b border-gray-200">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
							<span style="font-family: 'Space Grotesk', sans-serif;">Support</span>
						</a>
						<button
							on:click={handleSignOut}
							class="w-full flex items-center gap-3 px-4 py-3 text-primary hover:bg-red-50 transition-all duration-300"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							<span class="font-semibold" style="font-family: 'Space Grotesk', sans-serif;">Log out</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>
