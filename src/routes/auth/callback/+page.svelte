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
				try {
					// Exchange code for session
					const { data, error } = await supabase.auth.exchangeCodeForSession(code);
					
					if (error) {
						console.error('Code exchange error:', error);
						// Clean URL even on error
						window.history.replaceState({}, '', window.location.pathname);
						
						// Check if it's a PKCE error
						if (error.message.includes('PKCE') || error.message.includes('code verifier')) {
							// PKCE error - redirect to sign-in with helpful message
							goto('/auth/sign-in?error=pkce_error');
						} else {
							goto('/auth/sign-in?error=auth_failed');
						}
						return;
					}
					
					if (data.session) {
						// Wait a moment for cookies to be set
						await new Promise(resolve => setTimeout(resolve, 100));
						
						// Successfully authenticated, clean URL and redirect
						window.history.replaceState({}, '', window.location.pathname);
						
						// Redirect based on type - default to user dashboard
						if (type === 'recovery') {
							window.location.href = '/auth/reset';
						} else {
							window.location.href = '/app/home';
						}
					} else {
						window.history.replaceState({}, '', window.location.pathname);
						goto('/auth/sign-in');
					}
				} catch (err) {
					console.error('Unexpected error during code exchange:', err);
					window.history.replaceState({}, '', window.location.pathname);
					goto('/auth/sign-in?error=auth_failed');
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
