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

<!-- Hero Section -->
<section class="relative min-h-[600px] flex items-center justify-center overflow-hidden">
	<!-- Background Image with Overlay -->
	<div class="absolute inset-0 z-0">
		<img 
			src="/hero-bg.jpg" 
			alt="Hero background" 
			class="w-full h-full object-cover transition-all duration-1000"
			style="filter: grayscale(100%);"
		/>
		<div class="absolute inset-0 transition-opacity duration-500" style="background-color: #16181FCC;"></div>
	</div>
	
	<!-- Hero Content -->
	<div class="relative z-20 container mx-auto px-4 py-16 text-center animate-fade-in">
		<!-- <p class="mb-2 text-sm animate-fade-in-up" style="color: #ACACAC; animation-delay: 0.1s;">Welcome to</p> -->
		<h1 
			class="text-6xl md:text-7xl font-yellowtail text-white mb-4 animate-fade-in-up"
			style="font-family: 'Space Grotesk', cursive; font-weight: 400; font-size: 64px; line-height: 60px; letter-spacing: -0.02em; animation-delay: 0.2s;"
		>
			Abelar programs
		</h1>
		<p class="mb-8 text-lg max-w-2xl mx-auto animate-fade-in-up" style="color: #ACACAC; animation-delay: 0.3s;">
			We host events to serve as a proof of concept for the ideas that we crowd source. Join us to translate Ideas into Impact
		</p>
	</div>
	
	<!-- Vector Graphics at Bottom -->
	<img src="/left-vector.png" alt="" class="absolute left-0 bottom-[-130px] z-10 object-contain transition-all duration-1000 hover:scale-105" style="height: 30rem;" />
	<img src="/right-vector.png" alt="" class="absolute right-0 bottom-0 z-10 object-contain h-64 transition-all duration-1000 hover:scale-105" />
</section>

<!-- Program Types Section -->
<section class="py-16">
	<div class="container mx-auto px-4">
		<div class="grid md:grid-cols-3 gap-6">
			<!-- Hackathon Card -->
			<div class="border border-black hover-lift transition-all duration-300 animate-fade-in" style="background-color: #fdf0e6; padding: 3rem 2rem; min-height: 280px;">
				<div class="mb-4">
					<div class="w-8 h-8 flex items-center justify-center text-2xl font-bold transition-smooth text-[3rem]" style="color: rgb(255 107 53);">
						+
					</div>
				</div>
				<h3 class="text-xl font-bold text-black mb-10" style="font-weight: 900;">Hackathon</h3>
				<p class="text-gray-600" style="font-size: 18px; line-height: 1.5;">
					Join our innovation challenges and build solutions for Africa's pressing challenges.
				</p>
			</div>
			
			<!-- Research Sprint Card -->
			<div class="border border-black hover-lift transition-all duration-300 animate-fade-in" style="background-color: #fdf0e6; padding: 3rem 2rem; min-height: 280px; animation-delay: 0.1s;">
				<div class="mb-4">
					<div class="w-8 h-8 flex items-center justify-center text-2xl font-bold transition-smooth text-[3rem]" style="color: rgb(255 107 53);">
						+
					</div>
				</div>
				<h3 class="text-xl font-bold text-black mb-10" style="font-weight: 900;">Research Sprint</h3>
				<p class="text-gray-600" style="font-size: 18px; line-height: 1.5;">
					Accelerate your research with intensive sprint programs designed for rapid innovation.
				</p>
			</div>
			
			<!-- Learning Sessions Card -->
			<div class="border border-black hover-lift transition-all duration-300 animate-fade-in" style="background-color: #fdf0e6; padding: 3rem 2rem; min-height: 280px; animation-delay: 0.2s;">
				<div class="mb-4">
					<div class="w-8 h-8 flex items-center justify-center text-2xl font-bold transition-smooth text-[3rem]" style="color: rgb(255 107 53);">
						+
					</div>
				</div>
				<h3 class="text-xl font-bold text-black mb-10" style="font-weight: 900;">Learning Sessions</h3>
				<p class="text-gray-600" style="font-size: 18px; line-height: 1.5;">
					Enhance your skills through structured learning programs and expert-led workshops.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Programs Page -->
