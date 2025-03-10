<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import '../app.ts';

	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import Footer from './Footer.svelte';

    import { page } from "$app/stores";
    import { fly } from "svelte/transition";

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
	});

	let { children, data } = $props();
</script>

<div class="app bg-black">
	<Header />

    <!-- <div class="fixed inset-0 h-screen w-screen bg-dark z-50"
    in:fly={{ y: "-100%", duration: 1000 }}
    out:fly={{ y: "100%", duration: 500 }}>

    </div> -->
	<main class="bg-black z-10"> 
		{@render children()}
	</main>

    {#key $page.url.pathname}
    <Footer />
    {/key}
    
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
