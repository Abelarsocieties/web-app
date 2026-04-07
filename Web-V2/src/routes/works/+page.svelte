<script lang="ts">
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CTASection from '$lib/components/CTASection.svelte';
</script>

<!-- <PublicHeader /> -->

<!-- Works Page -->
<section class="py-16 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1.5px, transparent 1px); background-size: 20px 20px;">
	<div class="container mx-auto px-4">
		<!-- Page Title -->
		<h1 class="text-4xl font-bold text-gray-800 mb-8" style="font-weight: 900;">Works</h1>
		
		<!-- Tabs -->
		<div class="flex gap-4 mb-6 border-b border-black">
			<button class="px-4 py-2 border-b-2 border-primary text-primary font-medium" style="border-bottom-width: 3px;">
				Articles
			</button>
			<button class="px-4 py-2 text-gray-600 hover:text-primary transition-colors">
				Proposals
			</button>
			<button class="px-4 py-2 text-gray-600 hover:text-primary transition-colors">
				Research Papers
			</button>
		</div>
		
		<!-- Filters and Search -->
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
			<!-- Category Filters -->
			<div class="flex flex-wrap gap-2">
				<button class="px-4 py-2 bg-primary text-white font-medium">Technology</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Energy</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Business</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Art</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Aviation</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Topic here</button>
			</div>
			
			<!-- Search Bar -->
			<div class="flex gap-3">
				<div class="relative">
					<div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
					<input 
						type="text" 
						placeholder="Search item or topic" 
						class="pl-12 pr-4 py-2 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-colors font-medium">
					Search
				</button>
			</div>
		</div>
		
		<!-- Works Grid or Empty State -->
		{#if false}
			<!-- Empty State (shown when no works match filter) -->
			<!-- Set condition to true when implementing filter logic and no results found -->
			<div class="flex flex-col items-center justify-center py-20 mb-12 animate-fade-in">
				<img src="/open-book.png" alt="No works found" class="w-32 h-32 mb-6 opacity-50" />
				<h3 class="text-2xl font-bold text-gray-800 mb-2" style="font-weight: 900;">No works found</h3>
				<p class="text-gray-600">Try adjusting your filters or search terms.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
			<!-- Work Card 1 -->
			<a href="/works/article-1" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			<a href="/works/article-2" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			
			<!-- Work Card 3 -->
			<a href="/works/article-3" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			
			<!-- Work Card 4 -->
			<a href="/works/article-4" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			
			<!-- Work Card 5 -->
			<a href="/works/article-5" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			<a href="/works/article-6" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			
			<!-- Work Card 7 -->
			<a href="/works/article-7" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			
			<!-- Work Card 8 -->
			<a href="/works/article-8" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
			
			<!-- Work Card 9 -->
			<a href="/works/article-9" class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow block" style="padding: 10px;">
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
		{/if}
		
		<!-- Pagination -->
		<div class="flex justify-between items-center mb-12">
			<button class="px-4 py-2 bg-white border border-black text-black hover:bg-gray-100 transition-colors font-medium">
				← Previous
			</button>
			<div class="flex gap-2 items-center">
				<button class="px-3 py-1 bg-primary text-white font-medium">1</button>
				<button class="px-3 py-1 text-gray-700 hover:text-primary transition-colors">2</button>
				<span class="px-2 text-gray-500">...</span>
				<button class="px-3 py-1 text-gray-700 hover:text-primary transition-colors">7</button>
				<button class="px-3 py-1 text-gray-700 hover:text-primary transition-colors">8</button>
				<button class="px-3 py-1 text-gray-700 hover:text-primary transition-colors">9</button>
				<button class="px-3 py-1 text-gray-700 hover:text-primary transition-colors">10</button>
			</div>
			<button class="px-4 py-2 bg-white border border-black text-black hover:bg-gray-100 transition-colors font-medium">
				Next →
			</button>
		</div>
	</div>
</section>

<CTASection />