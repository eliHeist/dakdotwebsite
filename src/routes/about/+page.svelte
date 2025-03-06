<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageProps } from './$types';

	import BentoBox from '$lib/components/illustrations/aboutpage/bentoBox.svelte';
	import WhatWeDoCard from '$lib/components/ui/WhatWeDoCard.svelte';

	let { data }: PageProps = $props();

	let spacer: HTMLElement;

	$effect(() => {
		let headerHeight = getContext('header_height');
		spacer.style.paddingTop = `${headerHeight}px`;
	});
</script>

<svelte:head>
	<title>About | DakDot</title>
	<meta name="description" content="About Dakdot creations" />
</svelte:head>

<div class="content-grid pt-[10vh] md:pt-[20vh]" bind:this={spacer}>
	<!-- Hero Section -->
	<section class="text-center h-[50vh] grid place-content-center justify-items-center">
		<h1 class="title-2">We are an Agency specialized in custom digital solutions</h1>
	</section>
</div>

<div class="content-grid py-32">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each data.services as service, i}
        <div class="fade-in-up grid place-content-center rounded-3xl outline-0 outline-dark group hidden">
            <img src={data.svgs[i]} alt={service.name} class="w-48 opacity-70 group-hover:opacity-100 transition-all duration-500" />
        </div>
        <div class="grid slide-in-up">
            <WhatWeDoCard title={service.name} description={service.description}  />
        </div>
        {/each}
    </div>
</div>

<BentoBox />

<section class="content-grid py-32 text-center">
    <div class="bg-gradient-to-tr from-15% from-[#1F1C1C] to-[#1F1C1D] to-75% py-32 px-6 rounded-4xl grid place-content-center">
        <h2 class="title-2 h-fit">Let’s Create the Future Together</h2>
        <p class="text-lg max-w-[80%] mx-auto mt-8">
            Whether you're a startup looking for a bold identity or an enterprise seeking cutting-edge
		digital solutions, Dakdot is here to push boundaries and make it happen.
        </p>
        <div class="mt-6">
            <a href="/contact" class="cursor-pointer">
                <button
                    class="px-6 py-3 text-lg font-medium text-black bg-white rounded-lg [text-decoration:none]"
                >
                    Lets Get Started
                </button>
            </a>
        </div>
    </div>
</section>


