import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/auth/sign-in');
	}

	if (!locals.user || (locals.user.role !== 'admin' && locals.user.role !== 'editor')) {
		throw redirect(303, '/app/home');
	}

	return {
		session: locals.session,
		user: locals.user
	};
};