<section class="pb-16 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1.5px, transparent 1px); background-size: 20px 20px;">
	<div class="container mx-auto px-4">
		<!-- Page Title -->
		<h1 class="text-4xl font-bold text-gray-800 mb-8" style="font-weight: 900;">Our Programs</h1>
		
		<!-- Filters and Search -->
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
			<!-- Category Filters -->
			<div class="flex flex-wrap gap-2">
				<button class="px-4 py-2 bg-primary text-white font-medium transition-all duration-300 btn-press">All Programs</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Technology</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Education</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Research</button>
				<button class="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 btn-press">Innovation</button>
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
						placeholder="Search programs" 
						class="pl-12 pr-4 py-2 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
					/>
				</div>
				<button class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-medium btn-press shadow-md hover:shadow-lg">
					Search
				</button>
			</div>
		</div>
		
		<!-- Programs Grid or Empty State -->
		{#if false}
			<!-- Empty State (shown when no programs match filter) -->
			<div class="flex flex-col items-center justify-center py-20 mb-12 animate-fade-in">
				<img src="/open-book.png" alt="No programs found" class="w-32 h-32 mb-6 opacity-50" />
				<h3 class="text-2xl font-bold text-gray-800 mb-2" style="font-weight: 900;">No programs found</h3>
				<p class="text-gray-600">Try adjusting your filters or search terms.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				<!-- Program Card 1 -->
				<a href="/programs/program-1" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 6 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 20 Feb 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-02-20')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 20 Feb 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Program Card 2 -->
				<a href="/programs/program-2" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 3 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 15 Mar 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-03-15')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 15 Mar 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Program Card 3 -->
				<a href="/programs/program-3" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 12 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 30 Apr 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-04-30')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 30 Apr 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Program Card 4 -->
				<a href="/programs/program-4" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 4 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 10 May 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-05-10')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 10 May 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Program Card 5 -->
				<a href="/programs/program-5" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 8 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 25 Jun 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-07-05')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 5 Jul 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Program Card 6 -->
				<a href="/programs/program-6" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 5 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 5 Jul 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-08-20')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 20 Aug 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Program Card 7 -->
				<a href="/programs/program-7" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 9 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 20 Aug 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-09-10')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
							{:else}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: #fdf0e6; color: black; margin: 0; font-weight: 900;">Deadline: 10 Sep 2025</span>
							{/if}
						</div>
					</div>
				</a>
				
				<!-- Program Card 8 -->
				<a href="/programs/program-8" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 6 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 10 Sep 2025</div>
								</div>
							</div>
							<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Active</span>
						</div>
					</div>
				</a>
				
				<!-- Program Card 9 -->
				<a href="/programs/program-9" class="bg-white border border-black overflow-hidden hover-lift transition-all duration-300 block" style="padding: 10px;">
					<div class="h-48 bg-gray-200"></div>
					<div class="p-4" style="padding-bottom: 0;">
						<h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
							Program Title Here
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg); color: black;">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
							</svg>
						</h3>
						<p class="text-gray-600 text-sm border-b border-black" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem;">
							Description of the program and what it offers to participants...
						</p>
						<div class="flex items-center justify-between text-sm" style="margin: 0; padding: 0;">
							<div class="flex items-center gap-2" style="margin: 0; padding: 0;">
								<div style="margin: 0; padding: 0;">
									<div style="margin: 0; padding: 0; color: black; font-weight: 900;">Duration: 7 months</div>
									<div class="text-gray-500 text-xs" style="margin: 0; padding: 0;">Deadline: 30 Oct 2025</div>
								</div>
							</div>
							{#if isDeadlinePassed('2025-10-30')}
								<span class="px-3 py-1 text-xs transition-smooth" style="background-color: black; color: white; margin: 0; font-weight: 900;">This event has been concluded</span>
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