<script lang="ts">
    import { getContext } from 'svelte';
	import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    let spacer: HTMLElement;

	$effect(() => {
		let headerHeight = document.querySelector('.page-header')?.clientHeight;
        console.log(headerHeight)
		spacer.style.height = `${headerHeight}px`;
	});
</script>

<div class="min-h-screen relative grid overflow-hidden bg-cover bg-center"
    style="background-image: url({data.project.splash.src});"
>
    <div class="splash-content content-grid pb-16">
        <div bind:this={spacer}></div>
        <div class="breakoutx mt-32 grid md:grid-cols-2">
            <div>
                <h2 class="lead-1">{data.project.title}</h2>
                <div class="flex gap-x-3">
                    <span class="font-semibold">INDUSTRY:</span>
                    <span class="uppercase">{data.project.industry.name}</span>
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
                <p class="text-lead text-lg">{data.project.overview}</p>
            </div>
        </div>
        <div class="mt-16 grid">
            {#if data.project.splash.type === 'image'}
                <img src={data.project.splash.src} alt={data.project.title} class="object-cover rounded-2xl aspect-video w-full fade-in-up" />
            {/if}
        </div>
    </div>
</div>
<div class="hidden @xl:grid-cols-2 @5xl:grid-cols-3"></div>
<div class="pb-32">
    <div class="content-grid gap-y-12 @container">
        {#each data.project.sections as section}
            {#if section.type === 'images'}
            <div class="grid gap-6" 
            class:@xl:grid-cols-2={section.cols === 2 || section.cols === 3} 
            class:@5xl:grid-cols-3={section.cols === 3}>
                {#each section.images as image}
                    <img src={`${data.project.mediaPath}${image}`} alt={image.alt} class="object-cover rounded-2xl w-full fade-in-up" class:aspect-square={section.fit} />
                {/each}
            </div>
                <!-- {#if section.cols === 1}
                <div class="grid gap-6">
                    {#each section.images as image}
                        <img src={`${data.project.mediaPath}${image}`} alt={image.alt} class="object-cover rounded-2xl w-full fade-in-up" class:aspect-square={section.fit} />
                    {/each}
                </div>
                {:else if section.cols === 2}
                <div class="grid md:grid-cols-2 gap-6">
                    {#each section.images as image}
                        <img src={`${data.project.mediaPath}${image}`} alt={image.alt} class="object-cover rounded-2xl fade-in-up" class:aspect-square={section.fit} />
                    {/each}
                </div>
                {/if}
                {:else if section.cols === 3}
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each section.images as image}
                        <img src={`${data.project.mediaPath}${image}`} alt={image.alt} class="object-cover rounded-2xl fade-in-up" class:aspect-square={section.fit} />
                    {/each}
                </div>
                {/if} -->
            {/if}
        {/each}
    </div>
</div>

<style>
    .splash-content{
        position: relative;
        background-image: linear-gradient(to top, var(--color-black), #0c0c0cee);
        backdrop-filter: blur(8px);
    }

    .lead-1{
        font-size: 2.15rem;
        text-transform: uppercase;
        font-weight: 700;
        
		color: var(--color-white);
    }

    img{
        max-width: 100%;
    }
</style>