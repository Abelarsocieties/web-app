<script lang="ts">
	import { goto } from '$app/navigation';
	import { createClient } from '$lib/supabase/client';

	export let user: {
		id: string;
		name: string | null;
		avatar_url: string | null;
		role: 'user' | 'editor' | 'admin';
	} | null = null;

	let showDropdown = false;

	async function handleSignOut() {
		const supabase = createClient();
		await supabase.auth.signOut();
		goto('/');
	}
</script>

<header class="bg-gray-900 text-white border-b border-gray-800">
	<nav class="container mx-auto px-4 py-4">
		<div class="flex items-center justify-between">
			<a href="/app/home" class="text-2xl font-bold">Abelar</a>
			<div class="flex items-center gap-4">
				<a href="/app/submit" class="bg-primary hover:bg-primary-dark px-4 py-2 rounded">
					Submit
				</a>
				<!-- User pill -->
				<div class="relative">
					<button
						on:click={() => showDropdown = !showDropdown}
						class="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						{#if user?.avatar_url}
							<img src={user.avatar_url} alt={user.name || 'User'} class="w-8 h-8 rounded-full" />
						{:else}
							<div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
						{/if}
						<span>{user?.name || 'User'}</span>
					</button>
					{#if showDropdown}
						<div class="absolute right-0 mt-2 w-48 bg-white border border-black shadow-lg z-50">
							<a href="/app/profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
							{#if user?.role === 'admin' || user?.role === 'editor'}
								<a href="/admin/dashboard" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Admin</a>
							{/if}
							<button
								on:click={handleSignOut}
								class="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
							>
								Sign Out
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</nav>
</header>

