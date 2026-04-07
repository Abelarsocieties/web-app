import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { abelarRequest, COOKIE_TOKEN } from '$lib/api/server-request';
import { extractAccessToken } from '$lib/api/token';
import { loadSessionAndUser } from '$lib/api/session';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, '/app/home');
	}
	return {};
};

export const actions: Actions = {
	signIn: async (event) => {
		const formData = await event.request.formData();
		const email = (formData.get('email') as string)?.trim();
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { message: 'Please enter both email and password' });
		}

		const res = await abelarRequest(event, '/auth/login', {
			method: 'POST',
			json: { email, password }
		});

		const text = await res.text();
		let body: unknown = null;
		try {
			body = text ? JSON.parse(text) : null;
		} catch {
			body = null;
		}

		if (!res.ok) {
			const msg =
				typeof body === 'object' && body && 'message' in body
					? String((body as { message: unknown }).message)
					: text || 'Invalid email or password.';
			return fail(400, { message: msg || 'Sign in failed.' });
		}

		const token = extractAccessToken(body);
		if (!token) {
			return fail(400, {
				message: 'Sign in succeeded but no token was returned. Check API response shape.'
			});
		}

		event.cookies.set(COOKIE_TOKEN, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});
		event.cookies.set('abelar_user_email', email, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});

		const { user } = await loadSessionAndUser(event);

		if (user && (user.role === 'admin' || user.role === 'editor')) {
			throw redirect(303, '/admin/dashboard');
		}

		throw redirect(303, '/app/home');
	}
};
