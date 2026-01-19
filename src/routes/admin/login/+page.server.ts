import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createClient } from '$lib/supabase/server';
import { createAdminClient } from '$lib/supabase/admin';

export const load: PageServerLoad = async ({ locals, url }) => {
	// If already authenticated as admin, redirect to dashboard
	if (locals.session && locals.user && (locals.user.role === 'admin' || locals.user.role === 'editor')) {
		throw redirect(303, '/admin/dashboard');
	}
	
	return {};
};

export const actions: Actions = {
	signIn: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, {
				message: 'Please enter both email and password'
			});
		}

		// Create Supabase client with server-side cookie handling
		const event = {
			cookies,
			url: new URL(request.url)
		} as any;
		const supabase = createClient(event);

		console.log('[Admin Login] Attempting sign-in for:', email.trim());

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email.trim(),
			password
		});

		if (error) {
			console.error('[Admin Login] Sign-in error:', error.message);
			let errorMessage = error.message || 'An error occurred during sign in. Please try again.';
			if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
				errorMessage = 'Invalid email or password. Please check your credentials and try again.';
			} else if (error.message.includes('Email not confirmed') || error.message.includes('email_not_confirmed')) {
				errorMessage = 'Please confirm your email before signing in. Check your inbox for a confirmation link.';
			} else if (error.message.includes('User not found')) {
				errorMessage = 'No account found with this email. Please sign up first.';
			}

			return fail(400, {
				message: errorMessage
			});
		}

		if (data.session) {
			console.log('[Admin Login] Sign-in successful, session created for:', data.session.user.email);
			console.log('[Admin Login] User ID:', data.session.user.id);
			
			// Use admin client to bypass RLS and check profile
			// This ensures we can read the profile even if RLS policies are blocking
			const adminClient = createAdminClient();
			
			console.log('[Admin Login] Querying profile for user ID:', data.session.user.id);
			const { data: profile, error: profileError } = await adminClient
				.from('profiles')
				.select('role')
				.eq('id', data.session.user.id)
				.single();

			console.log('[Admin Login] Profile query result:');
			console.log('[Admin Login] - Profile data:', JSON.stringify(profile));
			console.log('[Admin Login] - Profile error:', profileError ? JSON.stringify(profileError) : 'none');
			
			if (profileError) {
				console.error('[Admin Login] Profile fetch error:', profileError.message);
				console.error('[Admin Login] Profile error code:', profileError.code);
				if (profileError.code === 'PGRST116') {
					console.error('[Admin Login] ⚠ Profile does not exist for this user!');
					console.error('[Admin Login] Please create a profile with role="admin" in Supabase.');
				}
			}
			
			if (profile) {
				console.log('[Admin Login] Profile role value:', profile.role);
				console.log('[Admin Login] Role type:', typeof profile.role);
				console.log('[Admin Login] Is admin?', profile.role === 'admin');
				console.log('[Admin Login] Is editor?', profile.role === 'editor');
			}

			if (profileError || !profile || (profile.role !== 'admin' && profile.role !== 'editor')) {
				console.error('[Admin Login] User is not admin. Role:', profile?.role || 'undefined (profile missing)');
				// Sign out the user since they're not admin
				await supabase.auth.signOut();
				return fail(403, {
					message: profileError?.code === 'PGRST116' 
						? 'Profile not found. Please contact an administrator to create your admin profile.'
						: 'You do not have admin access. Please contact an administrator.'
				});
			}

			console.log('[Admin Login] Sign-in successful for admin:', data.session.user.email);
			
			// Manually set the auth cookie (same as regular login)
			const cookieName = `sb-fgjogfzekladfkslliex-auth-token`;
			const cookieValue = JSON.stringify({
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token,
				expires_at: data.session.expires_at,
				token_type: data.session.token_type,
				user: data.session.user
			});
			
			cookies.set(cookieName, cookieValue, {
				path: '/',
				sameSite: 'lax',
				httpOnly: false,
				secure: false,
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
			
			console.log('[Admin Login] ✓ Auth cookie set');
			console.log('[Admin Login] Redirecting to /admin/dashboard...');
			
			// Redirect to admin dashboard
			throw redirect(303, '/admin/dashboard');
		}

		return fail(400, {
			message: 'Sign in failed. No session was created. Please try again.'
		});
	}
};
