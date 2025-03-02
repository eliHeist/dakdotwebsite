<script lang="ts">
    import { getContext } from 'svelte';
    import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let spacer: HTMLElement;

	$effect(() => {
		let headerHeight = getContext('header_height');
		spacer.style.paddingTop = `${headerHeight}px`;
	});
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About Dakdot creations" />
</svelte:head>

<div class="content-grid pt-[10vh] md:pt-[20vh]" bind:this={spacer}>
	<!-- Hero Section -->
	<section class="text-center h-[50vh] grid place-content-center justify-items-center">
		<h1 class="title-2">We are a Digital Agency specialized in custom business solutions</h1>
	</section>
</div>
