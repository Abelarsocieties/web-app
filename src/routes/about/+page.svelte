<script lang="ts">
	import CTASection from '$lib/components/CTASection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let expandedFAQ: number | null = null;

	function toggleFAQ(index: number) {
		expandedFAQ = expandedFAQ === index ? null : index;
	}

	const faqs = [
		{
			question: 'Who can contribute to Abelar Africa?',
			answer: 'Anyone based in Africa or working on African-focussed innovation — from students and researchers to entrepreneurs and social change-makers.'
		},
		{
			question: 'How is content selected and used?',
			answer: 'Submitted content is reviewed for relevance, quality and originality. Once approved, it\'s published and shared with our network; top pieces may be matched with funding or collaboration opportunities.'
		},
		{
			question: 'Is there a cost to use the platform?',
			answer: 'Basic publishing, reading and engagement are free. Some opportunities (e.g., premium mentorship or exclusive funding rounds) may have eligibility criteria or costs which will always be transparent.'
		},
		{
			question: 'What kind of opportunities are available?',
			answer: 'We list a range of grants, hackathons, fellowship programmes and funding calls tailored for innovation across Africa.'
		},
		{
			question: 'Question Here?',
			answer: ''
		}
	];

	const teamMembers = [
		{
			name: 'Amélie Laurent',
			title: 'Founder & CEO',
			image: '/user-icon.png', // Placeholder - will need actual team photos
			bgColor: '#FEE2E2' // Light pink
		},
		{
			name: 'Nikolas Gibbons',
			title: 'Engineering Manager',
			image: '/user-icon.png',
			bgColor: '#DCFCE7' // Light green
		},
		{
			name: 'Sienna Hewitt',
			title: 'Product Manager',
			image: '/user-icon.png',
			bgColor: '#FEF3C7' // Light yellow
		},
		{
			name: 'Lily-Rose Chedjou',
			title: 'Frontend Developer',
			image: '/user-icon.png',
			bgColor: '#FEE2E2' // Light pink
		}
	];
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
		<h1 
			class="text-6xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up"
			style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 64px; line-height: 60px; letter-spacing: -0.02em; animation-delay: 0.2s;"
		>
			About Abelar Progress
		</h1>
		<p class="mb-8 text-lg max-w-3xl mx-auto animate-fade-in-up" style="color: #ACACAC; animation-delay: 0.3s; line-height: 1.6;">
			Abelar Progress is a Pan-African research-to-impact platform dedicated to accelerating long-term progress across Africa, starting with Nigeria. We study how nations achieve progress, identify the mechanisms that drive it, and build systems that turn ideas into large-scale impact.
		</p>
	</div>
	
	<!-- Vector Graphics at Bottom -->
	<img src="/left-vector.png" alt="" class="absolute left-0 bottom-[-130px] z-10 object-contain transition-all duration-1000 hover:scale-105" style="height: 30rem;" />
	<img src="/right-vector.png" alt="" class="absolute right-0 bottom-0 z-10 object-contain h-64 transition-all duration-1000 hover:scale-105" />
</section>

