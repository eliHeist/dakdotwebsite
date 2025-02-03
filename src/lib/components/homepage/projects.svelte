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
			<div class="project project-{i}">
				<img src={project.imageSrc} alt={project.name} />
				<div class="project-details">
					<h3>{project.name}</h3>
					<p>Categories: {project.categories.join(', ')}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.project-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.project {
		width: calc(25% - 1rem);
		aspect-ratio: 1 / 1;
		overflow: hidden;
		border-radius: 0.5rem;
	}

	.project img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
