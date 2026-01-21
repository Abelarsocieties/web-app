import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { createAdminClient } from '$lib/supabase/admin';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/admin/login');
	}

	if (locals.user.role !== 'admin' && locals.user.role !== 'editor') {
		throw redirect(303, '/app/home');
	}

	const adminClient = createAdminClient();
	const status = url.searchParams.get('status') || 'all';
	const search = url.searchParams.get('search') || '';
	const page = parseInt(url.searchParams.get('page') || '1');
	const pageSize = 10;
	const offset = (page - 1) * pageSize;

	// Build query based on status
	let query = adminClient
		.from('works')
		.select(`
			id,
			title,
			category,
			tags,
			status,
			content_json,
			created_at,
			updated_at,
			author:profiles!works_author_id_fkey (
				id,
				name,
				email,
				avatar_url
			)
		`, { count: 'exact' });

	// Filter by status
	if (status === 'pending') {
		query = query.eq('status', 'submitted');
	} else if (status === 'approved') {
		query = query.eq('status', 'published');
	}
	// 'all' shows all statuses

	// Apply search filter if provided
	// Note: Supabase doesn't support searching across relations easily, so we'll filter after fetching
	// For now, search by title and tags
	if (search) {
		query = query.or(`title.ilike.%${search}%,tags.cs.{${search}}`);
	}

	// Order by created_at descending
	query = query.order('created_at', { ascending: false });

	// Apply pagination
	query = query.range(offset, offset + pageSize - 1);

	const { data: works, error, count } = await query;

	if (error) {
		console.error('Error fetching submissions:', error);
		return {
			submissions: [],
			totalCount: 0,
			currentPage: page,
			totalPages: 0,
			status,
			search
		};
	}

	// Filter by author name/email if search is provided (client-side filtering for relation fields)
	let filteredWorks = works || [];
	if (search && works) {
		filteredWorks = works.filter((work: any) => {
			const author = work.author || {};
			const authorName = (author.name || '').toLowerCase();
			const authorEmail = (author.email || '').toLowerCase();
			const searchLower = search.toLowerCase();
			return authorName.includes(searchLower) || authorEmail.includes(searchLower);
		});
	}

	// Process submissions for table
	const submissions = filteredWorks.map((work: any) => {
		const author = work.author || {};
		const nameParts = (author.name || author.email || 'Unknown').split(' ');
		const initials = nameParts.length >= 2 
			? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
			: (author.name || author.email || 'U')[0].toUpperCase();
		
		// Determine type based on content_json
		const hasFile = work.content_json?.file_url;
		const type = hasFile ? 'File Upload' : 'Writing';
		
		// Calculate size (placeholder for now)
		const size = hasFile ? '400 KB' : '200 KB';
		
		return {
			id: work.id,
			title: work.title,
			size,
			type,
			category: work.category || 'Article',
			topic: work.tags?.[0] || 'General',
			dateSubmitted: new Date(work.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
			lastUpdated: new Date(work.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
			status: work.status,
			author: {
				id: author.id,
				name: author.name || author.email || 'Unknown',
				email: author.email || '',
				avatar: author.avatar_url,
				initials
			},
			content: work.content_json
		};
	});

	const totalPages = Math.ceil((count || 0) / pageSize);

	return {
		submissions,
		totalCount: count || 0,
		currentPage: page,
		totalPages,
		status,
		search
	};
};

export const actions: Actions = {
	approve: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		if (locals.user.role !== 'admin' && locals.user.role !== 'editor') {
			return fail(403, { error: 'Forbidden' });
		}

		const adminClient = createAdminClient();
		const formData = await request.formData();
		const workId = formData.get('workId') as string;

		if (!workId) {
			return fail(400, { error: 'Work ID is required' });
		}

		try {
			// Update work status to published
			const { error } = await adminClient
				.from('works')
				.update({
					status: 'published',
					published_at: new Date().toISOString()
				})
				.eq('id', workId);

			if (error) {
				console.error('Error approving work:', error);
				return fail(500, { error: error.message || 'Failed to approve work' });
			}

			return { success: true };
		} catch (error: any) {
			console.error('Approve work error:', error);
			return fail(500, { error: error.message || 'Failed to approve work' });
		}
	},

	reject: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		if (locals.user.role !== 'admin' && locals.user.role !== 'editor') {
			return fail(403, { error: 'Forbidden' });
		}

		const adminClient = createAdminClient();
		const formData = await request.formData();
		const workId = formData.get('workId') as string;
		const reason = formData.get('reason') as string;

		if (!workId) {
			return fail(400, { error: 'Work ID is required' });
		}

		try {
			// Update work status to rejected
			const { error } = await adminClient
				.from('works')
				.update({
					status: 'rejected'
				})
				.eq('id', workId);

			if (error) {
				console.error('Error rejecting work:', error);
				return fail(500, { error: error.message || 'Failed to reject work' });
			}

			return { success: true };
		} catch (error: any) {
			console.error('Reject work error:', error);
			return fail(500, { error: error.message || 'Failed to reject work' });
		}
	}
};
