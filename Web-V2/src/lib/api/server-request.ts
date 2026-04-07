import type { Cookies, RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getApiBaseUrl } from './config';

export const COOKIE_TOKEN = 'abelar_access_token';

export function getBearerForCookies(cookies: Cookies, accessToken: string | null): string {
	if (accessToken) return `Bearer ${accessToken}`;
	const key = env.ABELAR_API_KEY;
	if (key) return `Bearer ${key}`;
	return 'Bearer ';
}

export function getAccessTokenFromCookies(cookies: Cookies): string | null {
	return cookies.get(COOKIE_TOKEN) ?? null;
}

export function getAccessTokenFromEvent(event: RequestEvent): string | null {
	return getAccessTokenFromCookies(event.cookies);
}

/**
 * Call Abelar API with the user's bearer token from cookies (works in load and actions).
 */
export async function abelarFetchCookies(
	cookies: Cookies,
	path: string,
	init: RequestInit & { json?: unknown } = {}
): Promise<Response> {
	const base = getApiBaseUrl();
	const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
	const token = getAccessTokenFromCookies(cookies);
	const { json, ...rest } = init;
	const headers = new Headers(rest.headers);
	if (json !== undefined) {
		headers.set('Content-Type', 'application/json');
	}
	if (!headers.has('Authorization')) {
		headers.set('Authorization', getBearerForCookies(cookies, token));
	}
	const body = json !== undefined ? JSON.stringify(json) : rest.body;
	return fetch(url, { ...rest, headers, body });
}

export async function abelarRequest(
	event: RequestEvent,
	path: string,
	init: RequestInit & { json?: unknown } = {}
): Promise<Response> {
	return abelarFetchCookies(event.cookies, path, init);
}
