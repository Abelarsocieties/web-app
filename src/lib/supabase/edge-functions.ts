// Edge Functions Helper
// Use this to call Supabase Edge Functions securely
// All writes should go through Edge Functions, not direct client calls

import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from './client';

/**
 * Call a Supabase Edge Function
 * @param functionName - Name of the Edge Function
 * @param options - Request options
 */
export async function callEdgeFunction<T = any>(
	functionName: string,
	options: {
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
		body?: any;
		requireAuth?: boolean;
	}
): Promise<{ data?: T; error?: string }> {
	try {
		const supabase = createClient();
		let token = PUBLIC_SUPABASE_ANON_KEY;

		// If auth is required, get user token
		if (options.requireAuth) {
			const { data: { session } } = await supabase.auth.getSession();
			if (!session) {
				return { error: 'Authentication required' };
			}
			token = session.access_token;
		}

		const response = await fetch(
			`${PUBLIC_SUPABASE_URL}/functions/v1/${functionName}`,
			{
				method: options.method || 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: options.body ? JSON.stringify(options.body) : undefined,
			}
		);

		const result = await response.json();

		if (!response.ok) {
			return { error: result.error || 'Request failed' };
		}

		return { data: result };
	} catch (error) {
		console.error('Edge function error:', error);
		return { error: 'Network error' };
	}
}

/**
 * Submit a contact message via Edge Function
 */
export async function submitContactMessage(data: {
	first_name: string;
	email: string;
	message: string;
}) {
	return callEdgeFunction('contact-message', {
		method: 'POST',
		body: data,
		requireAuth: false, // Contact form can be anonymous
	});
}

/**
 * Create a work via Edge Function
 */
export async function createWork(data: {
	title: string;
	slug: string;
	content_json?: any;
	cover_image_url?: string;
	category?: string;
	tags?: string[];
	status?: 'draft' | 'submitted' | 'published' | 'rejected';
}) {
	return callEdgeFunction<{ work: any }>('create-work', {
		method: 'POST',
		body: data,
		requireAuth: true, // Requires authenticated user
	});
}
