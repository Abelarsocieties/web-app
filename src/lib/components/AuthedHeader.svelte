<script lang="ts">
	// AuthedHeader component - dark variant with user pill + submit button like Figma
	// TODO: Implement dark variant with user pill and submit button based on Figma design
</script>

<header class="bg-gray-900 text-white border-b border-gray-800">
	<nav class="container mx-auto px-4 py-4">
		<div class="flex items-center justify-between">
			<a href="/app/home" class="text-2xl font-bold">Abelar</a>
			<div class="flex items-center gap-4">
				<a href="/app/submit" class="bg-primary hover:bg-primary-dark px-4 py-2 rounded">
					Submit
				</a>
				<!-- User pill placeholder -->
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-full bg-gray-700"></div>
					<span>User</span>
				</div>
			</div>
		</div>
	</nav>
</header>
