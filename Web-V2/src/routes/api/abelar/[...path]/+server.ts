import { error, type Cookies, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_ABELAR_API_URL } from '$env/static/public';
import { env } from '$env/dynamic/private';
import { COOKIE_TOKEN } from '$lib/api/server-request';

function baseUrl(): string {
	const raw = PUBLIC_ABELAR_API_URL?.trim();
	if (!raw) throw error(500, 'PUBLIC_ABELAR_API_URL is not configured');
	return raw.replace(/\/$/, '');
}

async function proxy(
	request: Request,
	params: { path?: string },
	cookies: Cookies
): Promise<Response> {
	const path = params.path ?? '';
	const target = `${baseUrl()}/${path}${new URL(request.url).search}`;
	const token = cookies.get(COOKIE_TOKEN);
	const key = env.ABELAR_API_KEY;
	const auth = token ? `Bearer ${token}` : key ? `Bearer ${key}` : 'Bearer ';

	const headers = new Headers(request.headers);
	headers.delete('host');
	headers.delete('connection');
	headers.set('Authorization', auth);

	const body =
		request.method !== 'GET' && request.method !== 'HEAD'
			? await request.arrayBuffer()
			: undefined;

	return fetch(target, {
		method: request.method,
		headers,
		body: body && body.byteLength > 0 ? body : undefined
	});
}

export const GET: RequestHandler = (e) => proxy(e.request, e.params, e.cookies);
export const POST: RequestHandler = (e) => proxy(e.request, e.params, e.cookies);
export const PUT: RequestHandler = (e) => proxy(e.request, e.params, e.cookies);
export const PATCH: RequestHandler = (e) => proxy(e.request, e.params, e.cookies);
export const DELETE: RequestHandler = (e) => proxy(e.request, e.params, e.cookies);
