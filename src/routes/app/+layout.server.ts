import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	// Debug: Log session status
	console.log('[App Layout] Checking session for', locals.session ? `Found (${locals.session.user.email})` : 'Not found');
	console.log('[App Layout] Cookies received:', cookies.getAll().map(c => c.name).join(', '));
	
	if (!locals.session) {
		console.log('[App Layout] No session, redirecting to sign-in');
		throw redirect(303, '/auth/sign-in');
	}

	// Ensure user object includes email
	const user = locals.user ? {
		...locals.user,
		email: locals.user.email || locals.session.user.email || null
	} : null;

	return {
		session: locals.session,
		user
	};
};
