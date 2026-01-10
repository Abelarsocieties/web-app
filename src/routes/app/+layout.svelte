<script lang="ts">
	import AuthedHeader from '$lib/components/AuthedHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AuthedHeader user={data.user} />
<slot />
<Footer />
