<script lang="ts">
	import { gsap } from 'gsap';
    import type { PageProps } from './$types';

    let { projects }: PageProps = $props();

	let container: HTMLElement;

	// $effect(() => {
	// 	const { ScrollTrigger } = await import('gsap/ScrollTrigger');
	// 	gsap.registerPlugin(ScrollTrigger);

	// 	let tl = gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: container,
	// 			start: 'top top',
	// 			end: 'bottom top',
	// 			scrub: true
	// 		}
	// 	});

	// 	// Title animation
	// 	tl.to('h2', {
	// 		y: '50%',
	// 		scale: 1.2,
	// 		opacity: 0.8,
	// 		ease: 'none',
	// 		scrollTrigger: {
	// 			trigger: container,
	// 			start: 'top top',
	// 			scrub: true
	// 		}
	// 	});

	// 	// Projects cards animation
	// 	projects.forEach((project, i) => {
	// 		tl.fromTo(
	// 			`.project-${i}`,
	// 			{
	// 				x: '100%',
	// 				y: '100%',
	// 				opacity: 0
	// 			},
	// 			{
	// 				x: '0%',
	// 				y: '0%',
	// 				opacity: 1,
	// 				duration: 0.5,
	// 				ease: 'power1.inOut',
	// 				stagger: 0.2,
	// 				scrollTrigger: {
	// 					trigger: container,
	// 					start: 'top top',
	// 					end: 'bottom top',
	// 					scrub: true
	// 				}
	// 			},
	// 			'<'
	// 		);
	// 	});

	// 	// Ensure that everything scrolls away normally after the animation
	// 	gsap.set(container, { height: '200vh' });
	// });
</script>

<!-- Featured projects -->
<section class="py-40 content-grid bg-black">
	<h2 class="title-1 text-center">Featured <br />work</h2>
	<div class="project-list" bind:this={container}>
		{#each projects as project, i}
			<div class="project project-{i+1} @container flex flex-col">
				<img src={project.imageSrc} alt={project.name} class="rounded-xl flex-1 object-cover" />
				<div class="project-details mt-3 flex items-center gap-x-3 justify-between">
					<h3 class="font-medium text-lg">{project.name}</h3>
                    <div class="flex overflow-hidden gap-x-1.5 @max-sm:hidden">
                        {#each project.categories as category }
                            <div class="p-1.5 bg-dark rounded-md">
                                <span>{category}</span>
                            </div>
                        {/each}
                    </div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.project-list {
		display: grid;
        grid-template-columns: 1fr;
        row-gap: 1.5rem;
        grid-template-areas: 
            "a"
            "b"
            "c"
            "d"
            "e"
        ;
	}

    .project {
    }

    .project-1{
        grid-area: a;
    }

    .project-2{
        grid-area: b;
    }

    .project-3{
        grid-area: c;
    }

    .project-4{
        grid-area: d;
    }

    .project-5{
        grid-area: e;
    }

    @media (min-width: 40rem){
        .project-list {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            grid-template-areas: 
                "a a"
                "b c"
                "d e"
            ;
        }
    }

    @media (min-width: 48rem){
        .project-list {
            grid-template-columns: repeat(6, 1fr);
            gap: 2rem;
            grid-template-areas: 
                "a a a a b b"
                "a a a a c c"
                "d d d e e e"
            ;
        }
    }

    @media (min-width: 64rem){
        .project-list {
            grid-template-columns: repeat(6, 1fr);
            gap: 3rem;
            grid-template-areas: 
                "a a a a b b"
                "a a a a c c"
                "d d d e e e"
            ;
        }
    }
</style>