<!-- Our Purpose Section -->
<section class="py-20 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1.5px, transparent 1px); background-size: 20px 20px;">
	<div class="container mx-auto px-4">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<!-- Left: Text Content -->
			<div class="animate-fade-in">
				<div class="text-sm mb-2" style="color: rgb(255 107 53); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
					Our Purpose
				</div>
				<h2 class="text-4xl md:text-5xl font-bold text-black mb-6" style="font-weight: 900; line-height: 1.2;">
					Why We Exist
				</h2>
				<div class="space-y-4 text-gray-700" style="line-height: 1.7; font-size: 16px;">
					<p>
						Africa faces a critical challenge: weak institutional memory, fragmented research ecosystems, and limited pathways for turning ideas into scalable impact. Despite abundant talent and innovation, the continent struggles to translate knowledge into sustained progress.
					</p>
					<p>
						We believe nations thrive when they have strong institutions that learn and adapt, coordinated knowledge systems that preserve and share insights, and pathways that turn breakthroughs into widespread impact. Abelar Progress exists to build these systems for Africa.
					</p>
				</div>
			</div>
			
			<!-- Right: Image -->
			<div class="animate-fade-in" style="animation-delay: 0.2s;">
				<div class="w-full h-96 bg-gray-200 border border-black">
					<!-- Placeholder for black and white photo of woman with laptop -->
					<img src="/hero-bg.jpg" alt="Our Purpose" class="w-full h-full object-cover grayscale" />
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Our Mission Section -->
<section class="py-20" style="background-color: #f5f5f5;">
	<div class="container mx-auto px-4">
		<div class="mb-12 animate-fade-in">
			<div class="text-sm mb-2" style="color: rgb(255 107 53); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
				Our Mission
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-black mb-4" style="font-weight: 900; line-height: 1.2;">
				What We Do
			</h2>
			<p class="text-gray-700 text-lg" style="line-height: 1.6;">
				We operate through three core pillars:
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 gap-12">
			<!-- Left: Image -->
			<div class="animate-fade-in">
				<div class="w-full h-96 bg-gray-200 border border-black">
					<!-- Placeholder for black and white photo of crowd -->
					<img src="/hero-bg.jpg" alt="Our Mission" class="w-full h-full object-cover grayscale" />
				</div>
			</div>
			
			<!-- Right: Three Pillars -->
			<div class="space-y-8 animate-fade-in" style="animation-delay: 0.2s;">
				<!-- Pillar 1 -->
				<div class="flex gap-4">
					<div class="w-1 bg-primary flex-shrink-0"></div>
					<div>
						<h3 class="text-xl font-bold text-black mb-3" style="font-weight: 900;">
							Idea Crowdsourcing & Knowledge Building
						</h3>
						<p class="text-gray-700" style="line-height: 1.7;">
							We crowdsource insights from African scholars, innovators, and practitioners, documenting research and ideas that strengthen institutional memory and inform policy. Our platform serves as a living archive of African innovation and progress.
						</p>
					</div>
				</div>
				
				<!-- Pillar 2 -->
				<div class="flex gap-4">
					<div class="w-1 bg-primary flex-shrink-0"></div>
					<div>
						<h3 class="text-xl font-bold text-black mb-3" style="font-weight: 900;">
							Experimentation
						</h3>
						<p class="text-gray-700" style="line-height: 1.7;">
							We partner with innovation hubs, research institutions, and labs to turn ideas into experiments. Through programs like hackathons, pilot projects, and fellowships, we test and validate concepts before scaling.
						</p>
					</div>
				</div>
				
				<!-- Pillar 3 -->
				<div class="flex gap-4">
					<div class="w-1 bg-primary flex-shrink-0"></div>
					<div>
						<h3 class="text-xl font-bold text-black mb-3" style="font-weight: 900;">
							Customised Solutions for Breakthroughs
						</h3>
						<p class="text-gray-700" style="line-height: 1.7;">
							We translate ideas and experiments into actionable impact, building pathways for commercialization and scaling. Our systems connect innovators with resources, funding, and networks needed to achieve breakthroughs at scale.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Our Philosophy Section -->
<section class="relative py-20 overflow-hidden" style="background-color: #1a1a1a;">
	<!-- Orange Abstract Shapes -->
	<div class="absolute top-0 right-0 w-64 h-64 bg-primary transform rotate-45 opacity-30 z-0" style="border-radius: 50%; transform: translate(30%, -30%) rotate(45deg);"></div>
	<div class="absolute bottom-0 left-0 w-96 h-96 bg-primary transform -rotate-45 opacity-20 z-0" style="border-radius: 50%; transform: translate(-30%, 30%) rotate(-45deg);"></div>
	
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
			<div class="text-sm mb-2" style="color: rgb(255 107 53); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
				Our Philosophy
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6" style="font-weight: 900; line-height: 1.2;">
				Progress Is a System
			</h2>
			<div class="space-y-4 text-white text-lg" style="line-height: 1.7;">
				<p>
					Nations do not advance by talent alone; they advance by building strong institutions that learn, adapt, and scale. The scientific revolution, industrial breakthroughs, and technological leaps worldwide were driven not only by innovation but by research ecosystems, cumulative knowledge, and coherent philosophies of progress.
				</p>
				<p>
					Africa cannot leapfrog its way into prosperity solely through short-term interventions. We must construct the foundational systems that allow innovation to become widespread, scientific advancement to become continuous, and policy to become evidence-led.
				</p>
				<p class="font-semibold">
					Abelar Progress exists to build these systems and shape the next economic miracle.
				</p>
			</div>
		</div>
		
		<!-- Cityscape Image -->
		<div class="w-full h-96 mb-12 animate-fade-in" style="animation-delay: 0.2s;">
			<img src="/hero-bg.jpg" alt="Cityscape" class="w-full h-full object-cover grayscale" />
		</div>
	</div>
</section>

