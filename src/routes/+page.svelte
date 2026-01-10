<script lang="ts">
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import CTASection from '$lib/components/CTASection.svelte';
</script>

<PublicHeader />

<!-- Hero Section -->
<section class="relative min-h-[600px] flex items-center justify-center overflow-hidden">
	<!-- Background Image with Overlay -->
	<div class="absolute inset-0 z-0">
		<img 
			src="/hero-bg.jpg" 
			alt="Hero background" 
			class="w-full h-full object-cover"
			style="filter: grayscale(100%);"
		/>
		<div class="absolute inset-0" style="background-color: #16181FCC;"></div>
	</div>
	
	<!-- Hero Content -->
	<div class="relative z-20 container mx-auto px-4 py-16 text-center">
		<p class="mb-2 text-sm" style="color: #ACACAC;">Welcome to</p>
		<h1 
			class="text-6xl md:text-7xl font-yellowtail text-white mb-4"
			style="font-family: 'Yellowtail', cursive; font-weight: 400; font-size: 64px; line-height: 60px; letter-spacing: -0.02em;"
		>
			Abelar Africa!
		</h1>
		<p class="mb-8 text-lg max-w-2xl mx-auto" style="color: #ACACAC;">
			New Ideas And New Breakthroughs For Progress
		</p>
		
		<!-- Search Bar -->
		<div class="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
			<div class="flex-1 relative">
				<div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
				<input 
					type="text" 
					placeholder="Search author or topic" 
					class="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>
			<button class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
				Search
			</button>
		</div>
		
		<!-- Popular Tags -->
		<div class="flex flex-wrap items-center justify-center gap-3">
			<span class="text-gray-300 text-sm">Popular:</span>
			<a href="#" class="px-4 py-1 rounded-full text-sm transition-colors" style="background-color: #EF65091A; color: rgb(255 107 53);">Art</a>
			<a href="#" class="px-4 py-1 rounded-full text-sm transition-colors" style="background-color: #EF65091A; color: rgb(255 107 53);">Energy</a>
			<a href="#" class="px-4 py-1 rounded-full text-sm transition-colors" style="background-color: #EF65091A; color: rgb(255 107 53);">Technology</a>
			<a href="#" class="px-4 py-1 rounded-full text-sm transition-colors" style="background-color: #EF65091A; color: rgb(255 107 53);">Social</a>
		</div>
	</div>
	
	<!-- Vector Graphics at Bottom -->
	<img src="/left-vector.png" alt="" class="absolute left-0 bottom-0 z-10 object-contain" style="height: 30rem;" />
	<img src="/right-vector.png" alt="" class="absolute right-0 bottom-0 z-10 object-contain h-64" />
</section>

<!-- Featured Works Section -->
<section class="py-16 bg-white">
	<div class="container mx-auto px-4">
		<!-- <div class="flex justify-between items-center mb-8 pb-4 border-b border-black"> -->
		<div class="flex justify-between items-center mb-8 pb-4">
			<h2 class="text-4xl font-bold text-gray-800">Featured Works</h2>
			<a href="/works" class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
				View More
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg);">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
				</svg>
			</a>
		</div>
		
		<!-- Works Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- Work Card 1 -->
			<div class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow" style="padding: 10px;">
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
						<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0;font-weight: 900;">Economy</span>
					</div>
				</div>
			</div>
			
			<!-- Work Card 2 -->
			<div class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow" style="padding: 10px;">
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
						<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0;font-weight: 900;">Economy</span>
					</div>
				</div>
			</div>
			
			<!-- Work Card 3 -->
			<div class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow" style="padding: 10px;">
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
						<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0;font-weight: 900;">Economy</span>
					</div>
				</div>
			</div>
			
			<!-- Work Card 4 -->
			<div class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow" style="padding: 10px;">
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
						<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0;font-weight: 900;">Economy</span>
					</div>
				</div>
			</div>
			
			<!-- Work Card 5 -->
			<div class="bg-white border border-black overflow-hidden hover:shadow-lg transition-shadow" style="padding: 10px;">
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
						<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0;font-weight: 900;">Economy</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- About Abelar Section -->
<section class="py-16 bg-white" style="border-top: 1px solid #000000;">
	<div class="container mx-auto px-4">
		<div class="max-w-full mx-auto">
			<p class="text-sm mb-2 inline-block px-3 py-1" style="background-color: #FF6B35; color: white;border-radius: 10px;">About Abelar</p>
			<h2 class="font-bold text-gray-800 mb-4 mt-5" style="font-size: 48px;line-height:1">Driving Africa's Progress Through Ideas.</h2>
			<p class="text-gray-600 mb-6 leading-relaxed" style="font-family: 'Poppins', sans-serif; font-size: 20px;">
				Abelar Africa is a platform dedicated to fostering innovation and progress across the continent. We provide a space for thinkers, researchers, and creators to share their ideas, collaborate, and drive meaningful change. Through our community-driven approach, we aim to amplify African voices and showcase the brilliant minds shaping the future.
			</p>
			<button class="px-6 py-3 bg-gray-800 text-white hover:bg-gray-900 transition-colors font-medium">
				Learn More
			</button>
			
			<!-- Feature Cards -->
			<div class="grid md:grid-cols-2 gap-6 mt-12">
				<div class="bg-white p-6 border border-black" style="padding: 30px;">
					<div class="relative mb-4" style="width: 6rem; height: 3rem; margin-left: -20px; margin-right: auto;">
						<div class="absolute left-0 top-0 bg-white border border-black flex items-center justify-center" style="z-index: 2; width: 3rem; height: 3rem; transform: translateX(50%);">
							<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
						</div>
						<!-- Background div with icon-background.png - positioned on the right -->
						<div class="absolute right-0 top-0 w-full h-full" style="background-image: url('/icon-background.png'); background-size: cover; background-position: center; z-index: 1; width: 3.5rem; height: 3.5rem; top: -15px;right: 10px;"></div>
						<!-- Foreground div with icon - positioned on the left, overlapping halfway -->
						
					</div>
					<h3 class="text-xl font-bold text-black mb-2" style="font-weight: 900;">Create</h3>
					<p class="text-gray-600" style="font-size: 18px;line-height:1">
						Write and publish articles, proposals, or research ideas for review and approval.
					</p>
				</div>
				
				<div class="bg-white p-6 border border-black" style="padding: 30px;">
					<div class="relative mb-4" style="width: 6rem; height: 3rem; margin-left: -20px; margin-right: auto;">
						<div class="absolute left-0 top-0 bg-white border border-black flex items-center justify-center" style="z-index: 2; width: 3rem; height: 3rem; transform: translateX(50%);">
							<svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
						<!-- Background div with icon-background.png - positioned on the right -->
						<div class="absolute right-0 top-0 w-full h-full" style="background-image: url('/icon-background.png'); background-size: cover; background-position: center; z-index: 1; width: 3.5rem; height: 3.5rem; top: -15px;right: 10px;"></div>
						<!-- Foreground div with icon - positioned on the left, overlapping halfway -->
						
					</div>
					<h3 class="text-xl font-bold text-black mb-2" style="font-weight: 900;">Engage</h3>
					<p class="text-gray-600" style="font-size: 18px;line-height:1">
						Read, comment, and collaborate with other brilliant minds all in one community.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<CTASection />
