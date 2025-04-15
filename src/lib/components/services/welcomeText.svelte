<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import SplitType from 'split-type';

	gsap.registerPlugin(ScrollTrigger);

    let split_type:HTMLElement
    let scroller:HTMLElement

    let { children } = $props();

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
                start: 'top 50%',
                // end: 'top 30%',
                // scrub: 2,
                markers: false,
                toggleActions: 'play play reverse reverse',
            },
            delay: 1,
            opacity: 0.2,
            transformOrigin: 'bottom',
            stagger: 0.1,
            ease: 'power1.in'
        });
	}

	$effect(() => {
		animation()
	});
</script>


<div bind:this={split_type}>{@render children()}</div>

<style>
	
</style>
