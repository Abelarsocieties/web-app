<script lang="ts">
	import { onMount } from 'svelte';
	import { createClient } from '$lib/supabase/client';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	const supabase = createClient();

	let activeTab: 'profile' | 'security' | 'notifications' = 'profile';
	let loading = false;
	let successMessage = '';
	let errorMessage = '';

	// Profile fields
	let firstName = '';
	let lastName = '';
	let email = '';
	let occupation = '';
	let organization = '';
	let yearsOfExperience = '0';
	let fieldIndustry = '';
	let bio = '';
	let avatarPreview = '';
	let avatarFile: File | null = null;
	let avatarInput: HTMLInputElement;

	// Security fields
	let newPassword = '';
	let confirmPassword = '';

	// Notification preferences
	let commentsNotifications = true;
	let likesNotifications = false;

	onMount(async () => {
		// Load user profile data
		if (data.user) {
			firstName = data.user.first_name || '';
			lastName = data.user.last_name || '';
			email = data.user.email || '';
			avatarPreview = data.user.avatar_url || '';

			// Load additional profile data if stored in metadata or separate table
			// For now, we'll use the basic profile fields
		}
	});

	function handleAvatarUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			avatarFile = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				avatarPreview = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	function triggerAvatarUpload() {
		avatarInput?.click();
	}

	async function handleProfileUpdate({ formData }: any) {
		loading = true;
		errorMessage = '';
		successMessage = '';

		// Update form data with current values
		formData.set('firstName', firstName);
		formData.set('lastName', lastName);
		formData.set('email', email);
		formData.set('occupation', occupation);
		formData.set('organization', organization);
		formData.set('yearsOfExperience', yearsOfExperience);
		formData.set('fieldIndustry', fieldIndustry);
		formData.set('bio', bio);

		if (avatarFile) {
			formData.set('avatar', avatarFile);
		}

		return async ({ result, update }: any) => {
			loading = false;
			if (result.type === 'success') {
				successMessage = 'Profile updated successfully!';
				setTimeout(() => successMessage = '', 3000);
			} else if (result.type === 'failure') {
				errorMessage = result.data?.error || 'Failed to update profile';
			}
			await update();
		};
	}

	async function handleSecurityUpdate({ formData }: any) {
		loading = true;
		errorMessage = '';
		successMessage = '';

		if (newPassword !== confirmPassword) {
			errorMessage = 'Passwords do not match';
			loading = false;
			return;
		}

		if (newPassword.length < 6) {
			errorMessage = 'Password must be at least 6 characters';
			loading = false;
			return;
		}

		formData.set('newPassword', newPassword);
		formData.set('confirmPassword', confirmPassword);

		return async ({ result, update }: any) => {
			loading = false;
			if (result.type === 'success') {
				successMessage = 'Password updated successfully!';
				newPassword = '';
				confirmPassword = '';
				setTimeout(() => successMessage = '', 3000);
			} else if (result.type === 'failure') {
				errorMessage = result.data?.error || 'Failed to update password';
			}
			await update();
		};
	}

	async function handleNotificationsUpdate({ formData }: any) {
		loading = true;
		errorMessage = '';
		successMessage = '';

		formData.set('commentsNotifications', commentsNotifications);
		formData.set('likesNotifications', likesNotifications);

		return async ({ result, update }: any) => {
			loading = false;
			if (result.type === 'success') {
				successMessage = 'Notification preferences updated successfully!';
				setTimeout(() => successMessage = '', 3000);
			} else if (result.type === 'failure') {
				errorMessage = result.data?.error || 'Failed to update notifications';
			}
			await update();
		};
	}
</script>

<svelte:head>
	<title>Settings | Abelar</title>
</svelte:head>

