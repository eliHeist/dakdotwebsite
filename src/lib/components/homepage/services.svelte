<script lang="ts">
	import { Star, Computer } from 'lucide-svelte';
	import { gsap } from 'gsap';
	import { services } from '$lib/data/homepage';

	let tags = [
		{ name: 'UI/UX Design' },
		{ name: 'Product Visualization' },
		{ name: 'Brand Design' },
		{ name: 'Digital Marketing' },
		{ name: 'Web App Development' },
		{ name: 'Branding' },
		{ name: 'Motion Graphics' },
		{ name: 'Video Production' },
		{ name: 'Animation' },
		{ name: 'Photography' }
	];

	let servicesWrapper: HTMLElement;
	let servicesHeader: HTMLElement;

	// $effect(() => {
	// 	const cards = servicesWrapper.querySelectorAll('.service.card');
	// 	const rotations = [0, 2, -1.2, 1, -2, 1.5, 0.5, -0.7];

	// 	cards.forEach((card: any, index: number) => {
	// 		gsap.set(card, {
	// 			y: window.innerHeight,
	// 			rotate: rotations[index]
	// 		});
	// 	});

	// 	gsap.to(servicesHeader, {
	// 		scrollTrigger: {
	// 			trigger: servicesWrapper,
	// 			start: 'top top',
	// 			end: 'bottom top',
	// 			scrub: true
	// 		},
    //         scale: 0.6,
	// 		right: 0
	// 	});

	// 	scrollAnimation();

	// 	async function scrollAnimation() {
	// 		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
	// 		gsap.registerPlugin(ScrollTrigger);

	// 		ScrollTrigger.create({
	// 			trigger: servicesWrapper,
	// 			start: 'top top',
	// 			end: `+=${window.innerHeight * 4}px`,
	// 			pin: true,
	// 			pinSpacing: true,
	// 			scrub: 1,
	// 			onUpdate: (self) => {
	// 				const progress = self.progress;
	// 				const totalCards = cards.length;
	// 				const progressPerCard = 1 / totalCards;

	// 				cards.forEach((card, index) => {
	// 					const cardStart = index * progressPerCard;
	// 					let cardProgress = (progress - cardStart) / progressPerCard;
	// 					cardProgress = Math.min(Math.max(cardProgress, 0), 1);

	// 					let yPos = window.innerHeight * (1 - cardProgress);
	// 					let xPos = 0;

	// 					if (cardProgress === 1 && index < totalCards - 1) {
	// 						const remainingProgress =
	// 							(progress - (cardStart + progressPerCard)) / (1 - (cardStart + progressPerCard));

	// 						if (remainingProgress > 0) {
	// 							const distanceMultiplier = 1 - index * 0.15;

	// 							xPos = -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;

	// 							yPos = -window.innerHeight * 0.3 * distanceMultiplier * remainingProgress;
	// 						}
	// 					}

	// 					gsap.to(card, {
	// 						y: yPos,
	// 						x: xPos,
	// 						duration: 0,
	// 						ease: 'none'
	// 					});
	// 				});
	// 			}
	// 		});
	// 	}
	// });
</script>

<section class="content-grid bg-black py-24">
	<div
		class="services gap-y-12 full-width grid place-content-center relative h-screen"
		bind:this={servicesWrapper}
	>
		<header class="h-screen relative" bind:this={servicesHeader}>
			<h2 class="title-1 absolute w-max right-[50%] top-[50%] translate-y-[-50%] translate-x-[50%]">
				What we <br />Do for You?
			</h2>
		</header>
        <div class="relative overflow-hidden">
            {#each services as service, index}
                {#each service.sub_categories as category, i}
                    <article class="card service {service.class} border-2 w-[70%] sm:w-[23rem] md:w-[25rem] max-w-[90%] text-white bg-black/80">
                        <header class="text-2xl md:text-3xl font-bold p-4">
                            <h3>
                                {category.title}
                            </h3>
                        </header>
                        <div class="body">
                            <div class="flex-1 md:text-lg lg:text-xl">
                                <p class="text-lead">{category.description}</p>
                            </div>
                        </div>
                    </article>
                {/each}
            {/each}
        </div>
	</div>
	<section class="py-20 bg-black">
		<div class="scroller" data-direction="right" data-speed="fast">
			<div class="scroller__inner gap-x-3">
				{#each tags.slice(0, Math.ceil(tags.length / 2)) as tag}
					<div class="px-3 flex gap-x-2 items-center w-max">
						<Star class="fill-red stroke-red h-4" />
						<span>{tag.name}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="scroller" data-direction="left" data-speed="fast">
			<div class="scroller__inner gap-x-3">
				{#each tags.slice(Math.ceil(tags.length / 2)) as tag}
					<div class="px-3 flex gap-x-2 items-center w-max">
						<Star class="fill-red stroke-red h-4" />
						<span>{tag.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
</section>

<style>
	.card {
		display: grid;
		backdrop-filter: blur(20px);
		border-radius: 1rem;
		/* height: fit-content; */
		transform: translate(-50%, -50%);
        /* transform-origin: center; */
		overflow: hidden;

		position: absolute;
		top: 50%;
		left: 50%;

		& header {
			padding: 2rem;
		}

		& .body {
			padding: 0rem 2rem 2rem 2rem;
		}
	}
</style>
