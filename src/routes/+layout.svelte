<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import '../app.ts';

	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import Footer from './Footer.svelte';

	$effect(() => {
		// const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

		// Initialize a new Lenis instance for smooth scrolling
		const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time:number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

		// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
		// lenis.on('scroll', ScrollTrigger.update);

		// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
		// This ensures Lenis's smooth scroll animation updates on each GSAP tick
		// gsap.ticker.add((time) => {
		// 	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
		// });

		// Disable lag smoothing in GSAP to prevent any delay in scroll animations
		// gsap.ticker.lagSmoothing(0);
	});

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main class="bg-black">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
	}
</style>
