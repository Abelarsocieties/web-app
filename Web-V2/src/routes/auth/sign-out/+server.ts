import { redirect, type RequestHandler } from '@sveltejs/kit';
import { abelarRequest, COOKIE_TOKEN } from '$lib/api/server-request';

export const GET: RequestHandler = async (event) => {
	const email = event.cookies.get('abelar_user_email') ?? '';
	try {
		await abelarRequest(event, '/auth/logout', {
			method: 'POST',
			json: { email, recaptcha_token: '' }
		});
	} catch {
		// still clear cookies locally
	}
	event.cookies.delete(COOKIE_TOKEN, { path: '/' });
	event.cookies.delete('abelar_user_email', { path: '/' });
	throw redirect(303, '/');
};
