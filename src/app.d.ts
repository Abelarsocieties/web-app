// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session, User } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			session: Session | null;
			user: {
				id: string;
				name: string | null;
				avatar_url: string | null;
				role: 'user' | 'editor' | 'admin';
			} | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
