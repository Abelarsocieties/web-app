import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createAdminClient } from '$lib/supabase/admin';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.session || !locals.user || (locals.user.role !== 'admin' && locals.user.role !== 'editor')) {
		throw redirect(303, '/admin/login');
	}

	const adminClient = createAdminClient();
	const workId = url.searchParams.get('work_id');

	// Fetch comments
	let query = adminClient
		.from('comments')
		.select(`
			id,
			content,
			created_at,
			updated_at,
			work:works!comments_work_id_fkey (
				id,
				title,
				slug
			),
			author:profiles!comments_author_id_fkey (
				id,
				name,
				email,
				avatar_url
			)
		`)
		.order('created_at', { ascending: false });

	if (workId) {
		query = query.eq('work_id', workId);
	}

	const { data: comments, error } = await query;

	return {
		comments: comments || [],
		workId
	};
};

export const actions: Actions = {
	deleteComment: async ({ request, locals }) => {
		if (!locals.session || !locals.user || (locals.user.role !== 'admin' && locals.user.role !== 'editor')) {
			return fail(403, { message: 'Unauthorized' });
		}

		const formData = await request.formData();
		const commentId = formData.get('commentId') as string;

		if (!commentId) {
			return fail(400, { message: 'Comment ID is required' });
		}

		const adminClient = createAdminClient();
		const { error } = await adminClient
			.from('comments')
			.delete()
			.eq('id', commentId);

		if (error) {
			return fail(500, { message: error.message });
		}

		return { success: true };
	}
};
