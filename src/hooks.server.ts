import { createClient } from '$lib/supabase/server';
import { createAdminClient } from '$lib/supabase/admin';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Create Supabase client for this request
	const supabase = createClient(event);
	
	// Debug: Log all cookies received
	if (event.url.pathname.startsWith('/app')) {
		const allCookies = event.cookies.getAll();
		const authCookies = allCookies.filter(c => c.name.includes('auth') || c.name.includes('supabase'));
		console.log('[Server] All cookies received:', allCookies.length);
		console.log('[Server] Cookie names:', allCookies.map(c => c.name).join(', '));
		if (authCookies.length > 0) {
			console.log('[Server] Auth cookies received:', authCookies.map(c => c.name).join(', '));
			console.log('[Server] Auth cookie values (first 50 chars):', authCookies.map(c => c.value.substring(0, 50)).join(', '));
		} else {
			console.log('[Server] No auth cookies found for path:', event.url.pathname);
		}
	}
	
	// Get session - try getSession first
	let session = null;
	let sessionError = null;
	
	try {
		const result = await supabase.auth.getSession();
		session = result.data.session;
		sessionError = result.error;
	} catch (err) {
		sessionError = err as any;
		console.error('[Server] getSession() threw error:', err);
	}
	
	// Debug session status and manual cookie parsing for /app and /admin routes
	if (event.url.pathname.startsWith('/app') || event.url.pathname.startsWith('/admin')) {
		console.log('[Server] Session check for', event.url.pathname, ':', session ? `Found (user: ${session.user.email})` : 'Not found');
		if (sessionError) {
			console.error('[Server] Session error:', sessionError);
			console.error('[Server] Session error message:', sessionError?.message);
			console.error('[Server] Session error code:', sessionError?.status);
		}
		
		// If no session, try to manually parse the cookie and set it in Supabase's expected format
		if (!session && !sessionError) {
			console.log('[Server] No session and no error - checking cookie manually...');
			const authCookies = event.cookies.getAll().filter(c => c.name.includes('auth-token'));
			if (authCookies.length > 0) {
				const cookie = authCookies[0];
				console.log('[Server] Found auth cookie:', cookie.name);
				console.log('[Server] Cookie value starts with:', cookie.value.substring(0, 50));
				
				// Try to parse the cookie manually
				if (cookie.value.startsWith('{')) {
					try {
						const parsed = JSON.parse(cookie.value);
						console.log('[Server] Manually parsed cookie, keys:', Object.keys(parsed).join(', '));
						if (parsed.access_token && parsed.user) {
							console.log('[Server] Access token found in cookie, trying getUser() with token...');
							
							// Try to validate the token by calling getUser
							const { data: { user }, error: userError } = await supabase.auth.getUser(parsed.access_token);
							
							if (user && !userError) {
								console.log('[Server] getUser() with token succeeded, user:', user.email);
								// Create a session object manually from the cookie data
								// This matches Supabase's Session type structure
								session = {
									access_token: parsed.access_token,
									refresh_token: parsed.refresh_token || '',
									expires_at: parsed.expires_at || Math.floor(Date.now() / 1000) + 3600,
									expires_in: parsed.expires_at ? parsed.expires_at - Math.floor(Date.now() / 1000) : 3600,
									token_type: parsed.token_type || 'bearer',
									user: parsed.user || user
								} as any;
								console.log('[Server] ✓ Manually created session from cookie');
							} else if (userError) {
								console.error('[Server] getUser() with token error:', userError.message);
								console.error('[Server] Token might be invalid or expired');
							}
						}
					} catch (e) {
						console.error('[Server] Could not parse cookie as JSON:', e);
					}
				}
			}
		}
	}

	// Get user profile if authenticated
	let userProfile = null;
	if (session?.user) {
		try {
			// Use admin client to bypass RLS for profile queries
			// This ensures profile is always readable even with strict RLS
			const adminClient = createAdminClient();
			const { data: profile, error: profileError } = await adminClient
				.from('profiles')
				.select('*')
				.eq('id', session.user.id)
				.single();
			
			// If profile doesn't exist yet, that's okay - it will be created on first signup
			if (!profileError && profile) {
				userProfile = {
					...profile,
					email: session.user.email || null // Include email from auth
				};
			} else if (session.user.email) {
				// If no profile yet, create basic user object with email
				userProfile = {
					id: session.user.id,
					name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || null,
					avatar_url: null,
					role: 'user' as const,
					email: session.user.email
				};
			}
		} catch (error) {
			// Silently handle profile fetch errors (table might not exist yet)
			console.error('Error fetching profile:', error);
		}
	}

	// Attach session and profile to event.locals
	event.locals.supabase = supabase;
	event.locals.session = session;
	event.locals.user = userProfile;

	return resolve(event);
};
