import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { abelarFetchCookies } from '$lib/api/server-request';
import { normalizeArticlesList, articleTitle, articleSlug } from '$lib/api/articles';

export const load: PageServerLoad = async ({ locals, url, cookies }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/admin/login');
	}

	if (locals.user.role !== 'admin' && locals.user.role !== 'editor') {
		throw redirect(303, '/app/home');
	}

	const status = url.searchParams.get('status') || 'all';
	const search = (url.searchParams.get('search') || '').toLowerCase();
	const page = parseInt(url.searchParams.get('page') || '1');
	const pageSize = 10;
	const offset = (page - 1) * pageSize;

	const res = await abelarFetchCookies(cookies, '/articles', { method: 'GET' });
	let raw: Record<string, unknown>[] = [];
	if (res.ok) {
		const json = await res.json().catch(() => null);
		raw = normalizeArticlesList(json);
	}

	let filtered = raw;
	if (search) {
		filtered = raw.filter((w) => {
			const title = articleTitle(w).toLowerCase();
			const slug = articleSlug(w).toLowerCase();
			return title.includes(search) || slug.includes(search);
		});
	}

	const totalCount = filtered.length;
	const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
	const paginatedWorks = filtered.slice(offset, offset + pageSize);

	const submissions = paginatedWorks.map((work: Record<string, unknown>, index: number) => {
		const created =
			(work.created_at as string) || (work.updated_at as string) || new Date().toISOString();
		return {
			id: String(work.id ?? articleSlug(work) ?? index),
			title: articleTitle(work),
			size: '—',
			type: 'Writing',
			category: String(work.category ?? 'Article'),
			topic: String(work.tag ?? work.tags ?? 'General'),
			dateSubmitted: new Date(created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			lastUpdated: new Date(created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			status: String(work.status ?? 'submitted'),
			author: {
				id: '—',
				name: '—',
				email: '',
				avatar: null as string | null,
				initials: '?'
			},
			content: work
		};
	});

	return {
		submissions,
		totalCount,
		currentPage: page,
		totalPages,
		status,
		search: url.searchParams.get('search') || ''
	};
};

export const actions: Actions = {
	approve: async () => {
		return fail(501, {
			error: 'Publishing is not exposed as a separate endpoint in the published API. Use your PHP admin tools or extend the API.'
		});
	},

	reject: async () => {
		return fail(501, {
			error: 'Reject workflow is not in the published OpenAPI spec. Extend the backend or use admin tools.'
		});
	}
};
