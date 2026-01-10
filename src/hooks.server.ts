import { createClient } from '$lib/supabase/server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Create Supabase client for this request
	const supabase = createClient(event);
	
	// Get session
	const {
		data: { session },
		error: sessionError
	} = await supabase.auth.getSession();

	// Get user profile if authenticated
	let userProfile = null;
	if (session?.user) {
		try {
			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', session.user.id)
				.single();
			
			// If profile doesn't exist yet, that's okay - it will be created on first signup
			if (!profileError && profile) {
				userProfile = profile;
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
