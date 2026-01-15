import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.session) {
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
