<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Cursor from '$lib/components/ui/Cursor.svelte';
	import '../app.css';

	import Lenis from 'lenis';
	import { stillMode } from '$lib/actions/motion';

	$effect(() => {
		// Reduced motion or ?still: the whole site renders at rest.
		if (stillMode()) {
			document.documentElement.classList.add('still');
			return;
		}
		// Smooth scrolling stays short.
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
