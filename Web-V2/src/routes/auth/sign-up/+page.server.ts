import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { abelarRequest, COOKIE_TOKEN } from '$lib/api/server-request';
import { extractAccessToken, extractNonce } from '$lib/api/token';
import { loadSessionAndUser } from '$lib/api/session';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(303, '/app/home');
	}
	return {};
};

export const actions: Actions = {
	sendOtp: async (event) => {
		const fd = await event.request.formData();
		const email = (fd.get('email') as string)?.trim();
		if (!email) {
			return fail(400, { message: 'Enter your email, then request a verification code.' });
		}

		const res = await abelarRequest(event, '/auth/get-nonce-key', {
			method: 'POST',
			json: { email }
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
					: text || 'Could not send verification code.';
			return fail(400, { message: msg });
		}

		const nonce = extractNonce(body);
		if (!nonce) {
			return fail(400, {
				message: 'Unexpected response from server (missing nonce_key). Check API response shape.'
			});
		}

		event.cookies.set('abelar_nonce_key', nonce, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 15
		});

		return { otpSent: true };
	},

	signUp: async (event) => {
		const fd = await event.request.formData();
		const email = (fd.get('email') as string)?.trim();
		const password = fd.get('password') as string;
		const password_confirmation = fd.get('confirmPassword') as string;
		const first_name = (fd.get('firstName') as string)?.trim();
		const last_name = (fd.get('lastName') as string)?.trim();
		const otp = (fd.get('otp') as string)?.trim();
		const nonce_key = event.cookies.get('abelar_nonce_key');

		if (!email || !password || !first_name || !last_name) {
			return fail(400, { message: 'Please fill in all required fields.' });
		}
		if (password !== password_confirmation) {
			return fail(400, { message: 'Passwords do not match.' });
		}
		if (!otp) {
			return fail(400, { message: 'Enter the verification code from your email.' });
		}
		if (!nonce_key) {
			return fail(400, { message: 'Request a verification code first (Send verification code).' });
		}

		const res = await abelarRequest(event, '/auth/signup', {
			method: 'POST',
			json: {
				email,
				password,
				password_confirmation,
				first_name,
				last_name,
				otp,
				nonce_key
			}
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
					: text || 'Sign up failed.';
			return fail(400, { message: msg });
		}

		const token = extractAccessToken(body);
		if (!token) {
			event.cookies.delete('abelar_nonce_key', { path: '/' });
			throw redirect(303, '/auth/sign-in?registered=1');
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
		event.cookies.delete('abelar_nonce_key', { path: '/' });

		const { user } = await loadSessionAndUser(event);
		if (user && (user.role === 'admin' || user.role === 'editor')) {
			throw redirect(303, '/admin/dashboard');
		}

		throw redirect(303, '/app/home');
	}
};
