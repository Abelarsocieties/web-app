import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { abelarFetchCookies, COOKIE_TOKEN, getAccessTokenFromCookies } from './server-request';
import { mapProfile, applyAdminEmails } from './profile';
import type { AppSession, AppUser } from './types';

function adminEmailList(): string[] {
	const raw = env.ABELAR_ADMIN_EMAILS ?? '';
	return raw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
}

export async function loadSessionAndUser(event: RequestEvent): Promise<{
	session: AppSession | null;
	user: AppUser | null;
}> {
	const token = getAccessTokenFromCookies(event.cookies);
	if (!token) {
		return { session: null, user: null };
	}

	const res = await abelarFetchCookies(event.cookies, '/profile', { method: 'GET' });
	if (!res.ok) {
		event.cookies.delete(COOKIE_TOKEN, { path: '/' });
		event.cookies.delete('abelar_user_email', { path: '/' });
		return { session: null, user: null };
	}

	const json = await res.json().catch(() => null);
	const email = event.cookies.get('abelar_user_email') ?? null;
	let user = mapProfile(json, email);
	if (!user) {
		return { session: null, user: null };
	}
	user = applyAdminEmails(user, adminEmailList());

	return {
		session: {
			access_token: token,
			user: { id: user.id, email: user.email }
		},
		user
	};
}
