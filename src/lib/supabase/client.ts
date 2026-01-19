import { createBrowserClient } from '@supabase/ssr';
import { browser } from '$app/environment';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
	throw new Error(
		'Missing Supabase environment variables. Please add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to your .env file. See .env.example for reference.'
	);
}

export function createClient() {
	return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				if (!browser) return [];
				return document.cookie.split('; ').map(cookie => {
					const [name, ...rest] = cookie.split('=');
					return { name, value: decodeURIComponent(rest.join('=')) };
				});
			},
			setAll(cookiesToSet) {
				if (!browser) return;
				console.log('[Client] setAll called with', cookiesToSet.length, 'cookies');
				cookiesToSet.forEach(({ name, value, options }) => {
					// Use the options provided by Supabase, but ensure proper defaults
					const sameSite = (options?.sameSite || 'lax').toLowerCase();
					const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
					
					// Ensure path is always '/' for auth cookies so they're accessible everywhere
					const cookiePath = options?.path || '/';
					
					// Use maxAge if provided, otherwise use expires if provided
					let expires = '';
					if (options?.maxAge) {
						const maxAgeSeconds = options.maxAge;
						const expiresDate = new Date(Date.now() + maxAgeSeconds * 1000);
						expires = `expires=${expiresDate.toUTCString()}`;
					} else if (options?.expires) {
						expires = `expires=${options.expires.toUTCString()}`;
					}
					
					// Build cookie string - ensure proper formatting
					const cookieParts = [
						`${name}=${encodeURIComponent(value)}`,
						`path=${cookiePath}`,
						expires,
						// Don't set domain for localhost - it breaks cookies
						options?.domain && !isLocalhost ? `domain=${options.domain}` : '',
						`SameSite=${sameSite.charAt(0).toUpperCase() + sameSite.slice(1)}`,
						// Only set secure for HTTPS or if explicitly required
						(options?.secure && !isLocalhost) ? 'Secure' : ''
					].filter(Boolean);
					
					const cookieString = cookieParts.join('; ');
					document.cookie = cookieString;
					
					// Verify cookie was set by reading it back immediately
					const cookieWasSet = document.cookie.split('; ').some(c => {
						const [cookieName] = c.split('=');
						return cookieName.trim() === name;
					});
					
					if (name.includes('auth') || name.includes('supabase')) {
						console.log('[Client] Cookie set:', name.substring(0, 40), 'Path:', cookiePath, 'SameSite:', sameSite, 'MaxAge:', options?.maxAge, 'Verified:', cookieWasSet);
						if (!cookieWasSet) {
							console.error('[Client] Cookie NOT set properly:', name, 'Value length:', value?.length);
							console.error('[Client] Cookie string:', cookieString.substring(0, 150));
							console.error('[Client] All cookies after setting:', document.cookie.substring(0, 200));
						}
					}
				});
			}
		}
	});
}

