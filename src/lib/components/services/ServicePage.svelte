<script lang="ts">
	import type { Component } from 'svelte';
	import { LINES, type LineId } from '$lib/data/network';
	import type { Person } from '$lib/data/team';
	import { whatsappHref } from '$lib/data/contact';
	import { reveal, splitWords } from '$lib/actions/motion';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import WhatsAppIcon from '$lib/components/ui/WhatsAppIcon.svelte';

	type Step = { name: string; description: string };
	type Feature = { name: string; description: string };
	type Faq = { question: string; answer: string };
	type Tech = { name: string; svg: string };

	type Props = {
		id: LineId;
		title: string[];
		intro: string;
		introBy: Person;
		contactBy: Person;
		visual: Component;
		process: Step[];
		features: Feature[];
		faq: Faq[];
		technologies: Tech[];
		products: string[];
		toolsHeading?: string;
	};
	let {
		id,
		title,
		intro,
		introBy,
		contactBy,
		visual: Visual,
		process,
		features,
		faq,
		technologies,
		products,
		toolsHeading = 'Tools we use'
	}: Props = $props();

	const line = $derived(LINES[id]);
	// Red and blue carry white text; yellow carries ink.
	const darkField = $derived(id !== 'motion');
	const btn = $derived(darkField ? 'light' : 'ink') as 'light' | 'ink';
</script>

