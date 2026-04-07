import type { PageServerLoad } from './$types';
import { abelarFetchCookies } from '$lib/api/server-request';
import { normalizeArticlesList, articleTitle } from '$lib/api/articles';

export const load: PageServerLoad = async ({ cookies }) => {
	const res = await abelarFetchCookies(cookies, '/articles', { method: 'GET' });
	let articles: Record<string, unknown>[] = [];
	if (res.ok) {
		const json = await res.json().catch(() => null);
		articles = normalizeArticlesList(json);
	}

	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const publicationsChartData = { labels: monthNames, data: Array(12).fill(0) };
	const trafficChartData = { labels: monthNames, data: Array(12).fill(0) };

	const submissions = articles.slice(0, 5).map((work, index) => {
		const title = articleTitle(work);
		const created =
			(work.created_at as string) || (work.updated_at as string) || new Date().toISOString();
		return {
			id: String(work.id ?? work.slug ?? index),
			title,
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
			author: {
				name: '—',
				email: '',
				avatar: null as string | null,
				initials: '?'
			}
		};
	});

	return {
		stats: {
			visitors: articles.length,
			authors: articles.length,
			publications: articles.length,
			pendingWorks: 0
		},
		submissions,
		publicationsChartData,
		trafficChartData
	};
};
