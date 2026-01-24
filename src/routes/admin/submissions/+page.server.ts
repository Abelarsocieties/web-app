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
	// Search by title and tags (author search will be done after fetching due to relation)
	if (search) {
		query = query.or(`title.ilike.%${search}%`);
	}

	// Order by created_at descending
	query = query.order('created_at', { ascending: false });

	// Fetch all matching works first (for author filtering)
	const { data: allWorks, error: allError } = await query;

	if (allError) {
		console.error('Error fetching submissions:', allError);
		return {
			submissions: [],
			totalCount: 0,
			currentPage: page,
			totalPages: 0,
			status,
			search
		};
	}

	// Filter by author name/email and tags if search is provided
	let filteredWorks = allWorks || [];
	if (search && allWorks) {
		const searchLower = search.toLowerCase();
		filteredWorks = allWorks.filter((work: any) => {
			const author = work.author || {};
			const authorName = (author.name || '').toLowerCase();
			const authorEmail = (author.email || '').toLowerCase();
			const title = (work.title || '').toLowerCase();
			const tags = (work.tags || []).join(' ').toLowerCase();
			
			return title.includes(searchLower) || 
			       tags.includes(searchLower) ||
			       authorName.includes(searchLower) || 
			       authorEmail.includes(searchLower);
		});
	}

	// Calculate total count after filtering
	const totalCount = filteredWorks.length;
	const totalPages = Math.ceil(totalCount / pageSize);

	// Apply pagination to filtered results
	const paginatedWorks = filteredWorks.slice(offset, offset + pageSize);

	// Process submissions for table
	const submissions = paginatedWorks.map((work: any) => {
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

	return {
		submissions,
		totalCount,
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
			// Update work status to rejected and store rejection reason
			const updateData: any = {
				status: 'rejected'
			};
			
			// Store rejection reason in content_json metadata if available
			// Or create a notes field - for now we'll add it to content_json
			if (reason) {
				const { data: currentWork } = await adminClient
					.from('works')
					.select('content_json')
					.eq('id', workId)
					.single();
				
				if (currentWork?.content_json) {
					updateData.content_json = {
						...currentWork.content_json,
						rejection_reason: reason,
						rejected_at: new Date().toISOString()
					};
				} else {
					updateData.content_json = {
						rejection_reason: reason,
						rejected_at: new Date().toISOString()
					};
				}
			}

			const { error } = await adminClient
				.from('works')
				.update(updateData)
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
