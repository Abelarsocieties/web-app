<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="py-16 bg-white min-h-screen">
	<div class="container mx-auto px-4">
		<h1 class="text-4xl font-bold mb-4" style="font-weight: 900;">Dashboard</h1>
		<p class="text-gray-600 mb-8">Welcome back, {data.user?.name || 'User'}!</p>
		
		<div class="grid md:grid-cols-3 gap-6">
			<a href="/app/submitted" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Submitted Works</h2>
				<p class="text-gray-600">View your submitted works</p>
			</a>
			<a href="/app/liked" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Liked Works</h2>
				<p class="text-gray-600">Works you've liked</p>
			</a>
			<a href="/app/drafted" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Draft Works</h2>
				<p class="text-gray-600">Your draft works</p>
			</a>
		</div>
	</div>
</section>

