<script lang="ts">
	import { LINES } from '$lib/data/network';
	import { reveal, splitWords } from '$lib/actions/motion';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const s = $derived(data.study);
	const next = $derived(data.next);
</script>

<svelte:head>
	<title>{s.title} | Dakdot</title>
	<meta
		name="description"
		content={`${s.title}: ${s.lines.map((l) => LINES[l].name).join(' and ')} by Dakdot${s.industry ? ` for ${s.industry}` : ''}.`}
	/>
</svelte:head>

{#key s.slug}
	<article>
		<header class="wrap head">
			<a class="back" href="/case-studies">
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4" /></svg>
				All work
			</a>
			<h1 use:splitWords>{s.title}</h1>

			<dl class="facts">
				<div>
					<dt>Services</dt>
					<dd>{s.lines.map((l) => LINES[l].name).join(', ')}</dd>
				</div>
				{#if s.industry}
					<div>
						<dt>Industry</dt>
						<dd>{s.industry}</dd>
					</div>
				{/if}
				{#if s.client}
					<div>
						<dt>Client</dt>
						<dd>{s.client}</dd>
					</div>
				{/if}
				{#if s.year}
					<div>
						<dt>Year</dt>
						<dd class="tnum">{s.year}</dd>
					</div>
				{/if}
				{#if s.tags.length}
					<div>
						<dt>Deliverables</dt>
						<dd>{s.tags.join(', ')}</dd>
					</div>
				{/if}
			</dl>
			{#if s.link}
				<div class="visit">
					<RollButton
						label={`Visit ${s.link.label}`}
						href={s.link.url}
						external
						variant="light"
						cursor="Open"
					/>
				</div>
			{/if}
		</header>

		{#if s.splash}
			<figure class="wrap splash">
				{#if s.splash.type === 'video'}
					<video src={s.splash.src} poster={s.splash.poster} muted loop playsinline autoplay
					></video>
				{:else}
					<img src={s.splash.src} alt={s.splash.alt ?? s.title} />
				{/if}
			</figure>
		{/if}

		{#if s.overviewHtml || s.overviewText || s.goals.length}
			<section class="wrap two" aria-labelledby="ov-h">
				<h2 id="ov-h">The brief</h2>
				<div class="prose">
					{#if s.overviewHtml}
						<!-- Local, trusted content -->
						<p>{@html s.overviewHtml}</p>
					{:else if s.overviewText}
						{#each s.overviewText as p}<p>{p}</p>{/each}
					{/if}
					{#if s.goals.length}
						<h3>What we set out to do</h3>
						<ol class="goals">
							{#each s.goals as g}<li>{g}</li>{/each}
						</ol>
					{/if}
				</div>
			</section>
		{/if}

		{#each s.sections as sec}
			{#if sec.type === 'images'}
				<section class="wrap images" class:narrow={sec.narrow}>
					{#if sec.title}<h2 class="sec-h">{sec.title}</h2>{/if}
					<div class="imgs cols-{sec.cols}">
						{#each sec.images as img, i}
							<img src={img.src} alt={img.alt} loading="lazy" use:reveal={(i % sec.cols) * 70} />
						{/each}
					</div>
				</section>
			{:else if sec.type === 'paragraph'}
				<section class="wrap two">
					<h2>{sec.title ?? ''}</h2>
					<div class="prose" use:reveal>
						{#if sec.html}
							<!-- Local, trusted content -->
							{@html sec.html}
						{:else if sec.text}
							{#each sec.text as p}<p>{p}</p>{/each}
						{/if}
					</div>
				</section>
			{:else if sec.type === 'list'}
				<section class="wrap two">
					<h2>{sec.title ?? ''}</h2>
					<ul class="prose list" use:reveal>
						{#if sec.html}
							<!-- Local, trusted content -->
							{#each sec.html as item}<li>{@html item}</li>{/each}
						{:else if sec.text}
							{#each sec.text as item}<li>{item}</li>{/each}
						{/if}
					</ul>
				</section>
			{/if}
		{/each}

		{#if next}
			<nav class="wrap next" aria-label="Next project">
				<a href={next.href} data-cursor="Next">
					<span class="row">
						<span class="title"><span class="next-word">Next:</span> {next.title}</span>
						<span class="circle" aria-hidden="true">
							<svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
						</span>
					</span>
					<span class="thumb" aria-hidden="true">
						{#if next.thumb.type === 'image'}<img src={next.thumb.src} alt="" loading="lazy" />{/if}
					</span>
				</a>
			</nav>
		{/if}
	</article>
{/key}

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
	.head {
		padding-top: clamp(7.5rem, 16vh, 11rem);
		padding-bottom: 3rem;
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-mute);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.3s var(--ease-out);
	}
	.back svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		transition: translate 0.3s var(--ease-out);
	}
	.back:hover {
		color: var(--color-paper);
	}
	.back:hover svg {
		translate: -3px 0;
	}
	h1 {
		margin-top: 1.5rem;
		font-size: clamp(3rem, 9vw, 8.5rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.92;
		text-wrap: balance;
	}
	.facts {
		margin-top: 2.5rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-rule);
	}
	dt {
		font-size: 0.85rem;
		color: var(--color-mute);
	}
	dd {
		margin-top: 0.25rem;
		font-weight: 600;
	}
	.visit {
		margin-top: 2rem;
	}

	.splash img,
	.splash video {
		width: 100%;
		max-height: 88vh;
		object-fit: cover;
		border-radius: 24px;
		display: block;
		background: var(--color-ink-3);
	}

	.two {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
		gap: 1.5rem 4rem;
		padding-top: 6rem;
		padding-bottom: 2rem;
	}
	.two h2 {
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.05;
	}
	.prose {
		font-size: 1.15rem;
		line-height: 1.6;
		color: var(--color-mute);
		max-width: 62ch;
	}
	.prose :global(p + p) {
		margin-top: 1rem;
	}
	.prose h3 {
		margin-top: 2.5rem;
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--color-paper);
	}
	.goals {
		margin-top: 1rem;
		padding: 0;
		list-style: none;
		counter-reset: g;
		display: grid;
		gap: 0.9rem;
	}
	.goals li {
		counter-increment: g;
		display: grid;
		grid-template-columns: 2rem 1fr;
		gap: 0.5rem;
	}
	.goals li::before {
		content: counter(g, decimal-leading-zero);
		font-variant-numeric: tabular-nums;
		color: var(--color-paper);
		font-weight: 600;
		font-size: 0.95rem;
		padding-top: 0.15rem;
	}
	.list {
		padding: 0;
		list-style: none;
		display: grid;
		gap: 1rem;
	}
	.list li {
		padding-left: 1.4rem;
		position: relative;
	}
	.list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.6em;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-paper);
	}

	.images {
		padding-top: 1.5rem;
	}
	.images.narrow {
		max-width: 64rem;
	}
	.sec-h {
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		margin: 4rem 0 1.5rem;
	}
	.imgs {
		display: grid;
		gap: 1.5rem;
	}
	.cols-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.cols-3 {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	.imgs img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 24px;
		display: block;
		background: var(--color-ink-3);
	}

	.next {
		padding-top: 8rem;
		padding-bottom: 4rem;
	}
	.next a {
		position: relative;
		display: block;
		padding: 2.5rem 0;
		border-top: 1px solid var(--color-rule);
		border-bottom: 1px solid var(--color-rule);
		color: inherit;
		text-decoration: none;
	}
	.next-word {
		color: var(--color-mute);
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-top: 0.5rem;
	}
	.title {
		font-size: clamp(2.5rem, 7vw, 6.5rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.95;
		transition: translate 0.6s var(--ease-out);
	}
	.next a:hover .title {
		translate: 1rem 0;
	}
	.circle {
		flex: none;
		display: grid;
		place-items: center;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
		background: var(--color-paper);
		color: var(--color-ink);
		transition: scale 0.4s var(--ease-out);
	}
	.circle svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		transition: rotate 0.4s var(--ease-out);
	}
	.next a:hover .circle {
		scale: 1.1;
	}
	.next a:hover .circle svg {
		rotate: -45deg;
	}
	.thumb {
		position: absolute;
		right: 7rem;
		top: 50%;
		width: 15rem;
		aspect-ratio: 4 / 3;
		border-radius: 14px;
		overflow: hidden;
		translate: 0 -50%;
		opacity: 0;
		scale: 0.85;
		rotate: -4deg;
		pointer-events: none;
		transition:
			opacity 0.35s var(--ease-out),
			scale 0.5s var(--ease-out),
			rotate 0.5s var(--ease-out);
	}
	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.next a:hover .thumb {
		opacity: 1;
		scale: 1;
		rotate: 3deg;
	}

	@media (max-width: 860px) {
		.two {
			grid-template-columns: 1fr;
			padding-top: 4rem;
		}
		.cols-3 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.thumb {
			display: none;
		}
	}
	@media (max-width: 560px) {
		.cols-2,
		.cols-3 {
			grid-template-columns: 1fr;
		}
		.circle {
			width: 3.25rem;
			height: 3.25rem;
		}
	}
</style>
