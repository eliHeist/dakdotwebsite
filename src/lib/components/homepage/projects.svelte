<script lang="ts">
	import { gsap } from 'gsap';
	import type { PageProps } from './$types';

	let { projects }: PageProps = $props();

	let container: HTMLElement;

	$effect(() => {
		let projectCards = container.querySelectorAll('.project');

		projectCards.forEach((card, i) => {
			let img = card.querySelector('figure img');
			let details = card.querySelector('.project-details h3');
			let categories = card.querySelectorAll('.categories .category');

			gsap.set(card, { y: 200 });
			gsap.set(img, { scale: 1.25 });
			gsap.set(details, { opacity: 0 });
			gsap.set(categories, { x: 50, opacity: 0 });

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: img,
					start: '-50 95%',
					end: '+=500',
					scrub: 1,
                    toggleActions: 'play play reverse reverse',
				}
			});

			tl.to(card, {
				y: 0,
				ease: 'power1.inOut',

                duration: .8,
			});
			tl.to(
				img,
				{
					scale: 1,
					ease: 'power1.inOut'
				},
				'<'
			);
			tl.to(details, {
				opacity: 1,
				ease: 'power1.inOut'
			},
            '<');
			tl.to(
				categories,
				{
					x: 0,
					opacity: 1,
					stagger: 0.1,
                    duration: 3,
					ease: 'power1.inOut'
				},
				'<'
			);
		});

		// transitions
		if (window.innerWidth > 768) {
			const projects = container.querySelectorAll('.project');

			projects.forEach((project) => {
				project.addEventListener('mouseenter', () => {
					gsap.to(projects, {
						scale: 0.9,
						opacity: 0.7,
						filter: 'grayscale(100%)',
						duration: 0.3
					});
					gsap.to(project, {
						scale: 1.05,
						opacity: 1,
						filter: 'grayscale(0%)',
						duration: 0.5
					});
				});

				project.addEventListener('mouseleave', () => {
					gsap.to(projects, {
						scale: 1,
						opacity: 1,
						filter: 'grayscale(0%)',
						duration: 0.3
					});
				});
			});
		}
	});
</script>

<!-- Featured projects -->
<section class="py-40 content-grid bg-black">
	<h2 class="title-1 text-center">Featured <br />work</h2>
	<div class="project-list mt-16" bind:this={container}>
		{#each projects as project, i}
        <div class="project-{i + 1} p-6 border border-lead/20">
            <a href="#">
                <div class="project  @container flex flex-col">
                    <figure class="rounded-xl flex-1 overflow-hidden">
                        <img src={project.imageSrc} alt={project.name} class=" object-cover" />
                    </figure>
                    <div class="project-details mt-3 flex items-center gap-x-3 justify-between">
                        <h3 class="font-medium text-lg">{project.name}</h3>
                        <div class="flex overflow-hidden gap-x-1.5 @max-sm:hidden categories">
                            {#each project.categories as category}
                                <div class="category p-1.5 bg-dark rounded-md">
                                    <span>{category}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </a>
        </div>
		{/each}
	</div>
</section>

<style>
	.project-list {
		display: grid;
		grid-template-columns: 1fr;
		/* row-gap: 1.5rem; */
		grid-template-areas:
			'a'
			'b'
			'c'
			'd'
			'e';
        
        border-collapse: collapse;

        & a{
            text-decoration: none;
        }
	}

	.project-1 {
        grid-area: a;
        border-top-right-radius: 1.5rem;
        border-top-left-radius: 1.5rem;
	}

	.project-2 {
		grid-area: b;
	}

	.project-3 {
		grid-area: c;
	}

	.project-4 {
		grid-area: d;
	}

	.project-5 {
		grid-area: e;
        border-bottom-right-radius: 1.5rem;
        border-bottom-left-radius: 1.5rem;
	}

	@media (min-width: 40rem) {
		.project-list {
			grid-template-columns: 1fr 1fr;
			/* gap: 1.5rem; */
			grid-template-areas:
				'a a'
				'b c'
				'd e';
		}

        .project-4 {
            border-bottom-left-radius: 1.5rem;
        }
        .project-5 {
            border-bottom-left-radius: 0rem;
        }
	}

	@media (min-width: 48rem) {
		.project-list {
			grid-template-columns: repeat(6, 1fr);
			/* gap: 2rem; */
			grid-template-areas:
				'a a a a b b'
				'a a a a c c'
				'd d d e e e';
		}
        .project-1 {
            border-top-right-radius: 0rem;
        }
        .project-2 {
            border-top-right-radius: 1.5rem;
        }
	}

	@media (min-width: 64rem) {
		.project-list {
			grid-template-columns: repeat(6, 1fr);
			/* gap: 3rem; */
			grid-template-areas:
				'a a a a b b'
				'a a a a c c'
				'd d d e e e';
		}
	}

	.projects-list:has(.project:hover) {
	}
</style>
