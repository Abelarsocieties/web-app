import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (
		locals.session &&
		locals.user &&
		(locals.user.role === 'admin' || locals.user.role === 'editor')
	) {
		throw redirect(303, '/admin/dashboard');
	}
	throw redirect(303, '/admin/login');
};
