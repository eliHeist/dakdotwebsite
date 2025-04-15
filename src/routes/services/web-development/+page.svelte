<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageProps } from './$types';
	import StepCard from '$lib/components/ui/stepCard.svelte';
	import FeatureCard from '$lib/components/ui/featureCard.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import AccordionItem from '$lib/components/ui/accordion-item.svelte';
	import { Star } from 'lucide-svelte';
	import WelcomeText from '$lib/components/services/welcomeText.svelte';

	let { data }: PageProps = $props();

	let spacer: HTMLElement;

	$effect(() => {
		let headerHeight = getContext('header_height');
		spacer.style.paddingTop = `${headerHeight}px`;
	});
</script>

<div class="hero full-width sticky top-0 h-screen grid place-content-center -z-10">
    <img src="/svgs/red-half-tone.svg" alt="" class="object-cover h-full w-full lg:opacity-90 absolute -z-10">
    <h1 class="title-3 [backdrop-filter:shadow(0_4px_4px_rgba(255,0,0,0.75)]">Custom <br /> Solutions <br />on The Web</h1>
</div>
<div class="content-grid bg-black z-10" bind:this={spacer}>
	<!-- Hero Section -->

	<section class="py-8 mt-28">
		<div class="scroller" data-direction="right" data-speed="fast" data-animated="true">
			<div class="scroller__inner gap-x-3">
				{#each data.products as word}
					<div class="px-3 flex gap-x-2 items-center w-max">
						<Star class="fill-red stroke-red h-4" />
						<span>{word}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-32">
		<div class="grid gap-y-16 sm:grid-cols-5 lg:grid-cols-6">
			<div class="sm:col-span-2 fade-in-up">
				<div class="flex gap-x-3">
					<div class="bg-white h-16 aspect-square rounded-full"></div>
					<div class="font-medium grid content-center">
						<h3 class="text-[1.1rem]">Elijah Triumph A</h3>
						<p class="text-lead/80">CTO DakDot</p>
					</div>
				</div>
			</div>
			<div class="sm:col-span-3 lg:col-span-4">
				<div class="text-2xl lg:text-4xl font-medium fade-in-up">
                    <WelcomeText>
                        <span class="opacity-0">Businesses</span>In today’s digital world, businesses need more than just a website—they need powerful, interactive web applications that automate operations, store information and define operations systems.
                    </WelcomeText>
				</div>
			</div>
		</div>
	</section>

	<section class="py-32">
		<h2 class="title-3 mb-12 fade-in">Our Process</h2>
		<div class="grid gap-x-6 gap-y-12 process">
			{#each data.process as step, i}
				<StepCard number={i + 1} title={step.name} body={step.description} />
			{/each}
		</div>
	</section>

	<section class="py-32">
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.features as feature, i}
				<FeatureCard title={feature.name} body={feature.description} icon={feature.svg} />
			{/each}
		</div>
	</section>

	<div class="py-32">
		<div class="grid gap-y-16 gap-x-8 sm:grid-cols-5 lg:grid-cols-6">
			<div class="sm:col-span-2 fade-in-top">
				<div class="p-6 rounded-2xl rounded-tr-[0] outline outline-lead grid gap-y-10">
					<div class="flex gap-x-3">
						<div class="bg-white h-12 aspect-square rounded-full"></div>
						<div class="font-medium grid content-center">
							<h3 class="">Elijah Triumph A</h3>
							<p class="text-lead/80 text-sm">CTO DakDot</p>
						</div>
					</div>
					<p>
						Have more questions or would love to say hi and talk. Feel free to connect on LinkedIn
					</p>
					<a href="https://www.linkedin.com/in/elijahtriumph/" class="grid">
						<button
							class="px-6 py-3 text-lg font-medium text-white bg-blue rounded-lg [text-decoration:none]"
						>
							Connect on LinkedIn
						</button>
					</a>
				</div>
			</div>
			<div class="sm:col-span-3 lg:col-span-4">
				<div class="accordion grid w-[90%] mx-auto">
					{#each data.faq as { question, answer }, i}
						<AccordionItem {question} {answer} {i} />
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="py-32">
		<h2 class="title-3 mb-12 fade-in">Our Tech Stack</h2>
		<div class="gap-3 flex flex-wrap justify-center md:gap-6 lg:gap-12">
			{#each data.technologies as technology}
				<div
					class="rounded-full border border-lead h-40 w-40 md:h-48 md:w-48 grid place-content-center fade-in-up"
				>
					<div class="grid justify-center justify-items-center text-center">
						<img src={technology.svg} alt="" class="h-16" />
						<p>{technology.name}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- CTA Section -->
	<section class="py-32">
		<div
			class="bg-gradient-to-tr from-15% from-[#FF4B56] to-red to-75% py-32 px-6 rounded-4xl grid place-content-center"
		>
			<div class="bg-white text-dark text-center p-16 rounded-2xl w-fit max-w-[500px] grid gap-y-6">
				<h2 class="text-3xl font-medium">Ready To Discuss your Project with us?</h2>
				<p>
					Great ideas deserve great execution. Let’s collaborate and turn your concept into
					something extraordinary.
				</p>
				<a href="/contact">
					<button
						class="px-6 py-3 text-lg font-medium text-white bg-red rounded-lg [text-decoration:none]"
					>
						Lets Get Started
					</button>
				</a>
			</div>
		</div>
	</section>
</div>

<style>
	.process {
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	}
</style>
