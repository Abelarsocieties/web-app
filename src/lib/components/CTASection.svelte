<script lang="ts">
	// CTA Section Component - Reusable across pages
</script>

<section class="py-16 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1px, transparent 1px); background-size: 20px 20px; border-top: 1px solid #000000;">
	<div class="container mx-auto px-4">
		<div class="grid md:grid-cols-2 gap-0">
			<!-- Join Abelar Card -->
			<div class="bg-white p-8 border border-black">
				<h3 class="text-2xl font-bold text-black mb-4" style="font-weight: 900;">Join Abelar as a contributor!</h3>
				<p class="text-gray-600 mb-6">
					Join over 20 authors and share your amazing work with the world on science, technology, and economic progress in Africa.
				</p>
				<div class="flex flex-col sm:flex-row gap-3">
					<button class="px-6 py-3 bg-white border border-black text-black hover:bg-gray-100 transition-colors font-medium">
						Get Started
					</button>
					<button class="px-6 py-3 bg-black text-white hover:bg-gray-900 transition-colors font-medium">
						Create a post
					</button>
				</div>
			</div>
			
			<!-- Get Updates Card -->
			<div class="p-8 border border-black relative" style="background-color: #fdf0e6;">
				<!-- Decorative elements -->
				<div class="absolute top-0 left-0 w-full h-4 overflow-hidden">
					<img src="/vector-6.png" alt="" class="w-full h-full object-contain" />
				</div>
				<div class="absolute bottom-0 left-0 w-full h-4 overflow-hidden">
					<img src="/vector-5.png" alt="" class="w-full h-full object-contain" />
				</div>
				<div class="relative z-10">
					<h3 class="text-2xl font-bold text-black mb-4" style="font-weight: 900;">Get Updates</h3>
					<p class="text-gray-600 mb-6">
						Stay up to date with our latest updates.
					</p>
					<div class="flex flex-col sm:flex-row gap-3">
						<input 
							type="email" 
							placeholder="Email" 
							class="flex-1 px-4 py-3 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						<button class="px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-colors font-medium">
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
