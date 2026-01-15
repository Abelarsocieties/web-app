<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { createClient } from '$lib/supabase/client';

	onMount(async () => {
		if (browser) {
			const supabase = createClient();
			const { data: { session } } = await supabase.auth.getSession();
			
			if (session) {
				// Check if user is admin
				const { data: profile } = await supabase
					.from('profiles')
					.select('role')
					.eq('id', session.user.id)
					.single();
				
				if (profile?.role === 'admin') {
					goto('/admin/dashboard');
					return;
				}
			}
			// Not logged in or not admin, redirect to login
			goto('/admin/login');
		}
	});
</script>

<div class="min-h-screen flex items-center justify-center bg-white" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
	<div class="text-center animate-fade-in">
		<div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
		<p class="mt-4 text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">Loading...</p>
	</div>
</div>
