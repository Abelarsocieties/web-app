// Edge Functions Helper
// Use this to call Supabase Edge Functions securely
// All writes should go through Edge Functions, not direct client calls

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
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
		accessToken?: string; // Optional: pass token directly (for server-side usage)
	}
): Promise<{ data?: T; error?: string }> {
	try {
		let token = PUBLIC_SUPABASE_ANON_KEY;

		// If auth is required, get user token
		if (options.requireAuth) {
			// Use provided token if available (server-side), otherwise get from client
			if (options.accessToken) {
				token = options.accessToken;
			} else {
				const supabase = createClient();
				const { data: { session } } = await supabase.auth.getSession();
				if (!session) {
					return { error: 'Authentication required' };
				}
				token = session.access_token;
			}
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
			const errorMessage = result.error || result.message || `Request failed with status ${response.status}`;
			console.error(`Edge function ${functionName} error:`, {
				status: response.status,
				error: errorMessage,
				response: result
			});
			return { error: errorMessage };
		}

		return { data: result };
	} catch (error) {
		console.error('Edge function error:', error);
		return { error: error instanceof Error ? error.message : 'Network error' };
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
}, accessToken?: string) {
	return callEdgeFunction<{ work: any }>('create-work', {
		method: 'POST',
		body: data,
		requireAuth: true, // Requires authenticated user
		accessToken, // Pass token for server-side usage
	});
}
