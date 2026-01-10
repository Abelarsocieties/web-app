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
					return { name, value: rest.join('=') };
				});
			},
			setAll(cookiesToSet) {
				if (!browser) return;
				cookiesToSet.forEach(({ name, value, options }) => {
					document.cookie = `${name}=${value}; path=${options?.path || '/'}; ${options?.maxAge ? `max-age=${options.maxAge};` : ''} ${options?.domain ? `domain=${options.domain};` : ''} ${options?.sameSite ? `samesite=${options.sameSite};` : ''} ${options?.secure ? 'secure;' : ''}`;
				});
			}
		}
	});
}

