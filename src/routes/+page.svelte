<script lang="ts">
	import { onMount } from 'svelte';
	import LivingDot from '$lib/components/hero/LivingDot.svelte';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import ServiceRows from '$lib/components/home/ServiceRows.svelte';
	import WorkList from '$lib/components/home/WorkList.svelte';
	import Contact from '$lib/components/home/Contact.svelte';
	import WhatsAppIcon from '$lib/components/ui/WhatsAppIcon.svelte';
	import { whatsappHref } from '$lib/data/contact';
	import { stillMode } from '$lib/actions/motion';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const stations = $derived(data.stations);

	// Two words roll: what we do, and what it grows. They sit at line ends so nothing reflows,
	// and flip half a beat apart so the headline never changes all at once.
	const verbs = ['design', 'build', 'craft'];
	const words = ['business.', 'brand.', 'product.', 'startup.'];
	let v = $state(0);
	let w = $state(0);
	// Dot only invites a poke when it is actually alive.
	let alive = $state(false);
	onMount(() => {
		if (stillMode()) return;
		alive = true;
		const a = setInterval(() => (v = (v + 1) % verbs.length), 2400);
		let b = 0;
		const offset = setTimeout(() => {
			w = (w + 1) % words.length;
			b = window.setInterval(() => (w = (w + 1) % words.length), 2400);
		}, 1200);
		return () => {
			clearInterval(a);
			clearInterval(b);
			clearTimeout(offset);
		};
	});
	const past = (i: number, cur: number, n: number) => i === (cur + n - 1) % n;
</script>

<svelte:head>
	<title>Dakdot: we design, build and craft what grows your business</title>
	<meta
		name="description"
		content="Dakdot is a digital studio in Kampala. We design brands, build web applications and craft motion that work together."
	/>
</svelte:head>

{#snippet wa()}<WhatsAppIcon />{/snippet}

<section class="hero" aria-labelledby="hero-h">
	<div class="dot-slot"><LivingDot /></div>

	<h1 id="hero-h" aria-label="We design, build and craft what grows your business.">
		<span class="ln" aria-hidden="true"
			>We <span class="rot"
				>{#each verbs as word, i}<span class:on={i === v} class:past={past(i, v, verbs.length)}
						>{word}</span
					>{/each}</span
			></span
		>
		<span class="ln" aria-hidden="true">what grows</span>
		<span class="ln" aria-hidden="true"
			>your <span class="rot"
				>{#each words as word, i}<span class:on={i === w} class:past={past(i, w, words.length)}
						>{word}</span
					>{/each}</span
			></span
		>
	</h1>

	<div class="foot">
		<div class="pitch">
			<p class="sub">
				Dakdot is a digital studio in Kampala. We design brands, build software and craft motion
				that work together, so every part of your business pulls in the same direction.
			</p>
			<div class="ctas">
				<RollButton label="Book a call" href="#book" cursor="Let's talk" />
				<RollButton
					label="WhatsApp us"
					href={whatsappHref}
					external
					variant="ghost"
					cursor="Chat"
					icon={wa}
				/>
			</div>
		</div>
		{#if alive}
			<p class="nudge">That's Dot. It's been watching you.<br />Go on, give it a poke.</p>
		{:else}
			<p class="nudge">That's Dot, the dot in Dakdot.</p>
		{/if}
	</div>
</section>

<ServiceRows {stations} />

<WorkList {stations} />

<Contact />

<style>
	.hero {
		position: relative;
		max-width: 88rem;
		margin: 0 auto;
		min-height: 100svh;
		padding: 6.5rem 1.5rem 2.5rem;
		display: grid;
		grid-template-rows: 1fr auto;
		align-content: end;
		gap: 3rem;
	}
	.dot-slot {
		position: absolute;
		top: clamp(5.5rem, 12vh, 9rem);
		right: clamp(1.5rem, 6vw, 7rem);
		width: min(36vw, 33rem);
	}

	h1 {
		align-self: end;
		font-size: clamp(3.4rem, 9.4vw, 9rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.9;
	}
	.ln {
		display: block;
	}
	@media (prefers-reduced-motion: no-preference) {
		.ln {
			animation: rise 0.9s var(--ease-out) both;
		}
		.ln:nth-child(2) {
			animation-delay: 70ms;
		}
		.ln:nth-child(3) {
			animation-delay: 140ms;
		}
	}
	/* The line is visible from the first frame; it only settles upward. */
	@keyframes rise {
		from {
			translate: 0 0.25em;
			opacity: 0.35;
		}
	}

	/* Rolling word: each word slides up and out as the next slides in. */
	/*
	 * Rolling word, clipped to its own box. Padding inside the box makes room
	 * for tittles and descenders; the negative margin cancels it in the layout,
	 * so the clip never reaches into the neighbouring lines.
	 */
	.rot {
		display: inline-grid;
		vertical-align: bottom;
		overflow: hidden;
		padding: 0.1em 0.06em 0.16em 0;
		margin: -0.1em -0.06em -0.16em 0;
	}
	.rot > span {
		grid-area: 1 / 1;
		translate: 0 130%;
		transition: translate 0.75s var(--ease-out);
	}
	.rot > span.on {
		translate: 0 0;
	}
	.rot > span.past {
		translate: 0 -130%;
	}

	.foot {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 2rem;
		flex-wrap: wrap;
	}
	.sub {
		font-size: 1.15rem;
		line-height: 1.55;
		color: var(--color-mute);
		max-width: 44ch;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}
	.nudge {
		/* Two lines reserved so swapping in the live copy never reflows the hero. */
		min-height: 3em;
		display: flex;
		flex-direction: column;
		justify-content: end;
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--color-mute);
		text-align: right;
	}

	@media (max-width: 760px) {
		.hero {
			padding-top: 6rem;
			gap: 2rem;
		}
		.dot-slot {
			position: relative;
			top: auto;
			right: auto;
			justify-self: end;
			width: 58vw;
			margin-bottom: -18vw;
		}
		.hero {
			grid-template-rows: auto auto auto;
		}
		.nudge {
			text-align: left;
		}
	}
</style>
