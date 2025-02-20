<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import SplitType from 'split-type';
	import { ChevronDown } from 'lucide-svelte';

	gsap.registerPlugin(ScrollTrigger);

    let split_type:HTMLElement
    let scroller:HTMLElement

	function animation() {
        // Kill previous animations and ScrollTriggers for this element
        gsap.killTweensOf(split_type);
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === split_type) {
                trigger.kill();
            }
        });

        const text = new SplitType(split_type, { types: 'chars,words' });

        gsap.from(text.words, {
            scrollTrigger: {
                trigger: split_type,
                start: 'top 80%',
                end: 'top 60%',
                scrub: 2,
                markers: false,
                toggleActions: 'play play reverse reverse'
            },
            opacity: 0.05,
            scaleY: 0.75,
            y: 10,
            transformOrigin: 'bottom',
            stagger: 0.1,
            ease: 'power1.out'
        });
        gsap.from(scroller, {
            scrollTrigger: {
                trigger: split_type,
                start: 'top 40%',
                toggleActions: 'play play reverse reverse'
            },
            opacity: 0,
            y: 20,
            ease: 'power1.out'
        })
	}

	$effect(() => {
		animation()
	});
</script>

<section class="about grid relative items-center bg-white text-dark">
	<div class="absolutely content-grid items-center py-32">
		<div class="text-3xl xl:text-5xl">
			<div class="reveal-type">
                <span class="opacity-0">DAKDOT</span>
				<span bind:this={split_type}>
                    We are passionate about transforming ideas into visually stunning and impactful solutions.
				We creatively craft tailored services that help businesses grow, engage and inspire their
				audiences. We are committed to excellence and making a real difference. That's so us.
                </span>
                <span class="inline-flex ml-3" bind:this={scroller}>
                    <span class="rounded-full w-8 h-8 grid place-content-center aspect-square border mx-auto animation-down">
                        <ChevronDown />
                    </span>
                </span>
				<!-- <span class="font-bold">That’s so us, find out more below.</span> -->
			</div>
			<!-- <p class="text-gradient font-semibold mt-4"></p> -->
		</div>
	</div>
</section>

<style>
	.animation-down {
		animation: down 5s infinite;
	}

	@keyframes down {
		0% {
			transform: translateY(0);
			opacity: 1;
		}
		50% {
			transform: translateY(2rem);
			opacity: 0.375;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
