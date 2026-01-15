<script lang="ts">
	import CTASection from '$lib/components/CTASection.svelte';
</script>

<svelte:head>
	<title>Writing Guide | Abelar</title>
</svelte:head>

<!-- Main Content Section -->
<section class="py-20 bg-white" style="background-image: radial-gradient(circle, #e5e5e5 1.5px, transparent 1px); background-size: 40px 40px;">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<!-- Title -->
			<div class="text-center mb-12 animate-fade-in">
				<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
					WRITING FOR ABELAR PROGRESS
				</h1>
				<p class="text-gray-700 text-lg mb-4" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
					Abelar Progress is an idea-to-impact platform that enables the permissionless submission of articles within our focus areas. We invite researchers, inventors, scholars, and innovators to submit original, compelling ideas and arguments.
				</p>
				<p class="text-gray-700 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
					Below is our guide to writing for Abelar Progress.
				</p>
			</div>

			<!-- Our Writing Philosophy -->
			<div class="mb-12 animate-fade-in" style="animation-delay: 0.1s;">
				<div class="bg-white border-2 border-black p-8 md:p-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
						Our Writing Philosophy
					</h2>
					<p class="text-gray-700 mb-6 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
						Abelar Progress is an ideas-driven platform. When writing, focus on the ideas and the systems that enable or hinder the phenomenon you want to examine.
					</p>
					<ul class="space-y-4 mb-6" style="font-family: 'Space Grotesk', sans-serif;">
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Identify the bottlenecks preventing good ideas from becoming mainstream.</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Explore novel approaches that re-examine and improve the status quo.</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Include interoperable case studies that serve as proof-of-concept for your core idea.</span>
						</li>
					</ul>
					<p class="text-gray-700 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
						To understand the type of work we publish, we recommend reading through the guides: <a href="https://apolitical.co/solution-articles/en/unlock-the-potential-of-strategic-communication-6-tips-for-success" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium transition-colors duration-300">Apolitical on Strategic Communication</a>
					</p>
				</div>
			</div>

			<!-- Types of Articles We Publish -->
			<div class="mb-12 animate-fade-in" style="animation-delay: 0.2s;">
				<div class="bg-white border-2 border-black p-8 md:p-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
						Types of Articles We Publish
					</h2>

					<!-- Progress-Oriented Essays -->
					<div class="mb-8">
						<h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
							1. Progress-Oriented Essays
						</h3>
						<p class="text-gray-700 mb-4 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
							These are opinion-style essays offering strong, well-argued perspectives on progress-related topics.
						</p>
						<p class="text-gray-700 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
							An example of a scientific essay from Works In Progress is this: <a href="https://worksinprogress.co/issue/no-opioid-painkiller" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium transition-colors duration-300">No-opioid painkiller</a>
						</p>
					</div>

					<!-- Progress Research -->
					<div class="mb-8">
						<h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
							2. Progress Research
						</h3>
						<p class="text-gray-700 mb-6 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
							These articles are supported by analysis and, where possible, data visualisation. We recommend the following guidelines:
						</p>
						<ul class="space-y-3 mb-6" style="font-family: 'Space Grotesk', sans-serif;">
							<li class="flex items-start gap-3">
								<span class="text-primary font-bold mt-1">•</span>
								<span class="text-gray-700 text-lg" style="line-height: 1.7;"><strong>Introduction</strong> - Introduce your core idea.</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-primary font-bold mt-1">•</span>
								<span class="text-gray-700 text-lg" style="line-height: 1.7;"><strong>The Challenge</strong> - Define the problem and its context.</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-primary font-bold mt-1">•</span>
								<span class="text-gray-700 text-lg" style="line-height: 1.7;"><strong>The Solution</strong> - Present your proposed intervention or improvement.</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-primary font-bold mt-1">•</span>
								<span class="text-gray-700 text-lg" style="line-height: 1.7;"><strong>The Bottleneck</strong> - Explain what currently blocks progress and how to unblock them.</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-primary font-bold mt-1">•</span>
								<span class="text-gray-700 text-lg" style="line-height: 1.7;"><strong>The Action Plan & Proof of Concept</strong> - Provide actionable steps and real-world examples customised to your country or region</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-primary font-bold mt-1">•</span>
								<span class="text-gray-700 text-lg" style="line-height: 1.7;"><strong>Conclusion & Recommendation</strong> - Summarise your insight and proposed path forward.</span>
							</li>
						</ul>
						<p class="text-gray-700 mb-4 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
							An example of a research article from British Progress - <a href="https://britishprogress.org/articles/reform-academic-publishing-to-unblock-innovation" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium transition-colors duration-300">Reform Academic Publishing To Unblock Innovation</a>
						</p>
						<p class="text-gray-700 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
							Send your articles and pitches to <a href="mailto:abelarsocieties@gmail.com" class="text-primary hover:underline font-medium transition-colors duration-300">abelarsocieties@gmail.com</a>, and our team will reach out to you. Then we meet you to flesh things out together.
						</p>
					</div>
				</div>
			</div>

			<!-- Topics We Are Interested In -->
			<div class="mb-12 animate-fade-in" style="animation-delay: 0.3s;">
				<div class="bg-white border-2 border-black p-8 md:p-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
						Topics We Are Interested in but not limited to;
					</h2>
					<p class="text-gray-700 mb-6 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
						We publish across a wide range of progress-focused areas, including:
					</p>
					<ul class="space-y-3" style="font-family: 'Space Grotesk', sans-serif;">
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">AI and the African Reality</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Deep-Tech Innovation and Scientific breakthroughs such as AMRs and other Biomedicals</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Agriculture, Food Security, and Climate Resilience</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Public Service Systems e.g. Health, Education</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Urban Development, Displacement, and Market Urbanism.</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Free Markets (e.g., accelerating AfCFTA implementation).</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Fixing Intervention Programs</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Reportage -->
			<div class="mb-12 animate-fade-in" style="animation-delay: 0.4s;">
				<div class="bg-white border-2 border-black p-8 md:p-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
						Reportage
					</h2>
					<p class="text-gray-700 mb-6 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
						We only commission reportage if the subject meaningfully accelerates progress within its field.
					</p>
					<p class="text-gray-700 mb-4 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
						Our system may flag or request content revisions that include:
					</p>
					<ul class="space-y-3" style="font-family: 'Space Grotesk', sans-serif;">
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Ethnic, religious, or regional polarisation.</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Politically sensitive material requiring further verification.</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Security-sensitive information.</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Content that poses reputational risk.</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Work that conflicts with our mission or values.</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Our Ambition -->
			<div class="mb-12 animate-fade-in" style="animation-delay: 0.5s;">
				<div class="bg-white border-2 border-black p-8 md:p-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
						Our Ambition
					</h2>
					<ul class="space-y-3" style="font-family: 'Space Grotesk', sans-serif;">
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">A new African school of thought on progress</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">A network of scholars, inventors, and innovators</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Research-to-impact pathways</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary font-bold mt-1">•</span>
							<span class="text-gray-700 text-lg" style="line-height: 1.7;">Breakthroughs in science, technology, economic systems, and their commercialisation.</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Our Vision -->
			<div class="mb-12 animate-fade-in" style="animation-delay: 0.6s;">
				<div class="bg-white border-2 border-black p-8 md:p-12">
					<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style="font-family: 'Space Grotesk', sans-serif; font-weight: 900;">
						Our Vision
					</h2>
					<p class="text-gray-700 mb-6 text-lg" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
						A continent where African institutions, researchers, and innovators drive world-class progress powered by coordinated knowledge and economic transformation.
					</p>
					<p class="text-primary text-lg font-semibold" style="font-family: 'Space Grotesk', sans-serif; line-height: 1.7;">
						Abelar Progress is coordinating the talent, ideas, and programs to shape Africa's economic progress.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<CTASection />
