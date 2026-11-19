<script lang="ts">
	import NetworkMap from '$lib/components/network/NetworkMap.svelte';
	import LineRows from '$lib/components/network/LineRows.svelte';
	import StationIndex from '$lib/components/network/StationIndex.svelte';
	import BookCall from '$lib/components/network/BookCall.svelte';
	import { LINE_IDS, LINES, lineCounts } from '$lib/data/network';
	import { whatsappHref } from '$lib/data/contact';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const stations = $derived(data.stations);
	const counts = $derived(lineCounts(stations));
</script>

<svelte:head>
	<title>Dakdot: brand, software and motion, built as one system</title>
	<meta
		name="description"
		content="Dakdot is a digital studio in Kampala building web applications, brand identities and motion as one connected system."
	/>
</svelte:head>

<section class="hero" aria-labelledby="hero-h">
	<div class="copy">
		<h1 id="hero-h">We build the systems your business grows on.</h1>
		<div class="lower">
			<p class="sub">
				Dakdot is a digital studio in Kampala. We design brands and build software as one connected
				system, so every part of your business works with the others.
			</p>
			<div class="ctas">
				<a class="btn primary" href="#book" data-cursor="Let's talk">
					Book a call
					<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
				</a>
				<a class="btn ghost" href={whatsappHref} target="_blank" rel="noopener" data-cursor="Chat">
					<svg class="wa" viewBox="0 0 24 24" aria-hidden="true"
						><path
							d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17.2c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1 1 12 19.7Z"
						/></svg
					>
					WhatsApp us
				</a>
			</div>
		</div>
	</div>

	<div class="network">
		<NetworkMap {stations} />
		<ul class="legend" aria-label="Service lines">
			{#each LINE_IDS as id}
				<li>
					<a href={LINES[id].href}>
						<i style="background: var({LINES[id].colorVar})"></i>
						<span class="ln">{LINES[id].name}</span>
						<span class="lc tnum">
							{counts[id] ? `${counts[id]} on the map` : LINES[id].summary}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<LineRows {stations} />

<StationIndex {stations} />

<BookCall />

<style>
	.hero {
		max-width: 88rem;
		margin: 0 auto;
		min-height: 100svh;
		padding: 7.5rem 1.5rem 3rem;
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		align-items: center;
		gap: 2rem 3rem;
	}
	.copy {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.5rem;
		padding-bottom: 1rem;
	}
	h1 {
		font-size: clamp(2.75rem, 5.6vw, 5.5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 0.96;
		text-wrap: balance;
		margin-top: 1rem;
	}
	.sub {
		font-size: 1.15rem;
		line-height: 1.55;
		color: var(--color-mute);
		max-width: 40ch;
	}
	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.95rem 1.5rem;
		border-radius: 999px;
		font-weight: 600;
		text-decoration: none;
		transition:
			background 0.25s var(--ease-out),
			border-color 0.25s var(--ease-out),
			transform 0.25s var(--ease-out);
	}
	.btn svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		transition: transform 0.3s var(--ease-out);
	}
	.btn:active {
		transform: scale(0.98);
	}
	.primary {
		background: var(--color-signal);
		color: #fff;
	}
	.primary:hover {
		background: var(--color-signal-hover);
	}
	.primary:hover svg {
		transform: translateX(4px);
	}
	.ghost {
		border: 1px solid var(--color-rule);
		color: var(--color-paper);
	}
	.ghost:hover {
		border-color: #25d366;
	}
	.ghost .wa {
		width: 1.15rem;
		height: 1.15rem;
		fill: #25d366;
		stroke: none;
	}

	.network {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.legend {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 2rem;
		justify-content: flex-end;
	}
	.legend a {
		display: grid;
		grid-template-columns: 1.5rem auto;
		column-gap: 0.6rem;
		align-items: center;
		color: inherit;
		text-decoration: none;
	}
	.legend i {
		height: 4px;
		border-radius: 2px;
		grid-row: span 2;
	}
	.ln {
		font-weight: 600;
		font-size: 0.95rem;
	}
	.lc {
		font-size: 0.8rem;
		color: var(--color-mute);
	}
	.legend a:hover .ln {
		text-decoration: underline;
	}

	@media (max-width: 960px) {
		.hero {
			grid-template-columns: 1fr;
			min-height: auto;
			padding-top: 6.5rem;
		}
		.copy {
			gap: 1.25rem;
		}
		.legend {
			justify-content: flex-start;
		}
	}
</style>
