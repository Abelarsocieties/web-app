import { createServerClient } from '@supabase/ssr';
import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error(
		'Missing Supabase environment variables. Please add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to your .env file. See .env.example for reference.'
	);
}

export function createClient(event: RequestEvent) {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				const cookies = event.cookies.getAll();
				// Debug: Log cookies being read - ALWAYS log for /app routes
				if (event.url.pathname.startsWith('/app') || event.url.pathname.startsWith('/auth')) {
					const authCookies = cookies.filter(c => c.name.includes('auth') || c.name.includes('supabase'));
					if (authCookies.length > 0) {
						console.log('[Server] Supabase getAll() - reading cookies:', authCookies.map(c => c.name).join(', '));
						authCookies.forEach(c => {
							console.log('[Server] Cookie name:', c.name);
							console.log('[Server] Cookie value type:', typeof c.value, 'Length:', c.value.length);
							console.log('[Server] Cookie value (first 200 chars):', c.value.substring(0, 200));
							
							// Check if it's a JSON string
							if (c.value.startsWith('{')) {
								console.log('[Server] ✓ Cookie appears to be JSON');
								// Try to parse it
								try {
									const parsed = JSON.parse(c.value);
									console.log('[Server] ✓ Parsed cookie JSON keys:', Object.keys(parsed).join(', '));
									if (parsed.access_token) {
										console.log('[Server] ✓ Access token present, length:', parsed.access_token.length);
										console.log('[Server] ✓ Access token (first 50 chars):', parsed.access_token.substring(0, 50));
									}
									if (parsed.refresh_token) {
										console.log('[Server] ✓ Refresh token present');
									}
									if (parsed.expires_at) {
										console.log('[Server] ✓ Expires at:', parsed.expires_at);
									}
								} catch (e) {
									console.error('[Server] ✗ Could not parse cookie as JSON:', e.message);
								}
							} else {
								console.log('[Server] ✗ Cookie does NOT start with {, starts with:', c.value.substring(0, 10));
							}
							
							// Check if it's URL encoded (starts with %7B which is {)
							if (c.value.startsWith('%7B') || c.value.includes('%22')) {
								console.log('[Server] ⚠ Cookie appears to be URL encoded');
								try {
									const decoded = decodeURIComponent(c.value);
									console.log('[Server] Decoded cookie first 100 chars:', decoded.substring(0, 100));
									if (decoded.startsWith('{')) {
										const parsed = JSON.parse(decoded);
										console.log('[Server] Decoded and parsed JSON keys:', Object.keys(parsed).join(', '));
									}
								} catch (e) {
									console.error('[Server] Could not decode cookie:', e.message);
								}
							}
						});
					} else {
						console.log('[Server] ⚠ No auth cookies found in getAll()');
					}
				}
				// Return cookies as-is - Supabase's @supabase/ssr will parse them
				return cookies;
			},
			setAll(cookiesToSet) {
				console.log('[Server] setAll() called with', cookiesToSet.length, 'cookies');
				cookiesToSet.forEach(({ name, value, options }) => {
					// Ensure proper cookie options for server-side
					const cookieOptions = {
						...options,
						path: options?.path || '/',
						sameSite: options?.sameSite || 'lax',
						httpOnly: options?.httpOnly || false,
						secure: options?.secure || false
					};
					
					// Log cookie being set
					if (name.includes('auth') || name.includes('supabase')) {
						console.log('[Server] Setting cookie:', name.substring(0, 40));
						console.log('[Server] Cookie value type:', typeof value, 'Length:', value?.length);
						console.log('[Server] Cookie value (first 100 chars):', value?.substring(0, 100));
						console.log('[Server] Cookie options:', JSON.stringify(cookieOptions));
					}
					
					event.cookies.set(name, value, cookieOptions);
					
					// Verify cookie was set
					const setCookie = event.cookies.get(name);
					if (name.includes('auth') || name.includes('supabase')) {
						if (setCookie) {
							console.log('[Server] ✓ Cookie verified as set:', name.substring(0, 40));
						} else {
							console.error('[Server] ✗ Cookie NOT set:', name.substring(0, 40));
						}
					}
				});
			}
		}
	});
}

