<script lang="ts">
	import { LINE_IDS, LINES, lineCounts, type Station } from '$lib/data/network';

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

<section id="lines" class="wrap" aria-labelledby="lines-h">
	<h2 id="lines-h">Three lines, one system.</h2>
	<p class="lede">
		Every project rides one or more of our lines. Where they meet, software and design are planned
		together, so nothing gets handed off and lost.
	</p>

	<ol class="rows">
		{#each LINE_IDS as id}
			{@const line = LINES[id]}
			<li style="--c: var({line.colorVar})">
				<a href={line.href} class="row" data-cursor="Ride line">
					<span class="track" aria-hidden="true">
						{#each line.capabilities as _, i}
							<i style="left:{12 + i * 26}%"></i>
						{/each}
					</span>
					<span class="name">{line.name}</span>
					<span class="desc">{copy[id]}</span>
					<span class="caps">
						{#each line.capabilities as cap}<span>{cap}</span>{/each}
					</span>
					<span class="count tnum">
						{#if counts[id]}
							{counts[id]} {counts[id] === 1 ? 'project' : 'projects'} on the map
						{:else}
							See the service
						{/if}
						<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
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
		padding: 7rem 1.5rem 5rem;
	}
	h2 {
		font-size: clamp(2.25rem, 5vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1;
		max-width: 14ch;
		text-wrap: balance;
	}
	.lede {
		margin-top: 1.25rem;
		max-width: 52ch;
		color: var(--color-mute);
		font-size: 1.125rem;
		line-height: 1.55;
	}
	.rows {
		margin-top: 3.5rem;
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--color-rule);
	}
	.row {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(0, 3fr);
		grid-template-areas:
			'track track track'
			'name desc count'
			'name caps count';
		column-gap: 2rem;
		row-gap: 0.75rem;
		padding: 0 0 2.25rem;
		border-bottom: 1px solid var(--color-rule);
		color: inherit;
		text-decoration: none;
	}
	.track {
		grid-area: track;
		position: relative;
		height: 2.25rem;
	}
	.track::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 4px;
		margin-top: -2px;
		border-radius: 2px;
		background: var(--c);
		transform-origin: left;
		transform: scaleX(0.18);
		transition: transform 0.7s var(--ease-out);
	}
	.track i {
		position: absolute;
		top: 50%;
		width: 11px;
		height: 11px;
		margin: -5.5px 0 0 -5.5px;
		border-radius: 50%;
		background: var(--color-ink);
		border: 3px solid var(--c);
		opacity: 0;
		transition:
			opacity 0.3s var(--ease-out),
			transform 0.3s var(--ease-out);
		transform: scale(0.4);
	}
	.row:hover .track::before,
	.row:focus-visible .track::before {
		transform: scaleX(1);
	}
	.row:hover .track i,
	.row:focus-visible .track i {
		opacity: 1;
		transform: scale(1);
	}
	.row:hover .track i:nth-child(2) {
		transition-delay: 80ms;
	}
	.row:hover .track i:nth-child(3) {
		transition-delay: 160ms;
	}
	.row:hover .track i:nth-child(4) {
		transition-delay: 240ms;
	}

	.name {
		grid-area: name;
		font-size: clamp(1.75rem, 3.2vw, 2.75rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.05;
	}
	.desc {
		grid-area: desc;
		color: var(--color-mute);
		line-height: 1.55;
		max-width: 48ch;
	}
	.caps {
		grid-area: caps;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.25rem;
		font-size: 0.9rem;
	}
	.caps span::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		margin-right: 0.5rem;
		border-radius: 50%;
		border: 2px solid var(--c);
		vertical-align: 0.1em;
	}
	.count {
		grid-area: count;
		justify-self: end;
		align-self: start;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		font-weight: 500;
	}
	.count svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		transition: transform 0.3s var(--ease-out);
	}
	.row:hover .count svg {
		transform: translateX(4px);
	}

	@media (max-width: 820px) {
		.row {
			grid-template-columns: 1fr;
			grid-template-areas: 'track' 'name' 'desc' 'caps' 'count';
		}
		.count {
			justify-self: start;
		}
		.track::before {
			transform: scaleX(1);
		}
		.track i {
			opacity: 1;
			transform: scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.track::before,
		.track i {
			transition: none;
		}
	}
</style>
