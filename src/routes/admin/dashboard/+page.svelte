<script lang="ts">
	import type { PageData } from './$types';
	import { Chart, registerables } from 'chart.js';
	import { Line, Bar } from 'svelte-chartjs';

	// Data from server
	export let data: PageData;

	// Register Chart.js components
	if (typeof Chart !== 'undefined') {
		Chart.register(...registerables);
	}

	// Use real stats from server
	$: stats = data.stats || {
		visitors: 0,
		authors: 0,
		publications: 0,
		pendingWorks: 0
	};

	// Chart data - Publications (Line Chart)
	let publicationsTimeFilter = '30 days';
	$: publicationsChartData = {
		labels: data.publicationsChartData?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [{
			label: 'Publications',
			data: data.publicationsChartData?.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			borderColor: '#FF6B35',
			backgroundColor: 'rgba(255, 107, 53, 0.1)',
			tension: 0.4,
			fill: true
		}]
	};

	// Chart data - Website Traffic (Bar Chart)
	let trafficTimeFilter = '12 months';
	$: trafficChartData = {
		labels: data.trafficChartData?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [{
			label: 'Website Traffic',
			data: data.trafficChartData?.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			backgroundColor: '#FF6B35',
			borderColor: '#FF6B35',
			borderWidth: 1
		}]
	};

	// Use real submissions from server
	$: submissions = data.submissions || [];

	// Chart options
	const lineChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: 'rgba(0, 0, 0, 0.1)'
				}
			},
			x: {
				grid: {
					display: false
				}
			}
		}
	};

	const barChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: 'rgba(0, 0, 0, 0.1)'
				}
			},
			x: {
				grid: {
					display: false
				}
			}
		}
	};

	function getFileIcon(fileName: string) {
		if (fileName.endsWith('.pdf')) {
			return 'pdf';
		} else if (fileName.endsWith('.docx')) {
			return 'docx';
		}
		return 'file';
	}
</script>

<svelte:head>
	<title>Dashboard | Admin | Abelar</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Dashboard Title -->
	<div class="container mx-auto px-4 py-6">
		<h1 class="text-4xl font-bold mb-6" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Dashboard</h1>
		
		<!-- Summary Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<!-- Visitors Card -->
			<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-gray-600 text-sm mb-1" style="font-family: 'Space Grotesk', sans-serif;">Visitors</p>
						<p class="text-3xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">{stats.visitors.toLocaleString()}</p>
					</div>
					<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
						<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
				</div>
			</div>

			<!-- Authors Card -->
			<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-gray-600 text-sm mb-1" style="font-family: 'Space Grotesk', sans-serif;">Authors</p>
						<p class="text-3xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">{stats.authors}</p>
					</div>
					<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
						<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
				</div>
			</div>

			<!-- Publications Card -->
			<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-gray-600 text-sm mb-1" style="font-family: 'Space Grotesk', sans-serif;">Publications</p>
						<p class="text-3xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">{stats.publications}</p>
					</div>
					<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
						<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
				</div>
			</div>

			<!-- Pending Works Card -->
			<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-gray-600 text-sm mb-1" style="font-family: 'Space Grotesk', sans-serif;">Pending Works</p>
						<p class="text-3xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">{stats.pendingWorks}</p>
					</div>
					<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
						<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- Charts Row -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
			<!-- Publications Chart -->
			<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Publications</h2>
					<div class="flex gap-2">
						<button
							class="px-3 py-1 text-xs rounded {publicationsTimeFilter === '30 days' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}"
							on:click={() => publicationsTimeFilter = '30 days'}
						>
							30 days
						</button>
						<button
							class="px-3 py-1 text-xs rounded {publicationsTimeFilter === '7 days' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}"
							on:click={() => publicationsTimeFilter = '7 days'}
						>
							7 days
						</button>
						<button
							class="px-3 py-1 text-xs rounded {publicationsTimeFilter === '24 hours' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}"
							on:click={() => publicationsTimeFilter = '24 hours'}
						>
							24 hours
						</button>
					</div>
				</div>
				<div class="h-64">
					<Line data={publicationsChartData} options={lineChartOptions} />
				</div>
			</div>

			<!-- Website Traffic Chart -->
			<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Website Traffic</h2>
					<div class="flex gap-2">
						<button
							class="px-3 py-1 text-xs rounded {trafficTimeFilter === '12 months' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}"
							on:click={() => trafficTimeFilter = '12 months'}
						>
							12 months
						</button>
						<button
							class="px-3 py-1 text-xs rounded {trafficTimeFilter === '30 days' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}"
							on:click={() => trafficTimeFilter = '30 days'}
						>
							30 days
						</button>
						<button
							class="px-3 py-1 text-xs rounded {trafficTimeFilter === '7 days' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}"
							on:click={() => trafficTimeFilter = '7 days'}
						>
							7 days
						</button>
						<button
							class="px-3 py-1 text-xs rounded {trafficTimeFilter === '24 hours' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}"
							on:click={() => trafficTimeFilter = '24 hours'}
						>
							24 hours
						</button>
					</div>
				</div>
				<div class="h-64">
					<Bar data={trafficChartData} options={barChartOptions} />
				</div>
			</div>
		</div>

		<!-- Submissions Table -->
		<div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
			<div class="p-6 border-b border-gray-200 flex items-center justify-between">
				<h2 class="text-xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Submissions</h2>
				<a href="/admin/submissions" class="text-primary hover:text-primary-dark text-sm font-medium" style="font-family: 'Space Grotesk', sans-serif;">View More</a>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Work Title</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Type</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Category</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Topic</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Date submitted</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Last Updated</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Author</th>
							<th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" style="font-family: 'Space Grotesk', sans-serif;">Action</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each submissions as submission}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center gap-2">
										{#if getFileIcon(submission.title) === 'pdf'}
											<svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
												<path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
											</svg>
										{:else if getFileIcon(submission.title) === 'docx'}
											<svg class="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
												<path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
											</svg>
										{:else}
											<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
										{/if}
										<div>
											<div class="text-sm font-medium text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{submission.title}</div>
											<div class="text-xs text-gray-500">{submission.size}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{submission.type}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{submission.category}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{submission.topic}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">{submission.dateSubmitted}</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">{submission.lastUpdated}</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center gap-2">
										{#if submission.author.avatar}
											<img src={submission.author.avatar} alt={submission.author.name} class="w-8 h-8 rounded-full" />
										{:else}
											<div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
												<span class="text-xs font-semibold text-gray-700">{submission.author.initials}</span>
											</div>
										{/if}
										<div>
											<div class="text-sm font-medium text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{submission.author.name}</div>
											<div class="text-xs text-gray-500">{submission.author.email}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<button class="text-primary hover:text-primary-dark text-sm font-medium" style="font-family: 'Space Grotesk', sans-serif;">View</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
