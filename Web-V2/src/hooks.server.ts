import type { Handle } from '@sveltejs/kit';
import { loadSessionAndUser } from '$lib/api/session';

export const handle: Handle = async ({ event, resolve }) => {
	const { session, user } = await loadSessionAndUser(event);
	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};
