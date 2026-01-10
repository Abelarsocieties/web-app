import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/auth/sign-in');
	}

	return {
		session: locals.session,
		user: locals.user
	};
};
