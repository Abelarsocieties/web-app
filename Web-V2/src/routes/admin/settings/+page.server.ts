import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { abelarRequest } from '$lib/api/server-request';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/admin/login');
	}
	if (locals.user.role !== 'admin' && locals.user.role !== 'editor') {
		throw redirect(303, '/app/home');
	}
	return { user: locals.user };
};

export const actions: Actions = {
	updateProfile: async (event) => {
		if (!event.locals.session || !event.locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = await event.request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const bio = formData.get('bio') as string;
		const avatar = formData.get('avatar') as File | null;

		let avatarUrl: string | null = null;
		if (avatar && avatar.size > 0) {
			const fd = new FormData();
			fd.append('photo', avatar);
			const up = await abelarRequest(event, '/media', { method: 'POST', body: fd });
			if (!up.ok) {
				const t = await up.text();
				return fail(500, { error: 'Avatar upload failed: ' + t });
			}
			const j = await up.json().catch(() => null);
			if (j && typeof j === 'object') {
				const o = j as Record<string, unknown>;
				avatarUrl = (o.url ?? o.public_url) as string | null;
				if (o.data && typeof o.data === 'object') {
					const d = o.data as Record<string, unknown>;
					avatarUrl = (d.url ?? d.public_url ?? avatarUrl) as string | null;
				}
			}
		}

		const patchBody: Record<string, unknown> = {
			first_name: firstName || null,
			last_name: lastName || null,
			bio: bio || null
		};
		if (avatarUrl) patchBody.avatar_url = avatarUrl;

		const res = await abelarRequest(event, '/profile', {
			method: 'PATCH',
			json: patchBody
		});

		if (!res.ok) {
			const t = await res.text();
			return fail(500, { error: t || 'Failed to update profile' });
		}

		return { success: true };
	},

	updateSecurity: async () => {
		return fail(501, {
			error: 'Password changes are not wired to the published PHP API in this app.'
		});
	},

	updateNotifications: async () => {
		return fail(501, {
			error: 'Notification preferences are not in the published OpenAPI spec.'
		});
	}
};
