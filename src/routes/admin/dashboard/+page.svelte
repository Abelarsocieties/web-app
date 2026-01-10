<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="py-16 bg-white min-h-screen">
	<div class="container mx-auto px-4">
		<h1 class="text-4xl font-bold mb-4" style="font-weight: 900;">Admin Dashboard</h1>
		<p class="text-gray-600 mb-8">Welcome, {data.user?.name || 'Admin'}!</p>
		
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			<a href="/admin/works" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Manage Works</h2>
				<p class="text-gray-600">View and manage all works</p>
			</a>
			<a href="/admin/submissions" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Review Submissions</h2>
				<p class="text-gray-600">Review pending submissions</p>
			</a>
			<a href="/admin/programs" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Manage Programs</h2>
				<p class="text-gray-600">Manage programs</p>
			</a>
			<a href="/admin/admins" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Manage Admins</h2>
				<p class="text-gray-600">Manage admin users</p>
			</a>
			<a href="/admin/settings" class="p-6 border border-black hover:shadow-lg transition-shadow">
				<h2 class="text-xl font-bold mb-2" style="font-weight: 900;">Settings</h2>
				<p class="text-gray-600">Admin settings</p>
			</a>
		</div>
	</div>
</section>

