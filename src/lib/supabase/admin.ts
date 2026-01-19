// Admin Supabase client using service role key (bypasses RLS)
// Use this ONLY for server-side admin operations
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

if (!PUBLIC_SUPABASE_URL) {
	throw new Error('Missing PUBLIC_SUPABASE_URL environment variable');
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
	throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Add it to your .env file.');
}

/**
 * Creates a Supabase admin client that bypasses RLS
 * Use this ONLY for server-side admin operations
 * NEVER expose this to the client!
 */
export function createAdminClient() {
	return createSupabaseClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});
}
