<script lang="ts">
    import { getContext } from 'svelte';
	import type { PageProps } from './$types';
    import { TAGS } from "$lib/data/projects";
	import { Plus } from 'lucide-svelte';

	let { data }: PageProps = $props();

    let spacer: HTMLElement;

    let tags = Object.entries(TAGS)

	$effect(() => {
		let headerHeight = getContext('header_height');
		spacer.style.paddingTop = `${headerHeight}px`;
	});
</script>

<svelte:head>
	<title>Work | DakDot</title>
	<meta name="description" content="Work and projects by Dakdot creations" />
</svelte:head>

<div class="content-grid pt-[10vh] md:pt-[20vh]" bind:this={spacer}>
	<!-- Hero Section -->
	<section class="text-center sm:h-[30vh] grid place-content-center justify-items-center">
		<h1 class="title-2">Our Work</h1>
	</section>
</div>

<section class="py-32 content-grid">
    <div class="sticky top-0 hidden">
        <div class="grid sm:flex gap-x-3">
            {#each tags as tag }
                <button class="cursor-pointer bg-dark hover:bg-dark-lead/30 transition-all py-1.5 px-3 rounded-full">
                    <span>{tag[1].name}</span>
                </button>
            {/each}
        </div>
    </div>
    <div class="wrapper breakout @container">
        <div class="grid gap-6 @min-lg:grid-cols-2 @min-4xl:grid-cols-3">
            {#each data.projects as project}
            <a href="{`/work/${project.slug}`}">
                <article class="project-card group">
                    <div class="thumb">
                        {#if project.thumb.type === 'video'}
                            <video class="nail" src={project.thumb.src} autoplay loop muted></video>
                        {:else}
                            <img class="nail" src={project.thumb.src} alt={project.title} />
                            <div class="overlay">
                                <p>{project.industry.name}</p>
                            </div>
                        {/if}
                    </div>
                    <header>
                        <h3 class="title">{project.title}</h3>
                        <div class="plus-btn group-hover:bg-white group-hover:text-black">
                            <Plus />
                        </div>
                    </header>
                </article>
            </a>
            {/each}
        </div>
    </div>
</section>
<div>
</div>

<style>
    @reference "tailwindcss/theme";
    
    .project-card {
        display: grid;
        gap: 1rem;

        & .thumb{
            overflow: hidden;
            display: grid;
            place-content: center;
            position: relative;
            
            & .nail{
                aspect-ratio: 4/3;
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 1.5rem;

                transition: scale 1s ease-in-out;
            }


            & .overlay{
                position: absolute;
                bottom: -4rem;
                left: -3rem;
                width: fit-content;
                height: fit-content;
                background: var(--color-black);
                padding: .5rem 1rem;
                border-top-right-radius: 1rem;
                transition: all .5s ease-in-out;
            }

            &:hover {
                & .overlay{
                    bottom: 0;
                    left: 0;
                }
                & img {
                    scale: 1.05;
                }
            }
        }

        & header{
            display: flex;
            justify-content: space-between;
            column-gap: .75rem;
            
            & .title{
                font-size: 1.15rem;
                margin: auto 0;
            }
            
            & .plus-btn{
                @apply h-10 w-10 mt-auto;
                font-size: 1rem;
                aspect-ratio: 1/1;
                outline: 2px solid;
                display: grid;
                place-content: center;
                border-radius: 50%;
                rotate: 0;
                transition: all .375s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        }
    }
</style>
