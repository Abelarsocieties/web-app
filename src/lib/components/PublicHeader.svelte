<script lang="ts">
	// PublicHeader component
</script>

<header class="bg-white border-b" style="border-color:#000000;">
	<nav class="container mx-auto px-4" style="padding-top: 0.1rem; padding-bottom: 0.1rem;">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center">
				<img src="/main-icon.png" alt="Abelar" class="h-16" />
			</a>
			
			<!-- Navigation Links -->
			<div class="hidden md:flex items-center gap-0">
				<a href="/" class="px-4 py-2 text-gray-700 hover:text-primary transition-colors">Home</a>
				<div class="h-4 w-px bg-primary" style="transform: skewX(15deg);"></div>
				<a href="/works" class="px-4 py-2 text-gray-700 hover:text-primary transition-colors">Works</a>
				<div class="h-4 w-px bg-primary" style="transform: skewX(15deg);"></div>
				<a href="/programs" class="px-4 py-2 text-gray-700 hover:text-primary transition-colors">Programs</a>
				<div class="h-4 w-px bg-primary" style="transform: skewX(15deg);"></div>
				<a href="/about" class="px-4 py-2 text-gray-700 hover:text-primary transition-colors">About</a>
				<div class="h-4 w-px bg-primary" style="transform: skewX(15deg);"></div>
				<a href="/writing-guide" class="px-4 py-2 text-gray-700 hover:text-primary transition-colors">Writing Guide</a>
			</div>
			
			<!-- Action Buttons -->
			<div class="flex items-center gap-3">
				<a href="/support" class="px-4 py-2 border-2 border-black text-gray-700 hover:bg-primary hover:text-white transition-colors rounded">
					Contact Us
				</a>
				<a href="/app/submit" class="px-4 py-2 bg-primary text-white hover:bg-primary-dark transition-colors rounded">
					Submit Work
				</a>
			</div>
		</div>
	</nav>
</header>
