import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { createClient } from '$lib/supabase/server';
import { createAdminClient } from '$lib/supabase/admin';
import { createWork } from '$lib/supabase/edge-functions';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/auth/sign-in');
	}

	return {
		user: locals.user
	};
};

export const actions: Actions = {
	submitWork: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const supabase = createClient({ locals });
		const adminClient = createAdminClient();

		try {
			const formData = await request.formData();
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

			let coverImageUrl = '';
			let documentFileUrl = '';

			// Upload cover image if present
			if (coverImage && coverImage.size > 0) {
				const fileExt = coverImage.name.split('.').pop();
				const fileName = `${locals.user.id}-${Date.now()}-cover.${fileExt}`;
				
				const { data: uploadData, error: uploadError } = await adminClient.storage
					.from('work-images')
					.upload(fileName, coverImage, {
						cacheControl: '3600',
						upsert: false
					});

				if (uploadError) {
					console.error('Cover image upload error:', uploadError);
					return fail(500, { error: 'Failed to upload cover image: ' + uploadError.message });
				}

				const { data: { publicUrl } } = adminClient.storage
					.from('work-images')
					.getPublicUrl(fileName);
				coverImageUrl = publicUrl;
			}

			// Upload document file if present
			if (uploadedFile && uploadedFile.size > 0) {
				const fileExt = uploadedFile.name.split('.').pop();
				const fileName = `${locals.user.id}-${Date.now()}-document.${fileExt}`;
				
				const { data: uploadData, error: uploadError } = await adminClient.storage
					.from('work-images')
					.upload(fileName, uploadedFile, {
						cacheControl: '3600',
						upsert: false
					});

				if (uploadError) {
					console.error('Document upload error:', uploadError);
					return fail(500, { error: 'Failed to upload document: ' + uploadError.message });
				}

				const { data: { publicUrl } } = adminClient.storage
					.from('work-images')
					.getPublicUrl(fileName);
				documentFileUrl = publicUrl;
			}

			// Prepare content JSON
			const contentJson: any = {
				html: content || '',
				text: content ? content.replace(/<[^>]*>/g, '') : ''
			};

			if (documentFileUrl) {
				contentJson.file_url = documentFileUrl;
				contentJson.file_name = uploadedFile?.name || '';
			}

			// Create work using Edge Function
			const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
			
			// Get access token from session for server-side edge function call
			const { data: { session } } = await supabase.auth.getSession();
			if (!session) {
				return fail(401, { error: 'Session expired. Please sign in again.' });
			}
			
			const { data: result, error } = await createWork({
				title,
				slug,
				content_json: contentJson,
				cover_image_url: coverImageUrl || undefined,
				category: workType,
				tags: topic ? [topic] : [],
				status: 'submitted'
			}, session.access_token);

			if (error) {
				console.error('Create work error:', error);
				return fail(500, { error: error || 'Failed to submit work' });
			}

			throw redirect(303, `/app/submit/success?type=${activeTab === 'upload' ? 'upload' : 'text'}`);
		} catch (error: any) {
			console.error('Submit work error:', error);
			return fail(500, { error: error.message || 'Failed to submit work' });
		}
	}
};
