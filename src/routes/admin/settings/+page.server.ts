import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { createAdminClient } from '$lib/supabase/admin';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/admin/login');
	}

	if (locals.user.role !== 'admin' && locals.user.role !== 'editor') {
		throw redirect(303, '/app/home');
	}

	return {
		user: locals.user
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const adminClient = createAdminClient();
		const formData = await request.formData();

		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		const occupation = formData.get('occupation') as string;
		const organization = formData.get('organization') as string;
		const yearsOfExperience = formData.get('yearsOfExperience') as string;
		const fieldIndustry = formData.get('fieldIndustry') as string;
		const bio = formData.get('bio') as string;
		const avatar = formData.get('avatar') as File | null;

		try {
			// Update profile in database
			const updateData: any = {
				first_name: firstName || null,
				last_name: lastName || null,
				name: `${firstName || ''} ${lastName || ''}`.trim() || null
			};

			// Store additional fields in metadata or extend schema
			// For now, we'll store in a JSONB field if available, or extend the schema
			// This is a placeholder - you may need to add these fields to your profiles table
			const metadata: any = {
				occupation: occupation || null,
				organization: organization || null,
				yearsOfExperience: yearsOfExperience || null,
				fieldIndustry: fieldIndustry || null,
				bio: bio || null
			};

			// Upload avatar if provided
			if (avatar && avatar.size > 0) {
				const fileExt = avatar.name.split('.').pop();
				const fileName = `${locals.user.id}-avatar-${Date.now()}.${fileExt}`;
				
				const { data: uploadData, error: uploadError } = await adminClient.storage
					.from('avatars')
					.upload(fileName, avatar, {
						cacheControl: '3600',
						upsert: true
					});

				if (!uploadError) {
					const { data: { publicUrl } } = adminClient.storage
						.from('avatars')
						.getPublicUrl(fileName);
					updateData.avatar_url = publicUrl;
				}
			}

			const { error: updateError } = await adminClient
				.from('profiles')
				.update(updateData)
				.eq('id', locals.user.id);

			if (updateError) {
				console.error('Profile update error:', updateError);
				return fail(500, { error: updateError.message || 'Failed to update profile' });
			}

			// Update email in auth if changed
			if (email && email !== locals.user.email) {
				const { error: emailError } = await adminClient.auth.admin.updateUserById(
					locals.user.id,
					{ email }
				);
				if (emailError) {
					console.error('Email update error:', emailError);
					// Don't fail the whole request if email update fails
				}
			}

			return { success: true };
		} catch (error: any) {
			console.error('Update profile error:', error);
			return fail(500, { error: error.message || 'Failed to update profile' });
		}
	},

	updateSecurity: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const adminClient = createAdminClient();
		const formData = await request.formData();

		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!newPassword || newPassword.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { error: 'Passwords do not match' });
		}

		try {
			const { error } = await adminClient.auth.admin.updateUserById(
				locals.user.id,
				{ password: newPassword }
			);

			if (error) {
				console.error('Password update error:', error);
				return fail(500, { error: error.message || 'Failed to update password' });
			}

			return { success: true };
		} catch (error: any) {
			console.error('Update security error:', error);
			return fail(500, { error: error.message || 'Failed to update password' });
		}
	},

	updateNotifications: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const adminClient = createAdminClient();
		const formData = await request.formData();

		const commentsNotifications = formData.get('commentsNotifications') === 'true';
		const likesNotifications = formData.get('likesNotifications') === 'true';

		try {
			// Store notification preferences in user metadata or a separate table
			// For now, we'll update the user's metadata
			const { error } = await adminClient.auth.admin.updateUserById(
				locals.user.id,
				{
					user_metadata: {
						...locals.user,
						notifications: {
							comments: commentsNotifications,
							likes: likesNotifications
						}
					}
				}
			);

			if (error) {
				console.error('Notifications update error:', error);
				return fail(500, { error: error.message || 'Failed to update notifications' });
			}

			return { success: true };
		} catch (error: any) {
			console.error('Update notifications error:', error);
			return fail(500, { error: error.message || 'Failed to update notifications' });
		}
	}
};