<div class="min-h-screen bg-gray-100">
	<div class="container mx-auto px-4 py-8">
		<!-- Page Title -->
		<h1 class="text-4xl font-bold mb-6" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Settings</h1>

		<!-- Tabs -->
		<div class="flex gap-2 mb-6">
			<button
				on:click={() => activeTab = 'profile'}
				class="px-6 py-3 font-medium transition-all duration-300 rounded {activeTab === 'profile' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Profile
			</button>
			<button
				on:click={() => activeTab = 'security'}
				class="px-6 py-3 font-medium transition-all duration-300 rounded {activeTab === 'security' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Security
			</button>
			<button
				on:click={() => activeTab = 'notifications'}
				class="px-6 py-3 font-medium transition-all duration-300 rounded {activeTab === 'notifications' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Notifications
			</button>
		</div>

		<!-- Profile Banner -->
		<div class="relative mb-8 rounded-lg overflow-hidden" style="background: linear-gradient(135deg, rgba(255, 107, 53, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);">
			<div class="px-8 py-12 flex flex-col items-center justify-center text-center">
				<div class="relative mb-4">
					{#if avatarPreview}
						<img src={avatarPreview} alt="Profile" class="w-32 h-32 rounded-full object-cover border-4 border-white" />
					{:else}
						<div class="w-32 h-32 rounded-full bg-white border-4 border-white flex items-center justify-center">
							<svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
					{/if}
					<button
						on:click={triggerAvatarUpload}
						class="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-white hover:bg-primary-dark transition-colors"
					>
						<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
						</svg>
					</button>
					<input
						type="file"
						bind:this={avatarInput}
						accept="image/*"
						on:change={handleAvatarUpload}
						class="hidden"
					/>
				</div>
				<h2 class="text-3xl font-bold text-white mb-2" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">
					{data.user?.name || firstName + ' ' + lastName || 'User'}
				</h2>
				<p class="text-white text-lg opacity-90">{data.user?.email || email || 'email@gmail.com'}</p>
			</div>
		</div>

		<!-- Messages -->
		{#if successMessage}
			<div class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
				{successMessage}
			</div>
		{/if}
		{#if errorMessage}
			<div class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
				{errorMessage}
			</div>
		{/if}

		<!-- Profile Tab -->
		{#if activeTab === 'profile'}
			<div class="bg-white border border-gray-300 rounded-lg p-6">
				<h3 class="text-lg font-bold mb-2" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Profile Settings</h3>
				<p class="text-gray-600 mb-6" style="font-family: 'Space Grotesk', sans-serif;">Update your photo and personal details.</p>

				<form method="POST" action="?/updateProfile" use:enhance={handleProfileUpdate}>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Left Column -->
						<div class="space-y-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">First Name</label>
								<input
									type="text"
									bind:value={firstName}
									placeholder="Enter your first name"
									class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
									style="font-family: 'Space Grotesk', sans-serif;"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Last Name</label>
								<input
									type="text"
									bind:value={lastName}
									placeholder="Enter your last name"
									class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
									style="font-family: 'Space Grotesk', sans-serif;"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Email</label>
								<input
									type="email"
									bind:value={email}
									placeholder="Enter your email"
									class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
									style="font-family: 'Space Grotesk', sans-serif;"
								/>
							</div>
						</div>

						<!-- Right Column -->
						<div class="space-y-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Occupation</label>
								<select
									bind:value={occupation}
									class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
									style="font-family: 'Space Grotesk', sans-serif;"
								>
									<option value="">Select Occupation</option>
									<option value="Researcher">Researcher</option>
									<option value="Writer">Writer</option>
									<option value="Academic">Academic</option>
									<option value="Professional">Professional</option>
									<option value="Student">Student</option>
								</select>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Affiliated Organisation</label>
								<input
									type="text"
									bind:value={organization}
									placeholder="Enter organisation"
									class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
									style="font-family: 'Space Grotesk', sans-serif;"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Years of Experience</label>
								<select
									bind:value={yearsOfExperience}
									class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
									style="font-family: 'Space Grotesk', sans-serif;"
								>
									<option value="0">0</option>
									<option value="1-2">1-2</option>
									<option value="3-5">3-5</option>
									<option value="6-10">6-10</option>
									<option value="11-15">11-15</option>
									<option value="16+">16+</option>
								</select>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Field/Industry</label>
								<select
									bind:value={fieldIndustry}
									class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
									style="font-family: 'Space Grotesk', sans-serif;"
								>
									<option value="">Select Field</option>
									<option value="Technology">Technology</option>
									<option value="Science">Science</option>
									<option value="Arts">Arts</option>
									<option value="Business">Business</option>
									<option value="Education">Education</option>
									<option value="Healthcare">Healthcare</option>
								</select>
							</div>
						</div>
					</div>

					<!-- Bio -->
					<div class="mt-6">
						<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">About/Bio</label>
						<textarea
							bind:value={bio}
							placeholder="Bio Here"
							rows="4"
							class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
							style="font-family: 'Space Grotesk', sans-serif;"
						></textarea>
					</div>

					<!-- Submit Button -->
					<div class="mt-6 flex justify-end">
						<button
							type="submit"
							disabled={loading}
							class="px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded font-medium disabled:opacity-50"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							{loading ? 'Updating...' : 'Update Info'}
						</button>
					</div>
				</form>
			</div>
		{/if}

		<!-- Security Tab -->
		{#if activeTab === 'security'}
			<div class="bg-white border border-gray-300 rounded-lg p-6">
				<h3 class="text-lg font-bold mb-2" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Security Settings</h3>
				<p class="text-gray-600 mb-6" style="font-family: 'Space Grotesk', sans-serif;">Update your account passwords.</p>

				<form method="POST" action="?/updateSecurity" use:enhance={handleSecurityUpdate}>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">New Password</label>
							<input
								type="password"
								bind:value={newPassword}
								placeholder="Confirm your new password"
								class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
								style="font-family: 'Space Grotesk', sans-serif;"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Confirm Password</label>
							<input
								type="password"
								bind:value={confirmPassword}
								placeholder="Confirm your new new password"
								class="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
								style="font-family: 'Space Grotesk', sans-serif;"
							/>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="mt-6 flex justify-end">
						<button
							type="submit"
							disabled={loading}
							class="px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded font-medium disabled:opacity-50"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							{loading ? 'Updating...' : 'Update Info'}
						</button>
					</div>
				</form>
			</div>
		{/if}

		<!-- Notifications Tab -->
		{#if activeTab === 'notifications'}
			<div class="bg-white border border-gray-300 rounded-lg p-6">
				<form method="POST" action="?/updateNotifications" use:enhance={handleNotificationsUpdate}>
					<div class="space-y-6">
						<!-- Comments Notification -->
						<div class="flex items-center justify-between pb-6 border-b border-gray-200">
							<div class="flex-1">
								<h4 class="text-base font-semibold mb-1" style="font-family: 'Space Grotesk', sans-serif;">Comments</h4>
								<p class="text-sm text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">
									These are notifications for comments on your posts and replies to your comments.
								</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer ml-4">
								<input
									type="checkbox"
									bind:checked={commentsNotifications}
									class="sr-only peer"
								/>
								<div class="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
								<span class="ml-3 text-sm font-medium {commentsNotifications ? 'text-primary' : 'text-gray-500'}" style="font-family: 'Space Grotesk', sans-serif;">
									{commentsNotifications ? 'Active' : 'Inactive'}
								</span>
							</label>
						</div>

						<!-- Likes Notification -->
						<div class="flex items-center justify-between pb-6 border-b border-gray-200">
							<div class="flex-1">
								<h4 class="text-base font-semibold mb-1" style="font-family: 'Space Grotesk', sans-serif;">Likes</h4>
								<p class="text-sm text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">
									These are notifications for likes on your posts and replies to your comments.
								</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer ml-4">
								<input
									type="checkbox"
									bind:checked={likesNotifications}
									class="sr-only peer"
								/>
								<div class="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
								<span class="ml-3 text-sm font-medium {likesNotifications ? 'text-primary' : 'text-gray-500'}" style="font-family: 'Space Grotesk', sans-serif;">
									{likesNotifications ? 'Active' : 'Inactive'}
								</span>
							</label>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="mt-6 flex justify-end">
						<button
							type="submit"
							disabled={loading}
							class="px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded font-medium disabled:opacity-50"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							{loading ? 'Updating...' : 'Update Info'}
						</button>
					</div>
				</form>
			</div>
		{/if}
	</div>
</div>
