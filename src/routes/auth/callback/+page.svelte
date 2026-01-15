<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { createClient } from '$lib/supabase/client';

	onMount(async () => {
		if (browser) {
			const supabase = createClient();
			
			// Get code from URL parameters
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get('code');
			const type = urlParams.get('type');
			
			if (code) {
				// Exchange code for session
				const { data, error } = await supabase.auth.exchangeCodeForSession(code);
				
				if (error) {
					console.error('Code exchange error:', error);
					goto('/auth/sign-in?error=auth_failed');
					return;
				}
				
				if (data.session) {
					// Successfully authenticated, clean URL and redirect
					window.history.replaceState({}, '', window.location.pathname);
					
					// Redirect based on type - default to user dashboard
					if (type === 'recovery') {
						goto('/auth/reset');
					} else {
						goto('/app/home');
					}
				} else {
					goto('/auth/sign-in');
				}
			} else {
				// No code, check for existing session
				const { data: { session }, error } = await supabase.auth.getSession();
				
				if (error) {
					console.error('Auth callback error:', error);
					goto('/auth/sign-in?error=auth_failed');
					return;
				}
				
				if (session) {
					goto('/app/home');
				} else {
					goto('/auth/sign-in');
				}
			}
		}
	});
</script>

<svelte:head>
	<title>Authenticating... | Abelar</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-white" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
	<div class="text-center animate-fade-in">
		<div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
		<p class="mt-4 text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">Completing authentication...</p>
	</div>
</div>
