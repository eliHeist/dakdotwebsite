<script lang="ts">
	import Button from '../ui/button.svelte';
	import { gsap } from 'gsap';

    let preloaderElement: HTMLElement

	$effect(() => {
        let animation = gsap.timeline({
            scrollTrigger: {
                trigger: preloaderElement,
                start: "0%",
                end: "100%",
            }
        })
		function preloader(timeline: GSAPTimeline) {
            timeline.fromTo(preloaderElement,
                {clipPath: 'circle(5%)'},
                {clipPath: 'circle(75%)', duration: 1, ease: 'power1.inOut'}
            )
		}

        preloader(animation)
	});
</script>

<section class="loader fixed z-50 inset-0 bg-white grid place-content-center hidden" bind:this={preloaderElement}>
	<div class="w-40 h-40 animate-pulse">
		<svg class="w-full animate-spin" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="96" height="96" fill="#D9D9D900" fill-opacity="0.49"/>
            <g clip-path="url(#clip0_516_184)">
            <path d="M48 76C63.464 76 76 63.464 76 48C76 32.536 63.464 20 48 20C32.536 20 20 32.536 20 48C20 63.464 32.536 76 48 76Z" fill="#0C0C0C"/>
            <path d="M74 13C76.2091 13 78 11.2091 78 9C78 6.79086 76.2091 5 74 5C71.7909 5 70 6.79086 70 9C70 11.2091 71.7909 13 74 13Z" fill="#0C0C0C"/>
            </g>
            <defs>
            <clipPath id="clip0_516_184">
            <rect width="58" height="71" fill="white" transform="translate(20 5)"/>
            </clipPath>
            </defs>
        </svg>            
	</div>
</section>

<section class="grid items-end -z-10 h-[100svh] full-width">
	<div class="grid content-grid">
		<div class="relative">
			<svg
				class="w-full absolute top-0 left-0 z-[-1]"
				viewBox="0 0 905 460"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M905 453.5C905 453.5 702.909 453.5 453 453.5C203.091 453.5 0 453.5 0 453.5C0 203.039 202.591 0 452.5 0C702.409 0 905 203.039 905 453.5Z"
					fill="#FDFEFD"
				/>
				<path
					d="M905 459.5C905 459.5 702.909 459.5 453 459.5C203.091 459.5 0 459.5 0 459.5C0 209.039 202.591 6 452.5 6C702.409 6 905 209.039 905 459.5Z"
					fill="#0C0C0C"
				/>
			</svg>

			<div class="text-center w-full z-[3] px-10 mt-20 sm:mt-32 md:mt-40 lg:mt-56">
				<div
					class="grid text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-7xl text-white font-light"
				>
					<h2 class="font-bold">Brand Design</h2>
					<h3>with excellence</h3>
				</div>
				<p class="mt-4 text-lg text-lead max-w-md mx-auto">
					Innovative design solutions for technology firms and emerging businesses weary of the
					typical aesthetic methodology, Arriving shortly.
				</p>
				<div class="mt-12">
					<a href="#">
						<Button text="What do we do?" />
					</a>
				</div>
			</div>
		</div>
	</div>
	<div class="bg-black h-[5vh] relative"></div>
</section>
