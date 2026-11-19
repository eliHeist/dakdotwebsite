<script lang="ts">
	import { LINE_IDS, LINES, lineCounts, type Station } from '$lib/data/network';
	import { reveal, splitWords } from '$lib/actions/motion';

	let { stations }: { stations: Station[] } = $props();

	const counts = $derived(lineCounts(stations));

	const copy: Record<string, string> = {
		web: 'Custom web applications, business systems and fast websites, built to run real operations, not just to sit online.',
		brand:
			'Identities designed as systems: logos, type, colour and rules that keep every touchpoint working together.',
		motion:
			'Animation, 3D and product visualisation that explain what you do and make launches land.'
	};
</script>

<section id="services" class="wrap" aria-labelledby="svc-h">
	<div class="intro">
		<h2 id="svc-h" use:splitWords>Here's how we help you grow.</h2>
		<p class="lede" use:reveal>
			Three teams under one roof, so your brand, your product and your motion all speak the same
			language.
		</p>
	</div>

	<ol class="rows">
		{#each LINE_IDS as id, i}
			{@const s = LINES[id]}
			<li
				class="field"
				style="--f: var({s.colorVar}); --on: var({s.onColorVar})"
				use:reveal={i * 60}
			>
				<a href={s.href} class="row" data-cursor="Explore">
					<span class="name">{s.name}</span>
					<span class="desc">{copy[id]}</span>
					<span class="caps">
						{#each s.capabilities as cap}<span>{cap}</span>{/each}
					</span>
					<span class="go">
						<span class="count tnum">
							{counts[id]
								? `${counts[id]} ${counts[id] === 1 ? 'project' : 'projects'}`
								: 'See the service'}
						</span>
						<span class="circle" aria-hidden="true">
							<svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
						</span>
					</span>
				</a>
			</li>
		{/each}
	</ol>
</section>

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 8rem 1.5rem 4rem;
	}
	.intro {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		align-items: end;
		gap: 1.5rem 4rem;
	}
	h2 {
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 0.98;
		text-wrap: balance;
	}
	.lede {
		color: var(--color-mute);
		font-size: 1.125rem;
		line-height: 1.55;
		max-width: 42ch;
		padding-bottom: 0.4rem;
	}

	.rows {
		margin-top: 4rem;
		list-style: none;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}
	.field {
		border-radius: 24px;
		background: var(--f);
		color: var(--on);
		overflow: hidden;
	}
	/* Scroll-in: the colour field wipes across instead of fading. */
	.field:global(.reveal-armed) {
		opacity: 1;
		translate: none;
		clip-path: inset(0 100% 0 0 round 24px);
		transition: clip-path 1s var(--ease-out);
		transition-delay: var(--reveal-delay, 0ms);
	}
	.field:global(.reveal-armed.is-in) {
		clip-path: inset(0 0 0 0 round 24px);
	}

	.row {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(0, 3fr);
		grid-template-areas:
			'name desc go'
			'name caps go';
		column-gap: 2rem;
		row-gap: 1rem;
		padding: 2.5rem 2.25rem;
		color: inherit;
		text-decoration: none;
		border-radius: 24px;
	}
	/* The field clips outside rings, so focus is drawn inside, in the field's own text colour. */
	.row:focus-visible {
		outline: 3px solid var(--on);
		outline-offset: -8px;
	}
	.name {
		grid-area: name;
		font-size: clamp(2rem, 3.6vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1;
		transition: translate 0.5s var(--ease-out);
	}
	.row:hover .name,
	.row:focus-visible .name {
		translate: 0.6rem 0;
	}
	.desc {
		grid-area: desc;
		line-height: 1.55;
		max-width: 48ch;
	}
	.caps {
		grid-area: caps;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
	.caps span {
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0.35rem 0.75rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--on) 30%, transparent);
		transition:
			background 0.3s var(--ease-out),
			color 0.3s var(--ease-out);
	}
	.row:hover .caps span {
		background: var(--on);
		color: var(--f);
	}
	.row:hover .caps span:nth-child(2) {
		transition-delay: 40ms;
	}
	.row:hover .caps span:nth-child(3) {
		transition-delay: 80ms;
	}
	.row:hover .caps span:nth-child(4) {
		transition-delay: 120ms;
	}
	.go {
		grid-area: go;
		justify-self: end;
		align-self: start;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		font-size: 0.9rem;
		font-weight: 600;
	}
	.circle {
		display: grid;
		place-items: center;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		background: var(--on);
		color: var(--f);
		transition: scale 0.4s var(--ease-out);
	}
	.circle svg {
		width: 1.2rem;
		height: 1.2rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		transition: rotate 0.4s var(--ease-out);
	}
	.row:hover .circle {
		scale: 1.12;
	}
	.row:hover .circle svg {
		rotate: -45deg;
	}

	@media (max-width: 860px) {
		.intro {
			grid-template-columns: 1fr;
		}
		.row {
			grid-template-columns: 1fr;
			grid-template-areas: 'name' 'desc' 'caps' 'go';
			padding: 2rem 1.5rem;
		}
		.go {
			justify-self: start;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.name,
		.caps span,
		.circle,
		.circle svg {
			transition: none;
		}
	}
</style>
