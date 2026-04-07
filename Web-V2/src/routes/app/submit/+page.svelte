<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let activeTab: 'text' | 'upload' = 'text';
	let documentTitle = '';
	let isTitleEditing = false;
	let titleInputRef: HTMLInputElement;
	let editorRef: HTMLDivElement;
	let summary = '';
	let workType = 'Article';
	let topic = '';
	let coverImage: File | null = null;
	let coverImagePreview = '';
	let imageAltText = '';
	let uploadedFile: File | null = null;
	let uploadedFileName = '';
	let authors: Array<{ id: string; name: string; email: string }> = [];
	let selectedAuthorId = '';
	let availableAuthors: Array<{ id: string; name: string; email: string }> = [];
	let loading = false;

	// Formatting toolbar state
	let selectedFormat: 'bold' | 'italic' | 'underline' | 'strikethrough' | null = null;
	let fontSize = '16';
	let alignment: 'left' | 'center' | 'right' | 'justify' = 'left';
	let headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | null = null;
	let listType: 'bullet' | 'number' | null = null;
	let imageUploadInput: HTMLInputElement;
	let submitForm: HTMLFormElement;

	onMount(async () => {
		// Initialize with current user as author
		if (data.user) {
			authors = [{
				id: data.user.id,
				name: data.user.name || data.user.email || 'You',
				email: data.user.email || ''
			}];
		}

		// Co-authors list would come from a future API endpoint; not in published OpenAPI.

		// Initialize editor content (blank) - placeholder will show via CSS
		if (editorRef) {
			editorRef.innerHTML = '';
			// Ensure placeholder shows when empty
			editorRef.setAttribute('data-placeholder', 'Enter your article here...');
			editorRef.classList.add('empty');
		}
	});

	function toggleFormat(format: 'bold' | 'italic' | 'underline' | 'strikethrough') {
		document.execCommand(format, false);
		editorRef?.focus();
	}

	function setFontSize(size: string) {
		fontSize = size;
		document.execCommand('fontSize', false, '3');
		// Apply size via style
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			if (!range.collapsed) {
				const span = document.createElement('span');
				span.style.fontSize = `${size}px`;
				try {
					range.surroundContents(span);
				} catch (e) {
					// If surroundContents fails, apply to selected text
					span.appendChild(range.extractContents());
					range.insertNode(span);
				}
			}
		}
		editorRef?.focus();
	}

	function setAlignment(align: 'left' | 'center' | 'right' | 'justify') {
		alignment = align;
		const command = align === 'left' ? 'justifyLeft' : align === 'center' ? 'justifyCenter' : align === 'right' ? 'justifyRight' : 'justifyFull';
		document.execCommand(command, false);
		editorRef?.focus();
	}

	function setHeading(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
		headingLevel = level;
		document.execCommand('formatBlock', false, level);
		editorRef?.focus();
	}

	function toggleList(type: 'bullet' | 'number') {
		listType = type;
		if (type === 'bullet') {
			document.execCommand('insertUnorderedList', false);
		} else {
			document.execCommand('insertOrderedList', false);
		}
		editorRef?.focus();
	}

	function insertLink() {
		const url = prompt('Enter URL:');
		if (url) {
			document.execCommand('createLink', false, url);
		}
		editorRef?.focus();
	}

	function insertImage() {
		// Trigger file input for image upload
		imageUploadInput?.click();
	}

	async function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			try {
				const fd = new FormData();
				fd.append('photo', file);
				const res = await fetch('/api/abelar/media', { method: 'POST', body: fd, credentials: 'include' });
				if (!res.ok) throw new Error(await res.text());
				const j = await res.json();
				const publicUrl = j?.url ?? j?.public_url ?? j?.data?.url ?? j?.data?.public_url;
				if (!publicUrl) throw new Error('No image URL in API response');
				document.execCommand('insertImage', false, publicUrl);
				editorRef?.focus();
			} catch (error: unknown) {
				const msg = error instanceof Error ? error.message : String(error);
				console.error('Error uploading image:', error);
				alert('Error uploading image: ' + msg);
			}
		}
		// Reset input
		if (target) target.value = '';
	}

	function handleCoverImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			coverImage = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				coverImagePreview = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			uploadedFile = file;
			uploadedFileName = file.name;
		}
	}

	function removeCoverImage() {
		coverImage = null;
		coverImagePreview = '';
	}

	async function saveDraft() {
		alert(
			'Drafts are not stored by this PHP API build. Use Submit Work when your piece is ready, or copy your content locally.'
		);
	}

	function submitWork() {
		if (!documentTitle.trim()) {
			alert('Please enter a document title');
			return;
		}

		// Trigger form submission
		if (submitForm) {
			submitForm.requestSubmit();
		}
	}

	function handleSubmitEnhance({ formData }: any) {
		loading = true;
		
		// Update form data with current values (including files)
		formData.set('title', documentTitle);
		formData.set('content', editorRef?.innerHTML || '');
		formData.set('summary', summary);
		formData.set('workType', workType);
		formData.set('topic', topic);
		formData.set('activeTab', activeTab);
		
		// Handle file uploads
		if (coverImage) {
			formData.set('coverImage', coverImage);
		} else {
			formData.delete('coverImage');
		}
		
		if (uploadedFile) {
			formData.set('uploadedFile', uploadedFile);
		} else {
			formData.delete('uploadedFile');
		}
		
		return async ({ result, update }: any) => {
			loading = false;
			
			// If redirect happened (success), don't update - let SvelteKit handle the redirect
			if (result.type === 'redirect') {
				return;
			}
			
			if (result.type === 'failure') {
				const errorMessage = result.data?.error || 'Failed to submit work';
				alert('Error submitting work: ' + errorMessage);
			}
			
			await update();
		};
	}

	function startTitleEdit() {
		isTitleEditing = true;
		setTimeout(() => {
			titleInputRef?.focus();
			titleInputRef?.select();
		}, 0);
	}

	function saveTitle() {
		isTitleEditing = false;
	}
