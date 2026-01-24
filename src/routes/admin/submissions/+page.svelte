<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let activeTab: 'all' | 'pending' | 'approved' = data.status === 'pending' ? 'pending' : data.status === 'approved' ? 'approved' : 'all';
	
	// Sync activeTab with URL params on load
	$: if (data.status) {
		activeTab = data.status === 'pending' ? 'pending' : data.status === 'approved' ? 'approved' : 'all';
	}
	let searchQuery = data.search || '';
	let showModal = false;
	let selectedSubmission: any = null;
	let loading = false;
	let rejectReason = '';
	let errorMessage = '';
	let successMessage = '';

	function getFileIcon(title: string) {
		if (title.toLowerCase().endsWith('.pdf')) {
			return 'pdf';
		} else if (title.toLowerCase().endsWith('.docx')) {
			return 'docx';
		}
		return 'file';
	}

	function handleTabChange(tab: 'all' | 'pending' | 'approved') {
		activeTab = tab;
		const params = new URLSearchParams();
		if (tab !== 'all') {
			params.set('status', tab);
		}
		if (searchQuery) {
			params.set('search', searchQuery);
		}
		// Reset to page 1 when changing tabs
		params.set('page', '1');
		const queryString = params.toString();
		goto(`/admin/submissions?${queryString}`);
	}

	function handleSearch() {
		const params = new URLSearchParams();
		if (activeTab !== 'all') {
			params.set('status', activeTab);
		}
		if (searchQuery.trim()) {
			params.set('search', searchQuery.trim());
		}
		// Reset to page 1 when searching
		params.set('page', '1');
		const queryString = params.toString();
		goto(`/admin/submissions?${queryString}`);
	}

	function openModal(submission: any) {
		selectedSubmission = submission;
		showModal = true;
		rejectReason = '';
		errorMessage = '';
		successMessage = '';
	}

	function closeModal() {
		showModal = false;
		selectedSubmission = null;
		rejectReason = '';
	}

	function handlePageChange(page: number) {
		const params = new URLSearchParams();
		if (activeTab !== 'all') {
			params.set('status', activeTab);
		}
		if (searchQuery) {
			params.set('search', searchQuery);
		}
		params.set('page', page.toString());
		goto(`/admin/submissions?${params.toString()}`);
	}

	async function handleApprove({ formData }: any) {
		loading = true;
		errorMessage = '';
		successMessage = '';
		return async ({ result, update }: any) => {
			loading = false;
			if (result.type === 'success') {
				successMessage = 'Work approved successfully!';
				closeModal();
				setTimeout(() => {
					successMessage = '';
					update();
				}, 1000);
			} else if (result.type === 'failure') {
				errorMessage = result.data?.error || 'Failed to approve work';
			}
		};
	}

	async function handleReject({ formData }: any) {
		loading = true;
		errorMessage = '';
		successMessage = '';
		if (!rejectReason.trim()) {
			errorMessage = 'Please provide a reason for rejection';
			loading = false;
			return;
		}
		formData.set('reason', rejectReason.trim());
		return async ({ result, update }: any) => {
			loading = false;
			if (result.type === 'success') {
				successMessage = 'Work rejected successfully!';
				closeModal();
				setTimeout(() => {
					successMessage = '';
					update();
				}, 1000);
			} else if (result.type === 'failure') {
				errorMessage = result.data?.error || 'Failed to reject work';
			}
		};
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<title>Submissions | Admin | Abelar</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<div class="container mx-auto px-4 py-8">
		<!-- Page Title -->
		<h1 class="text-4xl font-bold mb-6" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Submissions</h1>

		<!-- Tabs -->
		<div class="flex gap-2 mb-6">
			<button
				on:click={() => handleTabChange('all')}
				class="px-6 py-3 font-medium transition-all duration-300 rounded {activeTab === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				All
			</button>
			<button
				on:click={() => handleTabChange('pending')}
				class="px-6 py-3 font-medium transition-all duration-300 rounded {activeTab === 'pending' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Pending
			</button>
			<button
				on:click={() => handleTabChange('approved')}
				class="px-6 py-3 font-medium transition-all duration-300 rounded {activeTab === 'approved' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'}"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Approved
			</button>
		</div>

		<!-- Messages -->
		{#if successMessage}
			<div class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
				{successMessage}
			</div>
		{/if}
		{#if errorMessage}
			<div class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
				{errorMessage}
			</div>
		{/if}

		<!-- Search Bar -->
		<div class="mb-6 flex items-center gap-3 justify-end">
			<div class="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 bg-white">
				<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search author or topic"
					on:keydown={(e) => e.key === 'Enter' && handleSearch()}
					class="outline-none text-sm"
					style="font-family: 'Space Grotesk', sans-serif;"
				/>
			</div>
			<button
				on:click={handleSearch}
				class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded font-medium"
				style="font-family: 'Space Grotesk', sans-serif;"
			>
				Search
			</button>
		</div>

		<!-- Submissions Table -->
		<div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
			<div class="overflow-x-auto">
				{#if data.submissions.length === 0}
					<!-- Empty State -->
					<div class="p-12 text-center">
						<svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						<p class="text-lg font-semibold text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">
							{activeTab === 'pending' ? 'No pending work' : activeTab === 'approved' ? 'No approved submissions' : 'No submissions found'}
						</p>
						<p class="text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">
							{activeTab === 'pending' 
								? 'There are currently no pending submissions to review.'
								: activeTab === 'approved'
								? 'No submissions have been approved yet.'
								: 'Try adjusting your search or filters.'}
						</p>
					</div>
				{:else}
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
							{#each data.submissions as submission}
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
												<div class="text-sm font-medium text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{submission.title || 'Untitled'}</div>
												<div class="text-xs text-gray-500">{submission.size || 'N/A'}</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="text-sm {submission.type === 'File Upload' ? 'text-green-600' : 'text-red-400'}" style="font-family: 'Space Grotesk', sans-serif;">
											{submission.type || 'Unknown'}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-blue-500 text-blue-700 bg-blue-50" style="font-family: 'Space Grotesk', sans-serif;">
											{submission.category || 'N/A'}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-primary text-primary bg-orange-50" style="font-family: 'Space Grotesk', sans-serif;">
											{submission.topic || 'N/A'}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">{submission.dateSubmitted}</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style="font-family: 'Space Grotesk', sans-serif;">{submission.lastUpdated}</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center gap-2">
											{#if submission.author?.avatar}
												<img src={submission.author.avatar} alt={submission.author?.name || 'Author'} class="w-8 h-8 rounded-full" />
											{:else}
												<div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
													<span class="text-xs font-semibold text-gray-700">{submission.author?.initials || 'U'}</span>
												</div>
											{/if}
											<div>
												<div class="text-sm font-medium text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{submission.author?.name || 'Unknown'}</div>
												<div class="text-xs text-gray-500">{submission.author?.email || ''}</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<button
											on:click={() => openModal(submission)}
											class="text-primary hover:text-primary-dark text-sm font-medium"
											style="font-family: 'Space Grotesk', sans-serif;"
										>
											View
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>

			<!-- Pagination -->
			{#if data.totalPages > 1}
				<div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
					<button
						on:click={() => handlePageChange(data.currentPage - 1)}
						disabled={data.currentPage === 1}
						class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						style="font-family: 'Space Grotesk', sans-serif;"
					>
						← Previous
					</button>
					<div class="flex items-center gap-2">
						{#if data.totalPages <= 7}
							{#each Array(data.totalPages) as _, i}
								{@const pageNum = i + 1}
								{#if pageNum === data.currentPage}
									<span class="px-4 py-2 text-sm font-medium text-white bg-primary rounded" style="font-family: 'Space Grotesk', sans-serif;">
										{pageNum}
									</span>
								{:else}
									<button
										on:click={() => handlePageChange(pageNum)}
										class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
										style="font-family: 'Space Grotesk', sans-serif;"
									>
										{pageNum}
									</button>
								{/if}
							{/each}
						{:else}
							<!-- Show first page -->
							{#if data.currentPage > 3}
								<button
									on:click={() => handlePageChange(1)}
									class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
									style="font-family: 'Space Grotesk', sans-serif;"
								>
									1
								</button>
								{#if data.currentPage > 4}
									<span class="px-2 text-gray-500">...</span>
								{/if}
							{/if}
							
							<!-- Show pages around current -->
							{#each Array(Math.min(5, data.totalPages)) as _, i}
								{@const startPage = Math.max(1, Math.min(data.currentPage - 2, data.totalPages - 4))}
								{@const pageNum = startPage + i}
								{#if pageNum <= data.totalPages}
									{#if pageNum === data.currentPage}
										<span class="px-4 py-2 text-sm font-medium text-white bg-primary rounded" style="font-family: 'Space Grotesk', sans-serif;">
											{pageNum}
										</span>
									{:else}
										<button
											on:click={() => handlePageChange(pageNum)}
											class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
											style="font-family: 'Space Grotesk', sans-serif;"
										>
											{pageNum}
										</button>
									{/if}
								{/if}
							{/each}
							
							<!-- Show last page -->
							{#if data.currentPage < data.totalPages - 2}
								{#if data.currentPage < data.totalPages - 3}
									<span class="px-2 text-gray-500">...</span>
								{/if}
								<button
									on:click={() => handlePageChange(data.totalPages)}
									class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
									style="font-family: 'Space Grotesk', sans-serif;"
								>
									{data.totalPages}
								</button>
							{/if}
						{/if}
					</div>
					<button
						on:click={() => handlePageChange(data.currentPage + 1)}
						disabled={data.currentPage === data.totalPages}
						class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						style="font-family: 'Space Grotesk', sans-serif;"
					>
						Next →
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Modal -->
{#if showModal && selectedSubmission}
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
		on:click={closeModal}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div
			class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
			on:click|stopPropagation
		>
			<!-- Modal Header -->
			<div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
				<h2 id="modal-title" class="text-2xl font-bold" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">
					{selectedSubmission.title}
				</h2>
				<button
					on:click={closeModal}
					class="text-gray-400 hover:text-gray-600 transition-colors"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Modal Content -->
			<div class="px-6 py-4">
				<div class="grid grid-cols-2 gap-4 mb-6">
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" style="font-family: 'Space Grotesk', sans-serif;">Type</label>
						<p class="text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{selectedSubmission.type}</p>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" style="font-family: 'Space Grotesk', sans-serif;">Category</label>
						<p class="text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{selectedSubmission.category}</p>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" style="font-family: 'Space Grotesk', sans-serif;">Topic</label>
						<p class="text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{selectedSubmission.topic}</p>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" style="font-family: 'Space Grotesk', sans-serif;">Author</label>
						<p class="text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{selectedSubmission.author.name}</p>
						<p class="text-xs text-gray-500">{selectedSubmission.author.email}</p>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" style="font-family: 'Space Grotesk', sans-serif;">Date Submitted</label>
						<p class="text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{selectedSubmission.dateSubmitted}</p>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1" style="font-family: 'Space Grotesk', sans-serif;">Last Updated</label>
						<p class="text-sm text-gray-900" style="font-family: 'Space Grotesk', sans-serif;">{selectedSubmission.lastUpdated}</p>
					</div>
				</div>

				<!-- Content Preview -->
				{#if selectedSubmission.content?.html && selectedSubmission.content.html.trim()}
					<div class="mb-6">
						<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Content Preview</label>
						<div class="border border-gray-300 rounded p-4 max-h-64 overflow-y-auto bg-gray-50">
							<div class="prose prose-sm max-w-none">{@html selectedSubmission.content.html}</div>
						</div>
					</div>
				{/if}

				{#if selectedSubmission.content?.file_url || selectedSubmission.content?.file_name}
					<div class="mb-6">
						<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">File</label>
						<a href={selectedSubmission.content.file_url || '#'} target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary-dark underline">
							{selectedSubmission.content.file_name || 'Download File'}
						</a>
					</div>
				{/if}

				<!-- Rejection Reason Input -->
				<div class="mb-6">
					<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Rejection Reason (if rejecting)</label>
					<textarea
						bind:value={rejectReason}
						placeholder="Enter reason for rejection..."
						rows="3"
						class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
						style="font-family: 'Space Grotesk', sans-serif;"
					></textarea>
				</div>
			</div>

			<!-- Modal Footer -->
			<div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
				{#if errorMessage}
					<div class="text-red-600 text-sm">{errorMessage}</div>
				{:else}
					<div></div>
				{/if}
				<div class="flex items-center gap-3">
					<form method="POST" action="?/reject" use:enhance={handleReject}>
						<input type="hidden" name="workId" value={selectedSubmission.id} />
						<button
							type="submit"
							disabled={loading}
							class="px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-all duration-300 rounded font-medium disabled:opacity-50"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							{loading ? 'Processing...' : 'Reject'}
						</button>
					</form>
					<form method="POST" action="?/approve" use:enhance={handleApprove}>
						<input type="hidden" name="workId" value={selectedSubmission.id} />
						<button
							type="submit"
							disabled={loading || selectedSubmission.status === 'published'}
							class="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded font-medium disabled:opacity-50"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							{loading ? 'Processing...' : selectedSubmission.status === 'published' ? 'Approved' : 'Approve'}
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.prose) {
		font-family: 'Space Grotesk', sans-serif;
	}
	:global(.prose p) {
		margin-bottom: 0.5rem;
	}
</style>
