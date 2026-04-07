import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (
		!locals.session ||
		!locals.user ||
		(locals.user.role !== 'admin' && locals.user.role !== 'editor')
	) {
		throw redirect(303, '/admin/login');
	}

	const workId = url.searchParams.get('work_id');

	return {
		comments: [] as unknown[],
		workId
	};
};

export const actions: Actions = {
	deleteComment: async () => {
		return { success: false };
	}
};
