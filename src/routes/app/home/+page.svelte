<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let activeTab = 'live';
	let activeSubTab = 'articles';
	let searchQuery = '';
	let currentPage = 1;
	let hasMore = true;
	let userEmail = '';

	onMount(() => {
		// Get user email
		if (data.user?.email) {
			userEmail = data.user.email;
		}
	});

	function handleSearch() {
		// TODO: Implement search functionality
		console.log('Searching for:', searchQuery);
	}

	function loadMore() {
		// TODO: Implement pagination
		currentPage++;
		console.log('Loading page:', currentPage);
	}
</script>

<div class="min-h-screen bg-white">
	<!-- User Profile Banner -->
	<div class="relative bg-gray-900 py-16 overflow-hidden">
		<!-- Background Pattern with Orange Glow -->
		<div class="absolute inset-0 opacity-20">
			<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
						<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EF6509" stroke-width="1"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
		</div>
		
		<div class="container mx-auto px-4 relative z-10">
			<div class="flex flex-col items-center">
				<!-- User Avatar with Plus Icon -->
				<div class="relative mb-4">
					{#if data.user?.avatar_url}
						<img src={data.user.avatar_url} alt={data.user.name || 'User'} class="w-32 h-32 rounded-full border-4 border-gray-700" />
					{:else}
						<div class="w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center">
							<svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
					{/if}
					<!-- Plus Icon -->
					<button class="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full border-4 border-gray-900 flex items-center justify-center hover:bg-primary-dark transition-colors duration-300">
						<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
						</svg>
					</button>
				</div>
				
				<!-- User Name -->
				<h1 class="text-4xl font-bold text-white mb-2" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
					{data.user?.name || 'User'}
				</h1>
				
				<!-- User Email -->
				<p class="text-gray-300 text-lg" style="font-family: 'Space Grotesk', sans-serif;">
					{userEmail || 'email@gmail.com'}
				</p>
			</div>
		</div>
	</div>

	<!-- Main Navigation Tabs -->
	<div class="border-b border-gray-200 bg-white">
		<div class="container mx-auto px-4">
			<div class="flex gap-0">
				<button
					on:click={() => activeTab = 'live'}
					class="px-6 py-4 font-semibold transition-all duration-300 {activeTab === 'live' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}"
					style="font-family: 'Space Grotesk', sans-serif;"
				>
					Live Works
				</button>
				<button
					on:click={() => activeTab = 'submitted'}
					class="px-6 py-4 font-semibold transition-all duration-300 border-l border-gray-200 {activeTab === 'submitted' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}"
					style="font-family: 'Space Grotesk', sans-serif;"
				>
					Submitted Works
				</button>
				<button
					on:click={() => activeTab = 'liked'}
					class="px-6 py-4 font-semibold transition-all duration-300 border-l border-gray-200 {activeTab === 'liked' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}"
					style="font-family: 'Space Grotesk', sans-serif;"
				>
					Liked Works
				</button>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="container mx-auto px-4 py-8">
		{#if activeTab === 'live'}
			<!-- Live Works Section -->
			<div class="mb-8">
				<!-- Heading and Sub-tabs -->
				<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
					<div class="flex flex-col gap-4">
						<h2 class="text-3xl font-bold text-gray-900" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
							Live Works
						</h2>
						
						<!-- Sub-tabs -->
						<div class="flex gap-6">
							<button
								on:click={() => activeSubTab = 'articles'}
								class="text-lg font-semibold transition-all duration-300 relative pb-2 {activeSubTab === 'articles' ? 'text-primary' : 'text-gray-600'}"
								style="font-family: 'Space Grotesk', sans-serif;"
							>
								Articles
								{#if activeSubTab === 'articles'}
									<span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
								{/if}
							</button>
							<button
								on:click={() => activeSubTab = 'proposals'}
								class="text-lg font-semibold transition-all duration-300 relative pb-2 {activeSubTab === 'proposals' ? 'text-primary' : 'text-gray-600'}"
								style="font-family: 'Space Grotesk', sans-serif;"
							>
								Proposals
								{#if activeSubTab === 'proposals'}
									<span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
								{/if}
							</button>
							<button
								on:click={() => activeSubTab = 'research'}
								class="text-lg font-semibold transition-all duration-300 relative pb-2 {activeSubTab === 'research' ? 'text-primary' : 'text-gray-600'}"
								style="font-family: 'Space Grotesk', sans-serif;"
							>
								Research Papers
								{#if activeSubTab === 'research'}
									<span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
								{/if}
							</button>
						</div>
					</div>
					
					<!-- Search Bar -->
					<div class="flex gap-2">
						<div class="relative flex-1">
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search item or topic"
								class="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-primary transition-colors duration-300"
								style="font-family: 'Space Grotesk', sans-serif;"
								on:keydown={(e) => e.key === 'Enter' && handleSearch()}
							/>
							<svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<button
							on:click={handleSearch}
							class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded btn-press"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							Search
						</button>
					</div>
				</div>

				<!-- Works Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					<!-- Work Card 1 -->
					<a href="/works/article-1" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
						<div class="h-48 bg-gray-200"></div>
						<div class="p-4" style="padding-bottom: 0;">
							<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
								Title Here
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
								</svg>
							</h3>
							<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
								How do you create compelling presentations that wow your colleagues and impress your managers..
							</p>
							<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
								<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
									<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
									<div style="margin: 0; padding: 0;">
										<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Ade Adewale / Anthony Faraday</div>
										<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">20 Jan 2025</div>
									</div>
								</div>
								<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Economy</span>
							</div>
						</div>
					</a>
					
					<!-- Work Card 2 -->
					<a href="/works/article-2" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
						<div class="h-48 bg-gray-200"></div>
						<div class="p-4" style="padding-bottom: 0;">
							<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
								Title Here
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
								</svg>
							</h3>
							<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
								How do you create compelling presentations that wow your colleagues and impress your managers..
							</p>
							<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
								<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
									<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
									<div style="margin: 0; padding: 0;">
										<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Ade Adewale / Anthony Faraday</div>
										<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">20 Jan 2025</div>
									</div>
								</div>
								<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Technology</span>
							</div>
						</div>
					</a>
					
					<!-- Work Card 3 -->
					<a href="/works/article-3" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
						<div class="h-48 bg-gray-200"></div>
						<div class="p-4" style="padding-bottom: 0;">
							<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
								Title Here
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
								</svg>
							</h3>
							<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
								How do you create compelling presentations that wow your colleagues and impress your managers..
							</p>
							<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
								<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
									<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
									<div style="margin: 0; padding: 0;">
										<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Ade Adewale / Anthony Faraday</div>
										<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">20 Jan 2025</div>
									</div>
								</div>
								<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Energy</span>
							</div>
						</div>
					</a>
					
					<!-- Work Card 4 -->
					<a href="/works/article-4" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
						<div class="h-48 bg-gray-200"></div>
						<div class="p-4" style="padding-bottom: 0;">
							<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
								Title Here
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
								</svg>
							</h3>
							<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
								How do you create compelling presentations that wow your colleagues and impress your managers..
							</p>
							<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
								<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
									<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
									<div style="margin: 0; padding: 0;">
										<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Ade Adewale / Anthony Faraday</div>
										<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">20 Jan 2025</div>
									</div>
								</div>
								<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Technology</span>
							</div>
						</div>
					</a>
					
					<!-- Work Card 5 -->
					<a href="/works/article-5" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
						<div class="h-48 bg-gray-200"></div>
						<div class="p-4" style="padding-bottom: 0;">
							<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
								Title Here
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
								</svg>
							</h3>
							<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
								How do you create compelling presentations that wow your colleagues and impress your managers..
							</p>
							<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
								<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
									<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
									<div style="margin: 0; padding: 0;">
										<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Ade Adewale / Anthony Faraday</div>
										<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">20 Jan 2025</div>
									</div>
								</div>
								<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Economy</span>
							</div>
						</div>
					</a>
					
					<!-- Work Card 6 -->
					<a href="/works/article-6" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
						<div class="h-48 bg-gray-200"></div>
						<div class="p-4" style="padding-bottom: 0;">
							<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
								Title Here
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
								</svg>
							</h3>
							<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
								How do you create compelling presentations that wow your colleagues and impress your managers..
							</p>
							<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
								<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
									<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
									<div style="margin: 0; padding: 0;">
										<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Ade Adewale / Anthony Faraday</div>
										<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">20 Jan 2025</div>
									</div>
								</div>
								<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Technology</span>
							</div>
						</div>
					</a>
				</div>

				<!-- Load More Button -->
				{#if hasMore}
					<div class="flex justify-center">
						<button
							on:click={loadMore}
							class="px-8 py-3 bg-white border-2 border-black text-gray-900 hover:bg-gray-50 transition-all duration-300 rounded btn-press"
							style="font-family: 'Space Grotesk', sans-serif; font-weight: 600;"
						>
							Load More
						</button>
					</div>
				{/if}
			</div>
		{:else if activeTab === 'submitted'}
			<!-- Submitted Works Section -->
			<div class="text-center py-20">
				<p class="text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">Your submitted works will appear here.</p>
			</div>
		{:else if activeTab === 'liked'}
			<!-- Liked Works Section -->
			<div class="text-center py-20">
				<p class="text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">Your liked works will appear here.</p>
			</div>
		{/if}
	</div>
</div>