{#snippet wa()}<WhatsAppIcon />{/snippet}

<div style="--f: var({line.colorVar}); --on: var({line.onColorVar})">
	<section class="hero" aria-labelledby="svc-h">
		<div class="hero-in">
			<div class="copy">
				<h1 id="svc-h" aria-label={title.join(' ')}>
					{#each title as t, i}<span class="ln" style="--i:{i}" aria-hidden="true">{t}</span>{/each}
				</h1>
				<ul class="chips" aria-label="What we deliver">
					{#each products as p}<li>{p}</li>{/each}
				</ul>
				<div class="ctas">
					<RollButton label="Book a call" href="/contact" variant={btn} cursor="Let's talk" />
					<a class="see" href="/case-studies">See our work</a>
				</div>
			</div>
			<div class="visual"><Visual /></div>
		</div>
	</section>

	<section class="wrap intro" aria-label="Introduction">
		<figure class="by" use:reveal>
			<img src={introBy.image} alt="" />
			<figcaption>
				<b>{introBy.name}</b>
				<span>{introBy.role}, Dakdot</span>
			</figcaption>
		</figure>
		<p class="statement" use:splitWords>{intro}</p>
	</section>

	<section class="wrap" aria-labelledby="proc-h">
		<h2 id="proc-h" class="sec-h" use:splitWords>How we work</h2>
		<ol class="steps">
			{#each process as step, i}
				<li use:reveal={i * 50}>
					<span class="n tnum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<span class="sn">{step.name}</span>
					<span class="sd">{step.description}</span>
				</li>
			{/each}
		</ol>
	</section>

	<section class="wrap" aria-labelledby="feat-h">
		<h2 id="feat-h" class="sec-h" use:splitWords>What you get</h2>
		<div
			class="features"
			style="--cols: {features.length === 4 ? 2 : Math.min(features.length, 3)}"
		>
			{#each features as f, i}
				<div class="feat" use:reveal={i * 80}>
					<h3>{f.name}</h3>
					<p>{f.description}</p>
				</div>
			{/each}
		</div>
	</section>

	{#if technologies.length}
		<section class="wrap" aria-labelledby="tools-h">
			<h2 id="tools-h" class="sec-h" use:splitWords>{toolsHeading}</h2>
			<ul class="tools">
				{#each technologies as t, i}
					<li use:reveal={(i % 6) * 40}>
						<img src={t.svg} alt="" loading="lazy" />
						<span>{t.name}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<section class="wrap faq" aria-labelledby="faq-h">
		<div class="faq-side">
			<h2 id="faq-h" class="sec-h" use:splitWords>Questions, answered</h2>
			<div class="person" use:reveal>
				<img src={contactBy.image} alt="" />
				<div>
					<b>{contactBy.name}</b>
					<span>{contactBy.role}, Dakdot</span>
				</div>
				<p>Have another question, or just want to say hi? Connect on LinkedIn.</p>
				{#if contactBy.linkedin}
					<RollButton
						label="Connect on LinkedIn"
						href={contactBy.linkedin}
						external
						variant="ghost"
						cursor="Say hi"
					/>
				{/if}
			</div>
		</div>
		<div class="qs">
			{#each faq as item, i}
				<details open={i === 0}>
					<summary>
						<span>{item.question}</span>
						<i aria-hidden="true"></i>
					</summary>
					<p>{item.answer}</p>
				</details>
			{/each}
		</div>
	</section>

	<section class="wrap" aria-labelledby="cta-h">
		<div class="cta" use:reveal>
			<h2 id="cta-h">Ready to talk about your project?</h2>
			<p>Tell us what you're building and we'll set up a call, or message us on WhatsApp.</p>
			<div class="ctas">
				<RollButton label="Book a call" href="/contact" variant={btn} size="lg" />
				<RollButton
					label="WhatsApp us"
					href={whatsappHref}
					external
					variant={btn}
					size="lg"
					icon={wa}
				/>
			</div>
		</div>
	</section>
</div>

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	/* ---------- Hero: the service's own colour field ---------- */
	.hero {
		background: var(--f);
		color: var(--on);
		border-radius: 0 0 32px 32px;
		overflow: hidden;
	}
	.hero-in {
		max-width: 88rem;
		margin: 0 auto;
		min-height: 100svh;
		padding: 6.5rem 1.5rem 3rem;
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		align-items: center;
		gap: 2rem 4rem;
	}
	.copy {
		align-self: end;
		display: grid;
		gap: 2rem;
	}
	h1 {
		font-size: clamp(3rem, 7.2vw, 7.25rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.92;
	}
	.ln {
		display: block;
	}
	@media (prefers-reduced-motion: no-preference) {
		.ln {
			animation: rise 0.9s var(--ease-out) both;
			animation-delay: calc(var(--i) * 70ms);
		}
	}
	@keyframes rise {
		from {
			translate: 0 0.25em;
			opacity: 0.35;
		}
	}
	.chips {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
	.chips li {
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0.35rem 0.8rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--on) 35%, transparent);
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem;
	}
	.see {
		color: inherit;
		font-weight: 600;
		text-decoration: none;
		background: linear-gradient(currentColor, currentColor) no-repeat 0 100% / 100% 1px;
		padding-bottom: 2px;
		transition: background-size 0.4s var(--ease-out);
	}
	.see:hover {
		background-size: 0% 1px;
		background-position: 100% 100%;
	}
	.visual {
		width: 100%;
		max-width: 40rem;
		justify-self: end;
	}

	/* ---------- Intro ---------- */
	.intro {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
		gap: 2rem 4rem;
		padding-top: 8rem;
		padding-bottom: 4rem;
	}
	.by {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		align-self: start;
	}
	.by img,
	.person img {
		width: 3.75rem;
		height: 3.75rem;
		border-radius: 50%;
		object-fit: cover;
		object-position: top;
		background: var(--color-ink-3);
	}
	.by figcaption,
	.person div {
		display: grid;
		font-size: 0.95rem;
	}
	.by span,
	.person span {
		color: var(--color-mute);
		font-size: 0.85rem;
	}
	.statement {
		font-size: clamp(1.6rem, 3.2vw, 2.85rem);
		font-weight: 600;
		letter-spacing: -0.025em;
		line-height: 1.2;
		text-wrap: pretty;
	}

	.sec-h {
		font-size: clamp(2.25rem, 5vw, 4.25rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1;
		padding-top: 6rem;
		margin-bottom: 2.5rem;
	}

	/* ---------- Process: rows that take the service colour on hover ---------- */
	.steps {
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--color-rule);
	}
	.steps li {
		display: grid;
		grid-template-columns: 5rem minmax(0, 4fr) minmax(0, 6fr);
		gap: 1.5rem;
		align-items: baseline;
		padding: 1.75rem 1.25rem;
		border-bottom: 1px solid var(--color-rule);
		border-radius: 16px;
		transition:
			background 0.35s var(--ease-out),
			color 0.35s var(--ease-out);
	}
	.steps li:hover {
		background: var(--f);
		color: var(--on);
	}
	.n {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--color-mute);
	}
	.steps li:hover .n,
	.steps li:hover .sd {
		color: var(--on);
	}
	.sn {
		font-size: clamp(1.35rem, 2.2vw, 1.85rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}
	.sd {
		color: var(--color-mute);
		line-height: 1.55;
		transition: color 0.35s var(--ease-out);
	}

	/* ---------- Features ---------- */
	.features {
		display: grid;
		grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr));
		gap: 2.5rem;
	}
	.feat {
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-rule);
	}
	.feat h3 {
		font-size: clamp(1.5rem, 2.4vw, 2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
	}
	.feat p {
		margin-top: 0.6rem;
		color: var(--color-mute);
		line-height: 1.55;
		max-width: 36ch;
	}

	/* ---------- Tools ---------- */
	.tools {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.tools li {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.6rem 1.1rem 0.6rem 0.7rem;
		border-radius: 999px;
		border: 1px solid var(--color-rule-strong);
		font-weight: 500;
		transition: border-color 0.3s var(--ease-out);
	}
	.tools li:hover {
		border-color: var(--color-paper);
	}
	/* The logo set is drawn in light grey for a dark ground: shown straight on ink. */
	.tools img {
		width: 1.75rem;
		height: 1.75rem;
		object-fit: contain;
	}

	/* ---------- FAQ ---------- */
	.faq {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 2rem 5rem;
	}
	.person {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0.9rem 1rem;
		max-width: 26rem;
	}
	.person p {
		grid-column: 1 / -1;
		color: var(--color-mute);
		line-height: 1.55;
	}
	.person :global(.btn) {
		grid-column: 1 / -1;
		justify-self: start;
	}
	.qs {
		padding-top: 6rem;
	}
	details {
		border-bottom: 1px solid var(--color-rule);
	}
	details:first-child {
		border-top: 1px solid var(--color-rule);
	}
	summary {
		list-style: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		padding: 1.4rem 0;
		font-size: 1.15rem;
		font-weight: 600;
		cursor: pointer;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary i {
		position: relative;
		flex: none;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		border: 1px solid var(--color-rule-strong);
		transition:
			background 0.3s var(--ease-out),
			border-color 0.3s var(--ease-out);
	}
	summary i::before,
	summary i::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 12px;
		height: 1.6px;
		margin: -0.8px 0 0 -6px;
		background: currentColor;
		transition: rotate 0.35s var(--ease-out);
	}
	summary i::after {
		rotate: 90deg;
	}
	details[open] summary i {
		background: var(--color-paper);
		border-color: var(--color-paper);
		color: var(--color-ink);
	}
	details[open] summary i::after {
		rotate: 0deg;
	}
	details p {
		padding: 0 3.5rem 1.5rem 0;
		color: var(--color-mute);
		line-height: 1.6;
		max-width: 62ch;
	}

	/* ---------- Closing field ---------- */
	.cta {
		margin: 8rem 0 6rem;
		padding: clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4.5rem);
		border-radius: 32px;
		background: var(--f);
		color: var(--on);
		display: grid;
		gap: 1.5rem;
		justify-items: start;
	}
	.cta h2 {
		font-size: clamp(2.5rem, 7vw, 6.5rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.95;
		max-width: 12ch;
		text-wrap: balance;
	}
	.cta p {
		font-size: 1.15rem;
		line-height: 1.55;
		max-width: 44ch;
	}
	.cta :global(.ic svg) {
		filter: none;
	}

	@media (max-width: 960px) {
		.hero-in {
			grid-template-columns: 1fr;
			min-height: auto;
			padding-top: 6rem;
		}
		.visual {
			justify-self: center;
			order: -1;
			max-width: min(30rem, 84%);
		}
		.copy {
			gap: 1.5rem;
		}
		/* On phones the action comes before the list of deliverables. */
		.copy .chips {
			order: 2;
		}
		.intro,
		.faq {
			grid-template-columns: 1fr;
		}
		.qs {
			padding-top: 0;
		}
		.features {
			grid-template-columns: 1fr;
		}
		.steps li {
			grid-template-columns: 3rem 1fr;
		}
		.sd {
			grid-column: 2;
		}
	}
</style>
