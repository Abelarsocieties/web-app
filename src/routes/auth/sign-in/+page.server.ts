import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createClient } from '$lib/supabase/server';

export const load: PageServerLoad = async ({ locals, url }) => {
	// If already authenticated, redirect to dashboard
	if (locals.session) {
		throw redirect(303, '/app/home');
	}
	
	return {};
};

export const actions: Actions = {
	signIn: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, {
				message: 'Please enter both email and password'
			});
		}

		// Create Supabase client with server-side cookie handling
		// We need to create a RequestEvent-like object for the server client
		const event = {
			cookies,
			url: new URL(request.url)
		} as any;
		let supabase = createClient(event);

		console.log('[Server Action] Attempting sign-in for:', email.trim());

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email.trim(),
			password
		});

		if (error) {
			console.error('[Server Action] Sign-in error:', error.message);
			// Provide user-friendly error messages
			let errorMessage = error.message || 'An error occurred during sign in. Please try again.';
			if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
				errorMessage = 'Invalid email or password. Please check your credentials and try again.';
			} else if (error.message.includes('Email not confirmed') || error.message.includes('email_not_confirmed')) {
				errorMessage = 'Please confirm your email before signing in. Check your inbox for a confirmation link.';
			} else if (error.message.includes('User not found')) {
				errorMessage = 'No account found with this email. Please sign up first.';
			}

			return fail(400, {
				message: errorMessage
			});
		}

		if (data.session) {
			console.log('[Server Action] Sign-in successful, session created for:', data.session.user.email);
			console.log('[Server Action] Session ID:', data.session.user.id);
			console.log('[Server Action] Access token (first 50 chars):', data.session.access_token.substring(0, 50));
			console.log('[Server Action] Refresh token present:', !!data.session.refresh_token);
			console.log('[Server Action] Expires at:', new Date(data.session.expires_at * 1000).toISOString());
			
			// Manually set the auth cookie in the format Supabase expects
			// The cookie name format is: sb-{project-ref}-auth-token
			const cookieName = `sb-fgjogfzekladfkslliex-auth-token`;
			const cookieValue = JSON.stringify({
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token,
				expires_at: data.session.expires_at,
				token_type: data.session.token_type,
				user: data.session.user
			});
			
			// Set cookie with proper options
			cookies.set(cookieName, cookieValue, {
				path: '/',
				sameSite: 'lax',
				httpOnly: false,
				secure: false,
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
			
			console.log('[Server Action] ✓ Manually set auth cookie:', cookieName);
			
			// Verify cookie was set
			const setCookie = cookies.get(cookieName);
			if (setCookie) {
				console.log('[Server Action] ✓ Cookie verified as set');
			} else {
				console.error('[Server Action] ✗ Cookie NOT set!');
			}
			
			// Set cookie FIRST (this is what matters for subsequent requests)
			// Check what cookies exist
			const allCookies = cookies.getAll();
			console.log('[Server Action] All cookies after manual set:', allCookies.map(c => c.name).join(', '));
			
			const authCookies = allCookies.filter(c => c.name.includes('auth') || c.name.includes('supabase'));
			console.log('[Server Action] Auth cookies count:', authCookies.length);
			
			// Create a NEW Supabase client AFTER setting the cookie
			// This ensures the client reads the cookie we just set
			const eventWithCookie = {
				cookies,
				url: new URL(request.url)
			} as any;
			const authenticatedSupabase = createClient(eventWithCookie);
			
			// Also call setSession to ensure Supabase's internal state is updated
			const { error: setSessionError } = await authenticatedSupabase.auth.setSession({
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token
			});
			
			if (setSessionError) {
				console.error('[Server Action] setSession error:', setSessionError.message);
			} else {
				console.log('[Server Action] ✓ setSession called successfully');
			}
			
			// Check if user is admin or editor and redirect accordingly
			console.log('[Server Action] Checking user role for:', data.session.user.email);
			console.log('[Server Action] User ID:', data.session.user.id);
			
			// Verify session is set before querying
			const { data: { session: verifySession } } = await authenticatedSupabase.auth.getSession();
			console.log('[Server Action] Session verification:', verifySession ? `Session exists (${verifySession.user.email})` : 'No session');
			
			// Query profile using the authenticated client
			const { data: profile, error: profileError } = await authenticatedSupabase
				.from('profiles')
				.select('role')
				.eq('id', data.session.user.id)
				.single();
			
			console.log('[Server Action] Profile query result:');
			console.log('[Server Action] - Profile data:', JSON.stringify(profile));
			console.log('[Server Action] - Profile error:', profileError ? JSON.stringify(profileError) : 'none');
			
			if (profileError) {
				console.error('[Server Action] Profile fetch error:', profileError.message);
				console.error('[Server Action] Profile error code:', profileError.code);
				console.error('[Server Action] Profile error details:', profileError);
			}
			
			// Handle missing profile case
			if (profileError && profileError.code === 'PGRST116') {
				console.error('[Server Action] ⚠ Profile does not exist for user:', data.session.user.email);
				console.error('[Server Action] User ID:', data.session.user.id);
				console.error('[Server Action] This user needs a profile created in the profiles table.');
				console.error('[Server Action] Please create a profile with role="admin" for this user in Supabase.');
				
				// Profile doesn't exist - redirect to app/home (they can't be admin without a profile)
				console.log('[Server Action] No profile found, redirecting to app/home');
				throw redirect(303, '/app/home');
			}
			
			if (profile) {
				console.log('[Server Action] Profile role value:', profile.role);
				console.log('[Server Action] Role type:', typeof profile.role);
				console.log('[Server Action] Is admin?', profile.role === 'admin');
				console.log('[Server Action] Is editor?', profile.role === 'editor');
				
				if (profile.role === 'admin' || profile.role === 'editor') {
					console.log('[Server Action] ✓ User is admin/editor, redirecting to admin dashboard');
					throw redirect(303, '/admin/dashboard');
				}
			}
			
			// Regular user - redirect to app home
			console.log('[Server Action] User is not admin/editor, redirecting to app/home');
			throw redirect(303, '/app/home');
		}

		return fail(400, {
			message: 'Sign in failed. No session was created. Please try again.'
		});
	}
};