<!-- Team Section -->
<section class="py-20 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1.5px, transparent 1px); background-size: 20px 20px;">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12 animate-fade-in">
			<div class="text-sm mb-2" style="color: rgb(255 107 53); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
				The team
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-black mb-4" style="font-weight: 900; line-height: 1.2;">
				Meet the amazing team behind Abelar
			</h2>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each teamMembers as member, index (member.name)}
				<div class="bg-white border border-gray-300 p-6 text-center hover-lift transition-all duration-300 animate-fade-in" style="animation-delay: {index * 0.1}s;">
					<div class="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden" style="background-color: {member.bgColor};">
						<img src={member.image} alt={member.name} class="w-full h-full object-cover" />
					</div>
					<h3 class="text-lg font-bold text-black mb-1" style="font-weight: 900;">{member.name}</h3>
					<p class="text-sm text-gray-500 mb-4">{member.title}</p>
					<div class="flex justify-center gap-3">
						<a href="#" class="text-primary hover:text-primary-dark transition-colors">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
							</svg>
						</a>
						<a href="#" class="text-primary hover:text-primary-dark transition-colors">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
								<circle cx="4" cy="4" r="2"/>
							</svg>
						</a>
						<a href="#" class="text-primary hover:text-primary-dark transition-colors">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
							</svg>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Partner With Us Section -->
<section class="py-20 relative overflow-hidden" style="background-color: rgb(255 107 53);">
	<!-- White Abstract Shapes -->
	<div class="absolute top-0 right-0 w-96 h-96 bg-white opacity-20 transform rotate-45" style="border-radius: 50%; transform: translate(20%, -20%) rotate(45deg);"></div>
	<div class="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-15 transform -rotate-45" style="border-radius: 50%; transform: translate(-10%, 10%) rotate(-45deg);"></div>
	
	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-3xl mx-auto text-center animate-fade-in">
			<div class="text-sm mb-2 text-white opacity-90" style="font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">
				Get Involved
			</div>
			<h2 class="text-5xl md:text-6xl font-bold text-white mb-6" style="font-weight: 900; line-height: 1.2; text-transform: uppercase;">
				Partner With Us
			</h2>
			<p class="text-white text-lg mb-8" style="line-height: 1.7;">
				We welcome partners across various organizations and institutions willing to sample public ideas, support us or collaborate with our work. Do reach out to us via <strong>CONTACT@ABELAR.ORG</strong> or through our social media channels.
			</p>
			<button class="px-8 py-4 bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 font-medium btn-press shadow-lg hover:shadow-xl mb-8 flex items-center gap-2 mx-auto">
				Partner With Us
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(45deg);">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M7 7h10v10" />
				</svg>
			</button>
			<div class="flex justify-center gap-4">
				<a href="#" class="text-white hover:opacity-80 transition-opacity">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
					</svg>
				</a>
				<a href="#" class="text-white hover:opacity-80 transition-opacity">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
						<circle cx="4" cy="4" r="2"/>
					</svg>
				</a>
				<a href="#" class="text-white hover:opacity-80 transition-opacity">
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="py-20 bg-white" style="background-image: radial-gradient(circle, #f0f0f0 1.5px, transparent 1px); background-size: 20px 20px;">
	<div class="container mx-auto px-4">
		<div class="grid md:grid-cols-2 gap-12">
			<!-- Left: FAQ Intro -->
			<div class="animate-fade-in">
				<div class="inline-block px-3 py-1 mb-4" style="background-color: rgb(255 107 53);">
					<span class="text-white text-xs font-semibold uppercase tracking-wider">FAQ</span>
				</div>
				<h2 class="text-4xl md:text-5xl font-bold text-black mb-4" style="font-weight: 900; line-height: 1.2;">
					Frequently asked questions
				</h2>
				<p class="text-gray-700" style="line-height: 1.7;">
					Everything you need to know about Abelar. Can't find the answer you're looking for? Please <a href="/support" class="font-bold underline hover:text-primary transition-colors">chat to our friendly team.</a>
				</p>
			</div>
			
			<!-- Right: FAQ Items -->
			<div class="space-y-0 animate-fade-in" style="animation-delay: 0.2s;">
				{#each faqs as faq, index (index)}
					<div class="border-b border-gray-200 py-4">
						<button 
							on:click={() => toggleFAQ(index)}
							class="w-full flex items-center justify-between text-left hover:text-primary transition-colors"
						>
							<span class="text-lg font-semibold text-black pr-4" style="font-weight: 600;">{faq.question}</span>
							<div class="flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center transition-transform {expandedFAQ === index ? 'rotate-180' : ''}">
								<svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
							</div>
						</button>
						{#if expandedFAQ === index && faq.answer}
							<div class="mt-3 text-gray-700" style="line-height: 1.7;">
								{faq.answer}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<CTASection />
<Footer />
