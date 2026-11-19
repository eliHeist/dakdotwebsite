<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Cursor from '$lib/components/network/Cursor.svelte';
	import '../app.css';
	import '../app.ts';

	import Lenis from 'lenis';
	import { setContext } from 'svelte';

	// Older pages pad themselves by the fixed header's height (4.5rem).
	setContext('header_height', 72);

	$effect(() => {
		// Smooth scrolling stays short and is skipped entirely for reduced motion.
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const lenis = new Lenis({ duration: 0.9 });
		let id = 0;
		const raf = (time: number) => {
			lenis.raf(time);
			id = requestAnimationFrame(raf);
		};
		id = requestAnimationFrame(raf);
		return () => {
			cancelAnimationFrame(id);
			lenis.destroy();
		};
	});

	let { children } = $props();
</script>

<a class="skip" href="#main">Skip to content</a>

<div class="app">
	<Header />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
</div>

<Cursor />

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: var(--color-ink);
	}
	main {
		flex: 1;
		width: 100%;
	}
	.skip {
		position: absolute;
		left: 1rem;
		top: -3rem;
		z-index: 300;
		padding: 0.6rem 1rem;
		border-radius: 8px;
		background: var(--color-paper);
		color: var(--color-ink);
		font-weight: 600;
		text-decoration: none;
	}
	.skip:focus {
		top: 1rem;
	}
</style>
