import type { PageServerLoad, Actions } from './$types';
import { redirect, fail, isRedirect } from '@sveltejs/kit';
import { abelarRequest } from '$lib/api/server-request';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/auth/sign-in');
	}
	return { user: locals.user };
};

function pickMediaUrl(json: unknown): string | null {
	if (!json || typeof json !== 'object') return null;
	const o = json as Record<string, unknown>;
	const direct = o.url ?? o.public_url ?? o.path;
	if (typeof direct === 'string') return direct;
	if (o.data && typeof o.data === 'object') {
		const d = o.data as Record<string, unknown>;
		const u = d.url ?? d.public_url;
		if (typeof u === 'string') return u;
	}
	return null;
}

export const actions: Actions = {
	submitWork: async (event) => {
		if (!event.locals.session || !event.locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		try {
			const formData = await event.request.formData();
			const title = formData.get('title') as string;
			const content = formData.get('content') as string;
			const summary = formData.get('summary') as string;
			const workType = formData.get('workType') as string;
			const topic = formData.get('topic') as string;
			const activeTab = formData.get('activeTab') as string;
			const coverImage = formData.get('coverImage') as File | null;
			const uploadedFile = formData.get('uploadedFile') as File | null;

			if (!title?.trim()) {
				return fail(400, { error: 'Title is required' });
			}

			let coverUrl = '';
			if (coverImage && coverImage.size > 0) {
				const fd = new FormData();
				fd.append('photo', coverImage);
				const up = await abelarRequest(event, '/media', {
					method: 'POST',
					body: fd
				});
				if (!up.ok) {
					const t = await up.text();
					return fail(500, { error: 'Cover upload failed: ' + t });
				}
				const j = await up.json().catch(() => null);
				coverUrl = pickMediaUrl(j) ?? '';
			}

			let fileUrl = '';
			if (uploadedFile && uploadedFile.size > 0) {
				const fd = new FormData();
				fd.append('photo', uploadedFile);
				const up = await abelarRequest(event, '/media', {
					method: 'POST',
					body: fd
				});
				if (!up.ok) {
					const t = await up.text();
					return fail(500, { error: 'Document upload failed: ' + t });
				}
				const j = await up.json().catch(() => null);
				fileUrl = pickMediaUrl(j) ?? '';
			}

			const metaParts = [
				summary ? `<p><strong>Summary</strong></p><p>${escapeHtml(summary)}</p>` : '',
				`<p><strong>Type</strong>: ${escapeHtml(workType)} · <strong>Topic</strong>: ${escapeHtml(topic || '')}</p>`,
				coverUrl ? `<figure><img src="${escapeHtml(coverUrl)}" alt="cover" /></figure>` : '',
				fileUrl
					? `<p><a href="${escapeHtml(fileUrl)}">Download attached document</a></p>`
					: '',
				`<div class="article-body">${content || ''}</div>`
			];
			const article = metaParts.join('\n');

			const created = await abelarRequest(event, '/articles', {
				method: 'POST',
				json: { title: title.trim(), article }
			});

			if (!created.ok) {
				const t = await created.text();
				return fail(500, { error: t || 'Failed to create article' });
			}

			throw redirect(
				303,
				`/app/submit/success?type=${activeTab === 'upload' ? 'upload' : 'text'}`
			);
		} catch (e) {
			if (isRedirect(e)) throw e;
			console.error('Submit work error:', e);
			return fail(500, { error: e instanceof Error ? e.message : 'Failed to submit work' });
		}
	}
};

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
