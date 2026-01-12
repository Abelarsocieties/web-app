<script lang="ts">
	import CTASection from '$lib/components/CTASection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let currentPage = 1;
	const totalPages = 10;
	const itemsPerPage = 9;

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			// Scroll to top when page changes
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	function getPageNumbers() {
		const pages: (number | string)[] = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push('...');
				for (let i = totalPages - 1; i <= totalPages; i++) pages.push(i);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, 2);
				pages.push('...');
				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1, 2);
				pages.push('...');
				for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
				pages.push('...');
				pages.push(totalPages - 1, totalPages);
			}
		}
		return pages;
	}

	function isDeadlinePassed(deadlineDate: string): boolean {
		const deadline = new Date(deadlineDate);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return deadline < today;
	}
</script>

<!-- Opportunities Page -->
<section class="py-16 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1.5px, transparent 1px); background-size: 20px 20px;">
	<div class="container mx-auto px-4">
		<!-- Page Title -->
		<h1 class="text-4xl font-bold text-gray-800 mb-8" style="font-weight: 900;">Opportunities</h1>
		
		<!-- Filters and Search -->
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
			<!-- Category Filters -->
			<div class="flex flex-wrap gap-2">
				<button class="px-4 py-2 bg-primary text-white font-medium transition-all duration-300 btn-press">All Opportunities</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Grants</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Fellowships</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Scholarships</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Awards</button>
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
						placeholder="Search opportunities" 
						class="pl-12 pr-4 py-2 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
					/>
				</div>
				<button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium btn-press shadow-md hover:shadow-lg">
					Search
				</button>
			</div>
		</div>
		
		<!-- Opportunities Grid or Empty State -->
		{#if false}
			<!-- Empty State (shown when no opportunities match filter) -->
			<div class="flex flex-col items-center justify-center py-20 mb-12 animate-fade-in">
				<img src="/open-book.png" alt="No opportunities found" class="w-32 h-32 mb-6 opacity-50" />
				<h3 class="text-2xl font-bold text-gray-800 mb-2" style="font-weight: 900;">No opportunities found</h3>
				<p class="text-gray-600">Try adjusting your filters or search terms.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				<!-- Opportunity Card 1 -->
				<a href="/opportunities/opp-1" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $10,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 20 Feb 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-02-20')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 20 Feb 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 2 -->
				<a href="/opportunities/opp-2" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $5,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 15 Mar 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-03-15')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 15 Mar 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 3 -->
				<a href="/opportunities/opp-3" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $15,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 30 Apr 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-04-30')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 30 Apr 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 4 -->
				<a href="/opportunities/opp-4" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $8,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 10 May 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-05-10')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 10 May 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 5 -->
				<a href="/opportunities/opp-5" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $12,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 25 Jun 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-06-25')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 25 Jun 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 6 -->
				<a href="/opportunities/opp-6" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $7,500</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 5 Jul 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-07-05')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 5 Jul 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 7 -->
				<a href="/opportunities/opp-7" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $20,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 20 Aug 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-08-20')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 20 Aug 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 8 -->
				<a href="/opportunities/opp-8" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $6,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 10 Sep 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-09-10')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 10 Sep 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Opportunity Card 9 -->
				<a href="/opportunities/opp-9" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Opportunity Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the opportunity and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Amount: $9,000</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 30 Oct 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-10-30')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This opportunity has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 30 Oct 2025</span>
							{/if}
						</div>
					</div>
				</a>
			</div>
		{/if}
		
		<!-- Pagination - Centered -->
		<div class="flex justify-between items-center mb-12">
			<button 
				on:click={() => goToPage(currentPage - 1)}
				disabled={currentPage === 1}
				class="px-4 py-2 bg-white border border-black text-black hover:bg-gray-100 transition-all duration-300 font-medium btn-press disabled:opacity-50 disabled:cursor-not-allowed"
			>
				← Previous
			</button>
			<div class="flex gap-2 items-center">
				{#each getPageNumbers() as pageNum}
					{#if typeof pageNum === 'number'}
						<button 
							on:click={() => goToPage(pageNum)}
							class="px-3 py-1 {currentPage === pageNum ? 'bg-primary text-white' : 'bg-white border border-black text-gray-700 hover:text-primary'} transition-all duration-300 font-medium btn-press"
						>
							{pageNum}
						</button>
					{:else}
						<span class="px-2 text-gray-500">...</span>
					{/if}
				{/each}
			</div>
			<button 
				on:click={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				class="px-4 py-2 bg-white border border-black text-black hover:bg-gray-100 transition-all duration-300 font-medium btn-press disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Next →
			</button>
		</div>
	</div>
</section>

<CTASection />
<Footer />
