import type { AppUser } from './types';

function pickString(o: Record<string, unknown>, keys: string[]): string | null {
	for (const k of keys) {
		const v = o[k];
		if (typeof v === 'string' && v) return v;
	}
	return null;
}

/** Maps PHP API /profile JSON to our AppUser (schemas are open in Fern docs). */
export function mapProfile(raw: unknown, fallbackEmail: string | null): AppUser | null {
	if (!raw || typeof raw !== 'object') return null;
	const o = raw as Record<string, unknown>;
	const data = o.data && typeof o.data === 'object' ? (o.data as Record<string, unknown>) : o;

	const id = pickString(data, ['id', 'user_id', 'uuid']) ?? (fallbackEmail ? `user:${fallbackEmail}` : 'unknown');
	const first = pickString(data, ['first_name', 'firstName']);
	const last = pickString(data, ['last_name', 'lastName']);
	const name =
		pickString(data, ['name', 'full_name']) ??
		(first || last ? [first, last].filter(Boolean).join(' ') : null);

	return {
		id,
		name,
		first_name: first,
		last_name: last,
		avatar_url: pickString(data, ['avatar_url', 'avatar', 'photo', 'image']),
		email: pickString(data, ['email']) ?? fallbackEmail,
		role: parseRole(data)
	};
}

function parseRole(data: Record<string, unknown>): AppUser['role'] {
	const r = data.role ?? data.user_role;
	if (typeof r === 'string') {
		const x = r.toLowerCase();
		if (x === 'admin' || x === 'editor' || x === 'user') return x;
	}
	return 'user';
}

export function applyAdminEmails(user: AppUser, adminEmails: string[]): AppUser {
	const email = user.email?.toLowerCase();
	if (!email) return user;
	if (adminEmails.some((e) => e.toLowerCase() === email)) {
		return { ...user, role: 'admin' };
	}
	return user;
}
