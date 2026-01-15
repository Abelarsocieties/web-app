<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let user: {
		id: string;
		name: string | null;
		avatar_url: string | null;
		role: 'user' | 'editor' | 'admin';
		email?: string | null;
	} | null = null;

	let showDropdown = false;
	let showMobileMenu = false;
	let userEmail = '';
	let userButtonRef: HTMLElement;
	let userDropdownRef: HTMLElement;

	function handleClickOutside(event: MouseEvent) {
		if (userDropdownRef && userButtonRef && !userDropdownRef.contains(event.target as Node) && !userButtonRef.contains(event.target as Node)) {
			showDropdown = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		
		// Get user email if available
		if (user?.email) {
			userEmail = user.email;
		} else {
			const supabase = createClient();
			supabase.auth.getSession().then(({ data: { session } }) => {
				if (session?.user?.email) {
					userEmail = session.user.email;
				}
			});
		}
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	async function handleSignOut() {
		const supabase = createClient();
		await supabase.auth.signOut();
		goto('/');
	}
</script>

<header class="bg-gray-800 text-white border-b border-gray-700">
	<nav class="container mx-auto px-4 py-3">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/app/home" class="flex items-center transition-transform hover:scale-105">
				<img src="/main-icon.png" alt="Abelar" class="h-10 transition-smooth" />
			</a>
			
			<!-- Desktop Actions -->
			<div class="hidden md:flex items-center gap-4">
				<a href="/app/submit" class="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded btn-press shadow-md hover:shadow-lg">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					Submit Work
				</a>
				
				<!-- User Avatar -->
				<div class="flex items-center gap-3">
					{#if user?.avatar_url}
						<img src={user.avatar_url} alt={user.name || 'User'} class="w-10 h-10 rounded-full border-2 border-gray-600" />
					{:else}
						<div class="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-500 flex items-center justify-center">
							<svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
					{/if}
					<span class="text-sm font-semibold" style="font-family: 'Space Grotesk', sans-serif;">{user?.name || 'User'}</span>
				</div>
				
				<!-- Hamburger Menu -->
				<div class="relative">
					<button
						bind:this={userButtonRef}
						on:click|stopPropagation={() => showDropdown = !showDropdown}
						class="p-2 hover:bg-gray-700 rounded transition-colors duration-300"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
					{#if showDropdown}
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
			</div>

			<!-- Mobile Menu Button -->
			<button
				on:click={() => showMobileMenu = !showMobileMenu}
				class="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</nav>
</header>
