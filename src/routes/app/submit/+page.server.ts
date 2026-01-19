import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/auth/sign-in');
	}

	return {
		user: locals.user
	};
};
