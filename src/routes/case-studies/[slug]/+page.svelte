<script lang="ts">
	import { getContext } from 'svelte';
	import type { PageProps } from './$types';
	import { ArrowRight } from 'lucide-svelte';

	let { data }: PageProps = $props();

	let spacer: HTMLElement;

	$effect(() => {
		let headerHeight = document.querySelector('.page-header')?.clientHeight;
		console.log(headerHeight);
		spacer.style.height = `${headerHeight}px`;
	});
</script>

<div
	class="min-h-screen relative grid overflow-hidden bg-cover bg-center"
	style="background-image: url({data.project.splash.src});"
>
	<div class="splash-content content-grid pb-16">
		<div bind:this={spacer}></div>
		<div class="breakoutx mt-32 grid md:grid-cols-2">
			<div>
				<div class="flex items-start gap-x-6">
                    <div>
                        <h2 class="lead-1">{data.project.title}</h2>
                        <div class="flex gap-x-3">
                            <span class="font-semibold">INDUSTRY:</span>
                            <span class="uppercase">{data.project.industry.name}</span>
                        </div>
                    </div>
                    {#if data.project.link}
					<a href="https://{data.project.link.url}" target="_blank">
						<div class="plus-btn hover:bg-white hover:text-black">
							<ArrowRight class="-rotate-45" />
						</div>
					</a>
                    {/if}
				</div>
				<ul class="flex flex-wrap gap-3 mt-6">
					{#each data.project.tags as tag}
						<li class="uppercase text-sm p-1.5 bg-red-900 w-fit rounded-xs">
							<span>{tag.name}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<p class="text-lead text-lg">{@html data.project.overview}</p>
			</div>
		</div>
		<div class="mt-16 grid">
			{#if data.project.splash.type === 'image'}
				<img
					src={data.project.splash.src}
					alt={data.project.title}
					class="object-cover rounded-2xl w-full fade-in-up"
                    class:apsect-video={!data.project.splash.fill}
				/>
			{/if}
		</div>
	</div>
</div>
<div class="hidden @xl:grid-cols-2 @5xl:grid-cols-3"></div>
<div class="pb-32">
	<div class="content-grid gap-y-12 @container">
		{#each data.project.sections as section}
			{#if section.type === 'images'}
			<section class="grid gap-y-8 mt-12">
				{#if section.title}
				<h2 class="text-3xl text-gradient font-semibold text-center">{section.title}</h2>
				{/if}
				<div
					class="grid gap-6"
					class:@xl:grid-cols-2={section.cols === 2 || section.cols === 3}
					class:@5xl:grid-cols-3={section.cols === 3}
				>
					{#each section.images as image}
						<img
							src={`${data.project.mediaPath}${image}`}
							alt={image.alt}
							class="object-cover rounded-2xl w-full fade-in-up"
							class:aspect-square={section.fit}
						/>
					{/each}
				</div>
			</section>
			{/if}
			{#if section.type === 'images-sm'}
			<section class="grid gap-y-8 mt-12">
				{#if section.title}
				<h2 class="text-3xl text-gradient font-semibold text-center">{section.title}</h2>
				{/if}
				<div
					class="grid gap-6 max-w-[60rem] mx-auto"
					class:@xl:grid-cols-2={section.cols === 2 || section.cols === 3}
					class:@5xl:grid-cols-3={section.cols === 3}
				>
					{#each section.images as image}
						<img
							src={`${data.project.mediaPath}${image}`}
							alt={image.alt}
							class="object-cover rounded-2xl w-full fade-in-up"
							class:aspect-square={section.fit}
						/>
					{/each}
				</div>
			</section>
			{/if}
			{#if section.type === 'paragraph'}
				<section class="grid gap-y-8 mt-12">
					{#if section.title}
					<h2 class="text-3xl text-gradient font-semibold text-center">{section.title}</h2>
					{/if}
					<div class="max-w-xl mx-auto text-lead text-lg">
						{@html section.body}
					</div>
				</section>
			{/if}
			{#if section.type === 'list'}
				<section class="grid gap-y-8 mt-12">
					{#if section.title}
					<h2 class="text-3xl text-gradient font-semibold text-center">{section.title}</h2>
					{/if}
					<div>
						<ul class="text-lg space-y-6 max-w-xl mx-auto text-lead">
							{#each section.list_items as item}
								<li>{@html item}</li>
							{/each}
						</ul>
					</div>
				</section>
			{/if}
		{/each}
	</div>
</div>

<style>
    @reference "tailwindcss/theme";

	.splash-content {
		position: relative;
		background-image: linear-gradient(to top, var(--color-black), #0c0c0cee);
		backdrop-filter: blur(8px);
	}

	.lead-1 {
		font-size: 2.15rem;
		text-transform: uppercase;
		font-weight: 700;

		color: var(--color-white);
	}

	img {
		max-width: 100%;
	}

	.plus-btn {
		@apply h-10 w-10 mt-1;
		font-size: 1rem;
		aspect-ratio: 1/1;
		outline: 2px solid;
		display: grid;
		place-content: center;
		border-radius: 50%;
		rotate: 0;
		transition: all 0.375s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        /* &:hover {
            @apply
        } */
	}
</style>
