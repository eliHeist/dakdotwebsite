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
	<!-- <section class="text-center h-[50vh] grid place-content-center justify-items-center">
		<h1 class="title-2">We are an Agency specialized in custom digital solutions</h1>
	</section> -->
</div>

<div class="content-grid py-32">
    <h2 class="title-3 mb-16">Who we are</h2>
    <div class="max-w-xl mx-auto text-lead text-lg text-justify">
        <p>At DakDot Creations, we believe in powerful digital solutions that drive business growth. Founded with a passion for creativity and technology, we have helped businesses across industries launch stunning websites, establish unforgettable brands, and scale through digital marketing.</p>
    </div>
</div>

<div class="content-grid py-32">
    <h2 class="title-3 mb-16">Why Choose Us?</h2>
    <div class="grid gap-y-12 gap-x-12 lg:gap-x-24 md:grid-cols-2 max-w-[60rem] mx-auto">
        <div class="rounded-full outline outline-dark-lead grid sm:grid-cols-2 md:grid-cols-1 gap-3 p-2">
            <div class="rounded-full bg-dark aspect-square grid text-center text-lead overflow-hidden transition-all [grid-template-rows:1fr_0fr] focus:[grid-template-rows:0fr_1fr] hover:[grid-template-rows:0fr_1fr]">
                <div class="content-main overflow-hidden grid place-content-center">
                    <span class="text-7xl text-white">5+</span>
                    <p>Years of experience</p>
                </div>
                <div class="content-alt overflow-hidden grid place-content-center">
                    <p class="max-w-[80%] mx-auto">Our team is comprised of experienced professionals for Graphics design, Web Development, 3D Animation, Motion Graphics, Photography and Videography.</p>
                </div>
            </div>
            <div class="rounded-full bg-dark aspect-square grid text-center text-lead overflow-hidden transition-all [grid-template-rows:1fr_0fr] focus:[grid-template-rows:0fr_1fr] hover:[grid-template-rows:0fr_1fr]">
                <div class="content-main overflow-hidden grid place-content-center">
                    <span class="text-4xl text-white">Results-driven<br/>Approach</span>
                    <!-- <p>Years of experience</p> -->
                </div>
                <div class="content-alt overflow-hidden grid place-content-center">
                    <p class="max-w-[75%] mx-auto">We focus on strategies that deliver measurable results, using data-driven techniques to optimize every aspect of your digital presence for business growth.</p>
                </div>
            </div>
        </div>
        <div class="rounded-full outline outline-dark-lead grid sm:grid-cols-2 md:grid-cols-1 gap-3 p-2">
            <div class="rounded-full bg-dark aspect-square grid text-center text-lead overflow-hidden transition-all [grid-template-rows:1fr_0fr] focus:[grid-template-rows:0fr_1fr] hover:[grid-template-rows:0fr_1fr]">
                <div class="content-main overflow-hidden grid place-content-center">
                    <span class="text-4xl text-white">Client-Focused<br/>Solutions</span>
                    <!-- <p>Years of experience</p> -->
                </div>
                <div class="content-alt overflow-hidden grid place-content-center">
                    <p class="max-w-[75%] mx-auto">We prioritize your needs, creating customized solutions tailored to your business, ensuring that our designs and strategies align with your goals and vision.</p>
                </div>
            </div>
            <div class="rounded-full bg-dark aspect-square grid text-center text-lead overflow-hidden transition-all [grid-template-rows:1fr_0fr] focus:[grid-template-rows:0fr_1fr] hover:[grid-template-rows:0fr_1fr]">
                <div class="content-main overflow-hidden grid place-content-center">
                    <span class="text-4xl text-white">Commitment<br/>to Excellence</span>
                    <!-- <p>Years of experience</p> -->
                </div>
                <div class="content-alt overflow-hidden grid place-content-center">
                    <p class="max-w-[75%] mx-auto">Our dedication to excellence ensures we never settle for mediocrity. We continually push boundaries to deliver top-tier services with exceptional attention to detail.</p>
                </div>
            </div>
        </div>
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


