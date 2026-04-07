<script lang="ts">
	import AuthedHeader from '$lib/components/AuthedHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<AuthedHeader user={data.user} />
<slot />
<Footer />
