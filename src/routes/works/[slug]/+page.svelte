<script lang="ts">
	import PublicHeader from '$lib/components/PublicHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CTASection from '$lib/components/CTASection.svelte';
</script>

<PublicHeader />

<!-- Article Detail Page -->
<section class="py-16 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1px, transparent 1px); background-size: 20px 20px;">
	<div class="container mx-auto px-4 max-w-4xl">
		<!-- Featured Image and Article Header -->
		<div class="mb-8">
			<div class="h-96 bg-gray-200 mb-6"></div>
			<div class="flex flex-col md:flex-row md:items-start gap-6">
				<div class="flex-1">
					<h1 class="text-4xl font-bold text-black mb-4" style="font-weight: 900;">Title Here</h1>
					<p class="text-gray-600 mb-4">
						New Zealand is famous for its breathtaking hiking trails that wind and weave their way through its beautiful landscapes. (Summary)
					</p>
					<div class="flex items-center gap-4 mb-4">
						<span class="px-3 py-1 text-sm" style="background-color: #fdf0e6; color: rgb(255 107 53); font-weight: 900;">Economy</span>
						<div class="flex items-center gap-2">
							<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
							<div>
								<div style="color: black; font-weight: 900;">Olivia Rhye</div>
								<div class="text-gray-500 text-xs">20 Jan 2025</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Article Content -->
		<article class="prose max-w-none">
			<!-- Introduction Section -->
			<h2 class="text-2xl font-bold text-black mb-4" style="font-weight: 900;">Introduction</h2>
			<p class="text-gray-600 mb-4">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<p class="text-gray-600 mb-8">
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			
			<!-- Second Image -->
			<div class="h-96 bg-gray-200 mb-8"></div>
			
			<!-- Article Body Continued -->
			<p class="text-gray-600 mb-6">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
			
			<!-- Block Quote -->
			<blockquote class="border-l-4 border-primary pl-6 italic text-gray-700 mb-6 my-8">
				<p class="mb-2">
					"In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear."
				</p>
				<cite class="text-sm text-gray-500 not-italic">- Olivia Rhye, Product Designer</cite>
			</blockquote>
			
			<p class="text-gray-600 mb-6">
				Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
			</p>
			<p class="text-gray-600 mb-8">
				Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
			</p>
			
			<!-- Software and tools Section -->
			<h2 class="text-2xl font-bold text-black mb-4" style="font-weight: 900;">Software and tools</h2>
			<p class="text-gray-600 mb-4">
				Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
			</p>
			<p class="text-gray-600 mb-8">
				Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
			</p>
			
			<!-- Other resources Section -->
			<h2 class="text-2xl font-bold text-black mb-4" style="font-weight: 900;">Other resources</h2>
			<p class="text-gray-600 mb-4">
				At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
			</p>
			<ol class="list-decimal list-inside space-y-2 mb-8 text-gray-600">
				<li>Lectus id duis vitae porttitor enim gravida morbi.</li>
				<li>Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</li>
				<li>Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</li>
			</ol>
			
			<!-- Third Image -->
			<div class="h-96 bg-gray-200 mb-8"></div>
			
			<!-- More Content -->
			<p class="text-gray-600 mb-6">
				Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
			</p>
			<p class="text-gray-600 mb-8">
				Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
			</p>
			
			<!-- Conclusion Section -->
			<h2 class="text-2xl font-bold text-black mb-4" style="font-weight: 900;">Conclusion</h2>
			<p class="text-gray-600 mb-4">
				Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
			</p>
			<p class="text-gray-600 mb-4">
				Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
			</p>
			<p class="text-gray-600 mb-8">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
			
			<!-- Like and Share -->
			<div class="flex items-center gap-4 mb-12 pt-8 border-t border-black">
				<button class="flex items-center gap-2 px-4 py-2 border border-black hover:bg-gray-100 transition-colors">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
					</svg>
					Like
				</button>
				<button class="flex items-center gap-2 px-4 py-2 border border-black hover:bg-gray-100 transition-colors">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
					</svg>
					Copy link
				</button>
				<div class="flex gap-2">
					<button class="p-2 border border-black hover:bg-gray-100 transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
						</svg>
					</button>
					<button class="p-2 border border-black hover:bg-gray-100 transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
						</svg>
					</button>
					<button class="p-2 border border-black hover:bg-gray-100 transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
							<circle cx="4" cy="4" r="2"/>
						</svg>
					</button>
				</div>
			</div>
		</article>
		
		<!-- Comments Section -->
		<div class="mb-12">
			<h2 class="text-2xl font-bold text-black mb-6" style="font-weight: 900;">Comments (20)</h2>
			<div class="space-y-6 mb-6">
				<!-- Comment 1 -->
				<div class="flex gap-4">
					<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
					<div class="flex-1">
						<div class="flex justify-between items-start mb-2">
							<div>
								<div style="color: black; font-weight: 900;">Phoenix Baker</div>
								<div class="text-gray-500 text-xs">Friday 2:20pm</div>
							</div>
						</div>
						<p class="text-gray-600">
							Hey Olivia, can you please review the latest design when you can?
						</p>
					</div>
				</div>
				<!-- Comment 2 -->
				<div class="flex gap-4">
					<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
					<div class="flex-1">
						<div class="flex justify-between items-start mb-2">
							<div>
								<div style="color: black; font-weight: 900;">Phoenix Baker</div>
								<div class="text-gray-500 text-xs">Friday 2:20pm</div>
							</div>
						</div>
						<p class="text-gray-600">
							Hey Olivia, can you please review the latest design when you can?
						</p>
					</div>
				</div>
				<!-- Comment 3 -->
				<div class="flex gap-4">
					<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
					<div class="flex-1">
						<div class="flex justify-between items-start mb-2">
							<div>
								<div style="color: black; font-weight: 900;">Phoenix Baker</div>
								<div class="text-gray-500 text-xs">Friday 2:20pm</div>
							</div>
						</div>
						<p class="text-gray-600">
							Hey Olivia, can you please review the latest design when you can?
						</p>
					</div>
				</div>
				<!-- Comment 4 -->
				<div class="flex gap-4">
					<img src="/user-icon.png" alt="User" class="rounded-full" style="width: 3rem; height: 3rem;" />
					<div class="flex-1">
						<div class="flex justify-between items-start mb-2">
							<div>
								<div style="color: black; font-weight: 900;">Phoenix Baker</div>
								<div class="text-gray-500 text-xs">Friday 2:20pm</div>
							</div>
						</div>
						<p class="text-gray-600">
							Hey Olivia, can you please review the latest design when you can?
						</p>
					</div>
				</div>
			</div>
			<button class="w-full py-2 border border-black hover:bg-gray-100 transition-colors mb-6">
				More
			</button>
			<div class="flex gap-3">
				<input 
					type="text" 
					placeholder="Add comment..." 
					class="flex-1 px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<button class="px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors font-medium flex items-center gap-2">
					Comment
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg);">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
					</svg>
				</button>
			</div>
		</div>
		
		<!-- Similar Works Section -->
		<div class="mb-12">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold text-black" style="font-weight: 900;">Similar Works</h2>
				<a href="/works" class="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary-dark transition-colors font-medium">
					View all
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg);">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
					</svg>
				</a>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
				<!-- Similar Work Card 1 -->
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
							<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Economy</span>
						</div>
					</div>
				</div>
				<!-- Similar Work Card 2 -->
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
							<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Economy</span>
						</div>
					</div>
				</div>
				<!-- Similar Work Card 3 -->
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
							<span class="px-3 py-1 text-xs" style="background-color: #fdf0e6; color: rgb(255 107 53); margin: 0; font-weight: 900;">Economy</span>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-center gap-4">
				<button class="px-4 py-2 bg-white border border-black text-black hover:bg-gray-100 transition-colors font-medium">
					← Previous
				</button>
				<button class="px-4 py-2 bg-white border border-black text-black hover:bg-gray-100 transition-colors font-medium">
					Next →
				</button>
			</div>
		</div>
	</div>
</section>

<CTASection />
<Footer />
