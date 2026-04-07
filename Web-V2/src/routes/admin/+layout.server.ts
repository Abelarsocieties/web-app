import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Allow access to admin login page without authentication
	if (url.pathname === '/admin/login' || url.pathname.startsWith('/admin/login/')) {
		return {
			session: locals.session,
			user: locals.user
		};
	}

	console.log('[Admin Layout] Checking access for:', url.pathname);
	console.log('[Admin Layout] Session exists:', !!locals.session);
	console.log('[Admin Layout] User exists:', !!locals.user);
	console.log('[Admin Layout] User role:', locals.user?.role);

	// For all other admin routes, require authentication
	if (!locals.session) {
		console.log('[Admin Layout] No session, redirecting to login');
		throw redirect(303, '/admin/login');
	}

	// Check if user has admin or editor role
	if (!locals.user || (locals.user.role !== 'admin' && locals.user.role !== 'editor')) {
		console.log('[Admin Layout] User is not admin/editor, redirecting to app/home');
		console.log('[Admin Layout] User role was:', locals.user?.role);
		throw redirect(303, '/app/home');
	}

	console.log('[Admin Layout] ✓ Access granted to admin route');
	return {
		session: locals.session,
		user: locals.user
	};
};
