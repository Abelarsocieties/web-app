import type { PageServerLoad } from './$types';
import { createAdminClient } from '$lib/supabase/admin';

export const load: PageServerLoad = async ({ locals }) => {
	const adminClient = createAdminClient();

	// Fetch dashboard statistics
	const [
		{ count: visitorsCount },
		{ count: authorsCount },
		{ count: publicationsCount },
		{ count: pendingWorksCount },
		{ data: recentSubmissions },
		{ data: publicationsData },
		{ data: trafficData }
	] = await Promise.all([
		// Visitors count (unique users who have works or likes) - simplified query
		adminClient
			.from('profiles')
			.select('*', { count: 'exact', head: true }),
		
		// Authors count (users who have created works)
		adminClient
			.from('works')
			.select('author_id', { count: 'exact', head: true }),
		
		// Publications count (published works)
		adminClient
			.from('works')
			.select('*', { count: 'exact', head: true })
			.eq('status', 'published'),
		
		// Pending works count (submitted works)
		adminClient
			.from('works')
			.select('*', { count: 'exact', head: true })
			.eq('status', 'submitted'),
		
		// Recent submissions (last 5)
		adminClient
			.from('works')
			.select(`
				id,
				title,
				category,
				tags,
				status,
				created_at,
				updated_at,
				author:profiles!works_author_id_fkey (
					id,
					name,
					email,
					avatar_url
				)
			`)
			.eq('status', 'submitted')
			.order('created_at', { ascending: false })
			.limit(5),
		
		// Publications over time (last 12 months) - fallback query
		adminClient
			.from('works')
			.select('created_at')
			.eq('status', 'published')
			.gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
			.order('created_at', { ascending: true }),
		
		// Traffic data (likes over time) - fallback query
		adminClient
			.from('likes')
			.select('created_at')
			.gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
			.order('created_at', { ascending: true })
	]);

	// Process submissions for table
	const submissions = (recentSubmissions || []).map((work: any) => {
		const author = work.author || {};
		const nameParts = (author.name || author.email || 'Unknown').split(' ');
		const initials = nameParts.length >= 2 
			? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
			: (author.name || author.email || 'U')[0].toUpperCase();
		
		return {
			id: work.id,
			title: work.title,
			size: '200 KB', // TODO: Calculate from content_json if available
			type: work.content_json ? 'Writing' : 'File Upload',
			category: work.category || 'Article',
			topic: work.tags?.[0] || 'General',
			dateSubmitted: new Date(work.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
			lastUpdated: new Date(work.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
			author: {
				name: author.name || author.email || 'Unknown',
				email: author.email || '',
				avatar: author.avatar_url,
				initials
			}
		};
	});

	// Process publications chart data
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let publicationsChartData = { labels: monthNames, data: Array(12).fill(0) };
	
	if (publicationsData?.data && Array.isArray(publicationsData.data)) {
		publicationsData.data.forEach((work: any) => {
			const date = new Date(work.created_at);
			const month = date.getMonth();
			publicationsChartData.data[month]++;
		});
	}

	// Process traffic chart data
	let trafficChartData = { labels: monthNames, data: Array(12).fill(0) };
	
	if (trafficData?.data && Array.isArray(trafficData.data)) {
		trafficData.data.forEach((like: any) => {
			const date = new Date(like.created_at);
			const month = date.getMonth();
			trafficChartData.data[month]++;
		});
		// Scale traffic data for better visualization
		trafficChartData.data = trafficChartData.data.map(count => Math.max(count * 10, 100));
	}

	return {
		stats: {
			visitors: visitorsCount || 0,
			authors: authorsCount || 0,
			publications: publicationsCount || 0,
			pendingWorks: pendingWorksCount || 0
		},
		submissions,
		publicationsChartData,
		trafficChartData
	};
};
