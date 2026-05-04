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

        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: split_type,
                start: 'top 90%',
                // end: 'top 28%',
                // scrub: 2,
                markers: false,
                toggleActions: 'play play reverse reverse'
            },
            opacity: 0.01,
            y: 10,
            rotate: 10,
            // transformOrigin: 'bottom',
            stagger: 0.05,
            ease: 'power1.out'
        });
	}

	$effect(() => {
		animation()
	});
</script>

<section class="about grid relative items-center bg-white text-dark">
	<div class="absolutely content-grid items-center py-32">
		<div class="text-3xl xl:text-5xl">
			<div class="text-justify [line-height:120%]">
                <span class="opacity-0">DAKDOT</span>
				<span bind:this={split_type}>
                    We're Dakdot. A creative and technology studio built to help businesses show up well and run well. We design brands, build websites, and create custom systems that streamline how your team works.  <br>Business solutions all under one roof.
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
