<script lang="ts">
    import { gsap } from "gsap";
    
	let steps = [
		{
			title: 'Discovery & Strategy',
			description:
				'Every journey starts with a conversation. We take the time to understand your brand, goals, and challenges. Through research and strategy, we define the roadmap to bring your vision to life.'
		},
		{
			title: 'Design & Development',
			description:
				'With a clear direction, we craft engaging, thoughtful, and innovative solutions. Every element is designed with precision, balancing creativity with functionality to transform concepts into seamless, high-quality experiences.'
		},
		{
			title: 'Testing',
			description:
				'Quality is non-negotiable. We review, test, and optimize to ensure everything functions flawlessly. From fine-tuning details to enhancing performance, this stage guarantees that the final result meets the highest standards.'
		},
		{
			title: 'Delivery and Support',
			description:
				'Once perfected, the project is deployed with confidence. But delivery isn’t the end—it’s the beginning of growth. We provide support and continuous improvements, ensuring long-term success in an ever-evolving digital world.'
		}
	];

    let stepsWrapper: HTMLElement

	$effect(() => {
		const items = stepsWrapper.querySelectorAll('.step') as NodeList;

		items.forEach((item: any) => {

            const bar = item.querySelector(".bar") as HTMLElement

            let timeline = gsap.timeline({
                scrollTrigger: {
					trigger: item,
					start: "top 90%",
					end: "bottom 70%",
					scrub: true,
					markers: false,
					toggleActions: 'play play reverse reverse'
				}
            })

            gsap.set(item, {y:200, opacity:0})
            gsap.set(bar, {width:"0%", transformOrigin:"left"})

			timeline.to(item, {
				opacity: 1,
				y: 0,
				ease: 'power1.out',
			})
            timeline.to(bar, {
                width: "100%",
                ease: 'power1.out'
            }, "<")
		});
	});
</script>

<section class="content-grid bg-black py-24">
	<header class="pb-16">
		<h2 class="title-1">How we <br />Work?</h2>
	</header>
	<div class="steps grid gap-y-24" bind:this={stepsWrapper}>
		{#each steps as step, index}
			<div class="step">
				<div class="number grid content-start mt-1">
					<div
						class="rounded-full h-8 aspect-square grid place-content-center text-red text-4xl font-medium"
					>
						{index + 1}
					</div>
				</div>
				<div class="hidden px-4 md:grid items-center relative">
					<div class="bar"></div>
				</div>
				<header class="grid content-center max-w-xl">
					<h3 class="text-4xl">{step.title}</h3>
				</header>
				<div class="spacer md:col-span-2"></div>
				<div class="description text-lead text-lg max-w-xl">
					<p>{step.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.step {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;

		@media (width >= 48rem /* 768px */) {
			grid-template-columns: auto 1fr auto;
		}

		& .bar {
			background: linear-gradient(90.89deg, #fff192 0.25%, #ffa5aa 97.84%);
			border-radius: 2rem;
			height: 2px;
		}
	}
</style>