</script>

<svelte:head>
	<title>Submit Work | Abelar</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<div class="container mx-auto px-4 py-8">
		<div class="flex flex-col lg:flex-row gap-8">
			<!-- Main Content Area -->
			<div class="flex-1">
				<!-- Page Title -->
				<h1 class="text-4xl font-bold mb-6" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Submit Work</h1>

				<!-- Tabs -->
				<div class="flex gap-2 mb-6 border-b-2 border-black">
					<button
						class="px-6 py-3 font-medium transition-all duration-300 {activeTab === 'text' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-900'}"
						style="font-family: 'Space Grotesk', sans-serif; border-bottom-width: 3px;"
						on:click={() => activeTab = 'text'}
					>
						Text Editor
					</button>
					<button
						class="px-6 py-3 font-medium transition-all duration-300 {activeTab === 'upload' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-900'}"
						style="font-family: 'Space Grotesk', sans-serif; border-bottom-width: 3px;"
						on:click={() => activeTab = 'upload'}
					>
						Document Upload
					</button>
				</div>

				{#if activeTab === 'text'}
					<!-- Text Editor Tab -->
					<div class="bg-white border-2 border-black rounded-lg overflow-hidden">
						<!-- Document Title -->
						<div class="px-6 py-4 border-b-2 border-black flex items-center gap-3">
							{#if isTitleEditing}
								<input
									bind:this={titleInputRef}
									bind:value={documentTitle}
									on:blur={saveTitle}
									on:keydown={(e) => e.key === 'Enter' && saveTitle()}
									placeholder="Enter a title"
									class="flex-1 text-xl font-bold focus:outline-none placeholder:text-gray-400"
									style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;"
								/>
							{:else}
								<h2 class="flex-1 text-xl font-bold {!documentTitle ? 'text-gray-400' : ''}" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">{documentTitle || 'Enter a title'}</h2>
								<button
									on:click={startTitleEdit}
									class="p-1 hover:bg-gray-100 rounded transition-colors"
								>
									<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
									</svg>
								</button>
							{/if}
						</div>

						<!-- Formatting Toolbar -->
						<div class="px-6 py-3 border-b-2 border-black flex items-center gap-2 flex-wrap bg-gray-50">
							<!-- Bold, Italic, Underline, Strikethrough -->
							<button
								on:click={() => toggleFormat('bold')}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Bold"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
								</svg>
							</button>
							<button
								on:click={() => toggleFormat('italic')}
								class="p-2 hover:bg-gray-200 rounded transition-colors font-italic"
								title="Italic"
								style="font-style: italic;"
							>
								<span class="text-lg font-bold">I</span>
							</button>
							<button
								on:click={() => toggleFormat('underline')}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Underline"
							>
								<span class="text-lg font-bold underline">U</span>
							</button>
							<button
								on:click={() => toggleFormat('strikethrough')}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Strikethrough"
							>
								<span class="text-lg font-bold line-through">S</span>
							</button>

							<div class="w-px h-6 bg-gray-300"></div>

							<!-- Font Size -->
							<select
								bind:value={fontSize}
								on:change={() => setFontSize(fontSize)}
								class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="12">12</option>
								<option value="14">14</option>
								<option value="16">16</option>
								<option value="18">18</option>
								<option value="20">20</option>
								<option value="24">24</option>
							</select>

							<div class="w-px h-6 bg-gray-300"></div>

							<!-- Alignment -->
							<button
								on:click={() => setAlignment('left')}
								class="p-2 hover:bg-gray-200 rounded transition-colors {alignment === 'left' ? 'bg-gray-200' : ''}"
								title="Align Left"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h10" />
								</svg>
							</button>
							<button
								on:click={() => setAlignment('center')}
								class="p-2 hover:bg-gray-200 rounded transition-colors {alignment === 'center' ? 'bg-gray-200' : ''}"
								title="Align Center"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>
							<button
								on:click={() => setAlignment('right')}
								class="p-2 hover:bg-gray-200 rounded transition-colors {alignment === 'right' ? 'bg-gray-200' : ''}"
								title="Align Right"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-6 6h6" />
								</svg>
							</button>
							<button
								on:click={() => setAlignment('justify')}
								class="p-2 hover:bg-gray-200 rounded transition-colors {alignment === 'justify' ? 'bg-gray-200' : ''}"
								title="Justify"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>

							<div class="w-px h-6 bg-gray-300"></div>

							<!-- Headings -->
							<button
								on:click={() => setHeading('h1')}
								class="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded transition-colors"
								title="Heading 1"
							>
								H1
							</button>
							<button
								on:click={() => setHeading('h2')}
								class="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded transition-colors"
								title="Heading 2"
							>
								H2
							</button>
							<button
								on:click={() => setHeading('h3')}
								class="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded transition-colors"
								title="Heading 3"
							>
								H3
							</button>
							<button
								on:click={() => setHeading('h4')}
								class="px-2 py-1 text-sm font-semibold hover:bg-gray-200 rounded transition-colors"
								title="Heading 4"
							>
								H4
							</button>
							<button
								on:click={() => setHeading('h5')}
								class="px-2 py-1 text-sm font-semibold hover:bg-gray-200 rounded transition-colors"
								title="Heading 5"
							>
								H5
							</button>

							<div class="w-px h-6 bg-gray-300"></div>

							<!-- Lists -->
							<button
								on:click={() => toggleList('bullet')}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Bullet List"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
								</svg>
							</button>
							<button
								on:click={() => toggleList('number')}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Numbered List"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
								</svg>
							</button>

							<div class="w-px h-6 bg-gray-300"></div>

							<!-- Link, Code, Image -->
							<button
								on:click={insertLink}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Insert Link"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
								</svg>
							</button>
							<button
								on:click={() => document.execCommand('formatBlock', false, 'pre')}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Code Block"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
								</svg>
							</button>
							<button
								on:click={insertImage}
								class="p-2 hover:bg-gray-200 rounded transition-colors"
								title="Insert Image"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</button>
							<!-- Hidden file input for image upload -->
							<input
								type="file"
								bind:this={imageUploadInput}
								accept="image/*"
								on:change={handleImageUpload}
								class="hidden"
							/>
						</div>

						<!-- Editor Content Area -->
						<div
							bind:this={editorRef}
							contenteditable="true"
							data-placeholder="Enter your article here..."
							class="px-6 py-8 min-h-[600px] focus:outline-none prose prose-lg max-w-none text-gray-900 editor-placeholder"
							style="font-family: 'Space Grotesk', sans-serif;"
							on:input={(e) => {
								// Update placeholder visibility based on content
								if (editorRef) {
									if (editorRef.innerText.trim()) {
										editorRef.classList.remove('empty');
									} else {
										editorRef.classList.add('empty');
									}
								}
							}}
							on:focus={(e) => {
								if (editorRef && !editorRef.innerText.trim()) {
									editorRef.classList.add('empty');
								}
							}}
							on:blur={(e) => {
								if (editorRef && !editorRef.innerText.trim()) {
									editorRef.classList.add('empty');
								}
							}}
						>
							<!-- Content will be inserted here -->
						</div>
					</div>
				{:else}
					<!-- Document Upload Tab -->
					<div class="bg-white border-2 border-black rounded-lg overflow-hidden">
						<!-- Page Title for Upload Tab -->
						<div class="px-6 py-4 border-b-2 border-black">
							<h2 class="text-2xl font-bold mb-4" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Submit Article</h2>
						</div>
						
						<!-- Document Title -->
						<div class="px-6 py-4 border-b-2 border-black flex items-center gap-3">
							{#if isTitleEditing}
								<input
									bind:this={titleInputRef}
									bind:value={documentTitle}
									on:blur={saveTitle}
									on:keydown={(e) => e.key === 'Enter' && saveTitle()}
									placeholder="Enter a title"
									class="flex-1 text-xl font-bold focus:outline-none placeholder:text-gray-400"
									style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;"
								/>
							{:else}
								<h2 class="flex-1 text-xl font-bold {!documentTitle ? 'text-gray-400' : ''}" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">{documentTitle || 'Enter a title'}</h2>
								<button
									on:click={startTitleEdit}
									class="p-1 hover:bg-gray-100 rounded transition-colors"
								>
									<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
									</svg>
								</button>
							{/if}
						</div>

						<!-- Upload Area -->
						<div class="px-6 py-16 text-center">
							{#if uploadedFile}
								<div class="mb-6">
									<p class="text-lg font-semibold mb-2" style="font-family: 'Space Grotesk', sans-serif;">{uploadedFileName}</p>
									<button
										on:click={() => { uploadedFile = null; uploadedFileName = ''; }}
										class="text-primary hover:text-primary-dark text-sm font-medium"
										style="font-family: 'Space Grotesk', sans-serif;"
									>
										Remove File
									</button>
								</div>
							{:else}
								<img src="/upload.png" alt="Upload" class="mx-auto mb-6 max-w-md" />
								<p class="text-xl font-semibold mb-2" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">No document uploaded yet</p>
								<p class="text-gray-600 mb-6" style="font-family: 'Space Grotesk', sans-serif;">Upload your file to get started. Supported formats: PDF, DOCX, or TXT.</p>
								<label class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary-dark transition-all duration-300 rounded cursor-pointer btn-press shadow-md hover:shadow-lg">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
									</svg>
									<span style="font-family: 'Space Grotesk', sans-serif;">Upload File</span>
									<input
										type="file"
										accept=".pdf,.docx,.txt"
										on:change={handleFileUpload}
										class="hidden"
									/>
								</label>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<!-- Sidebar -->
			<div class="w-full lg:w-80 space-y-6">
				<!-- Hidden form for submission -->
				<form bind:this={submitForm} method="POST" action="?/submitWork" use:enhance={handleSubmitEnhance} class="hidden" enctype="multipart/form-data">
				</form>
				
				<!-- Action Buttons -->
				<div class="flex flex-col gap-3">
					<button
						on:click={saveDraft}
						disabled={loading}
						class="w-full px-6 py-3 border-2 border-black hover:bg-gray-50 transition-all duration-300 font-medium disabled:opacity-50"
						style="font-family: 'Space Grotesk', sans-serif;"
					>
						Save to draft
					</button>
					<button
						on:click={submitWork}
						disabled={loading}
						class="w-full px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50"
						style="font-family: 'Space Grotesk', sans-serif;"
					>
						{#if loading}
							<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span>Submitting...</span>
						{:else}
							<span>Submit Work</span>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						{/if}
					</button>
				</div>

				<!-- Work Details -->
				<div class="bg-white border-2 border-black rounded-lg p-6">
					<h3 class="text-lg font-bold mb-4" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Work Details</h3>
					
					<div class="space-y-4">
						<!-- Work Type -->
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Work Type <span class="text-orange-500">*</span></label>
							<select
								bind:value={workType}
								class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
								style="font-family: 'Space Grotesk', sans-serif;"
							>
								<option>Article</option>
								<option>Proposal</option>
								<option>Research Paper</option>
							</select>
						</div>

						<!-- Topic -->
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Topic <span class="text-orange-500">*</span></label>
							<select
								bind:value={topic}
								class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
								style="font-family: 'Space Grotesk', sans-serif;"
							>
								<option value="">Topic</option>
								<option>Technology</option>
								<option>Art</option>
								<option>Climate</option>
								<option>Politics</option>
								<option>Energy</option>
								<option>Science</option>
							</select>
						</div>

						<!-- Summary -->
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Summary <span class="text-orange-500">*</span></label>
							<textarea
								bind:value={summary}
								placeholder="Enter a short summary (10 words)"
								rows="3"
								class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
								style="font-family: 'Space Grotesk', sans-serif;"
							></textarea>
						</div>
					</div>
				</div>

				<!-- Author(s) -->
				<div class="bg-white border-2 border-black rounded-lg p-6">
					<h3 class="text-lg font-bold mb-4" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Author(s)</h3>
					
					<div class="space-y-3">
						{#each authors as author, index}
							<div class="flex items-center justify-between">
								<span class="text-sm" style="font-family: 'Space Grotesk', sans-serif;">
									{author.name} {index === 0 ? '(you)' : ''}
								</span>
								{#if index > 0}
									<button
										on:click={() => authors = authors.filter((_, i) => i !== index)}
										class="text-red-600 hover:text-red-800 text-sm"
									>
										Remove
									</button>
								{/if}
							</div>
						{/each}

						<select
							bind:value={selectedAuthorId}
							class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							<option value="">Select Author</option>
							{#each availableAuthors as author}
								<option value={author.id}>{author.name} {author.email ? `(${author.email})` : ''}</option>
							{/each}
						</select>

						<button
							on:click={() => {
								if (selectedAuthorId && !authors.find(a => a.id === selectedAuthorId)) {
									const authorToAdd = availableAuthors.find(a => a.id === selectedAuthorId);
									if (authorToAdd) {
										authors = [...authors, authorToAdd];
										selectedAuthorId = '';
									}
								}
							}}
							disabled={!selectedAuthorId || authors.find(a => a.id === selectedAuthorId) !== undefined}
							class="w-full text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
							style="font-family: 'Space Grotesk', sans-serif;"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
							</svg>
							Add Author +
						</button>
					</div>
				</div>

				<!-- Cover Image -->
				<div class="bg-white border-2 border-black rounded-lg p-6">
					<h3 class="text-lg font-bold mb-4" style="font-weight: 900; font-family: 'Space Grotesk', sans-serif;">Cover Image <span class="text-orange-500">*</span></h3>
					
					{#if coverImagePreview}
						<div class="mb-4">
							<img src={coverImagePreview} alt="Cover" class="w-full h-48 object-cover rounded border-2 border-black" />
							<div class="flex items-center justify-between mt-2">
								<button
									on:click={removeCoverImage}
									class="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
									style="font-family: 'Space Grotesk', sans-serif;"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									Remove Image
								</button>
							</div>
						</div>
					{:else}
						<label class="block w-full px-4 py-3 border-2 border-dashed border-black rounded cursor-pointer hover:border-primary transition-colors text-center">
							<input
								type="file"
								accept="image/*"
								on:change={handleCoverImageUpload}
								class="hidden"
							/>
							<span class="text-sm text-gray-600" style="font-family: 'Space Grotesk', sans-serif;">Click to upload cover image</span>
						</label>
					{/if}

					<div class="mt-4">
						<label class="block text-sm font-medium text-gray-700 mb-2" style="font-family: 'Space Grotesk', sans-serif;">Image Alt Text</label>
						<input
							type="text"
							bind:value={imageAltText}
							placeholder="Enter alt text"
							class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
							style="font-family: 'Space Grotesk', sans-serif;"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global([contenteditable="true"]) {
		outline: none;
	}

	:global([contenteditable="true"]:focus) {
		outline: none;
	}

	.editor-placeholder:empty:before,
	.editor-placeholder.empty:before {
		content: attr(data-placeholder);
		color: #9ca3af;
		pointer-events: none;
	}

	.editor-placeholder:focus:empty:before,
	.editor-placeholder:focus.empty:before {
		color: #d1d5db;
	}

	:global(.prose h1) {
		font-size: 2.25rem;
		font-weight: 900;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		color: #000;
	}
	:global(.prose h2) {
		font-size: 1.875rem;
		font-weight: 900;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		color: #000;
	}
	:global(.prose h3) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		border-bottom: 2px solid #3b82f6;
		padding-bottom: 0.5rem;
		color: #000;
	}
	:global(.prose h4) {
		font-size: 1.25rem;
		font-weight: 700;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		color: #000;
	}
	:global(.prose h5) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		color: #000;
	}
	:global(.prose h6) {
		font-size: 1rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
		color: #000;
	}
	:global(.prose p) {
		margin-bottom: 1rem;
		line-height: 1.75;
		color: #000;
	}
	:global(.prose img) {
		max-width: 100%;
		height: auto;
		margin: 2rem 0;
		border-radius: 0.5rem;
	}
	:global(.prose strong) {
		font-weight: 700;
		color: #000;
	}
	:global(.prose em) {
		font-style: italic;
		color: #000;
	}
	:global(.prose ul, .prose ol) {
		margin-left: 1.5rem;
		margin-bottom: 1rem;
	}
	:global(.prose li) {
		margin-bottom: 0.5rem;
		color: #000;
	}
</style>
