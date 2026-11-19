<script lang="ts">
	import { LINE_IDS, LINES, lineCounts, type LineId } from '$lib/data/network';
	import { reveal, splitWords } from '$lib/actions/motion';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const stations = $derived(data.stations);
	const counts = $derived(lineCounts(stations));

	let filter = $state<LineId | 'all'>('all');
	const shown = $derived(
		filter === 'all' ? stations : stations.filter((s) => s.lines.includes(filter as LineId))
	);
</script>

<svelte:head>
	<title>Work | Dakdot</title>
	<meta
		name="description"
		content="Case studies from Dakdot: brand identities, packaging, web applications and motion for companies and founders."
	/>
</svelte:head>

<section class="wrap head" aria-labelledby="work-h">
	<h1 id="work-h" use:splitWords>Work we're proud of.</h1>
	<p class="lede">
		Brands, products and stories we've built with our clients. Pick a service to see the work behind
		it.
	</p>

	<div class="filters" role="group" aria-label="Filter by service">
		<button
			type="button"
			class:on={filter === 'all'}
			aria-pressed={filter === 'all'}
			onclick={() => (filter = 'all')}
		>
			All <span class="tnum">{stations.length}</span>
		</button>
		{#each LINE_IDS as id}
			<button
				type="button"
				class:on={filter === id}
				aria-pressed={filter === id}
				style="--f: var({LINES[id].colorVar}); --on: var({LINES[id].onColorVar})"
				disabled={counts[id] === 0}
				title={counts[id] === 0 ? `No ${LINES[id].name} case studies on the site yet` : undefined}
				onclick={() => (filter = id)}
			>
				{LINES[id].name} <span class="tnum">{counts[id]}</span>
			</button>
		{/each}
	</div>
</section>

<section class="wrap" aria-label="Projects">
	{#if shown.length}
		<ul class="grid" aria-live="polite">
			{#each shown as s, i (s.slug)}
				<li class:tall={i % 3 === 0} use:reveal={(i % 2) * 80}>
					<a
						href={s.href}
						target={s.external ? '_blank' : undefined}
						rel={s.external ? 'noopener' : undefined}
						class="card"
						data-cursor={s.kind === 'product' ? 'Open' : 'View'}
					>
						<div class="media">
							{#if s.thumb.type === 'video'}
								<video src={s.thumb.src} poster={s.thumb.poster} muted loop playsinline autoplay
								></video>
							{:else}
								<img src={s.thumb.src} alt={s.thumb.alt ?? ''} loading={i < 2 ? 'eager' : 'lazy'} />
							{/if}
						</div>
						<div class="meta">
							<h2>{s.title}</h2>
							<p>
								{[s.lines.map((l) => LINES[l].name).join(' + '), s.industry]
									.filter(Boolean)
									.join(' · ')}
							</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="empty">
			<p class="empty-h">Nothing here yet.</p>
			<p>
				We don't have {filter !== 'all' ? LINES[filter].name : ''} case studies on the site yet. Ask us
				on a call and we'll walk you through what we've built.
			</p>
			<RollButton label="Book a call" href="/contact" />
		</div>
	{/if}
</section>

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
	.head {
		padding-top: clamp(8rem, 18vh, 12rem);
		padding-bottom: 3rem;
	}
	h1 {
		font-size: clamp(3.25rem, 10vw, 9rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.92;
		max-width: 11ch;
		text-wrap: balance;
	}
	.lede {
		margin-top: 1.75rem;
		max-width: 46ch;
		font-size: 1.15rem;
		line-height: 1.55;
		color: var(--color-mute);
	}
	.filters {
		margin-top: 2.5rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.filters button {
		--f: var(--color-paper);
		--on: var(--color-ink);
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.65rem 1.1rem;
		border-radius: 999px;
		border: 1px solid var(--color-rule-strong);
		background: transparent;
		color: var(--color-paper);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.3s var(--ease-out),
			color 0.3s var(--ease-out),
			border-color 0.3s var(--ease-out);
	}
	.filters button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.filters button:not(:disabled):hover {
		border-color: var(--color-paper);
	}
	.filters button.on {
		background: var(--f);
		border-color: var(--f);
		color: var(--on);
	}
	.filters span {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.grid {
		list-style: none;
		padding: 0 0 6rem;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 3.5rem 1.5rem;
		align-items: start;
	}
	.grid li:nth-child(even) {
		margin-top: 6rem;
	}
	.card {
		display: block;
		color: inherit;
		text-decoration: none;
	}
	.media {
		aspect-ratio: 4 / 3;
		border-radius: 24px;
		overflow: hidden;
		background: var(--color-ink-3);
	}
	.tall .media {
		aspect-ratio: 4 / 5;
	}
	.media img,
	.media video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: scale 0.9s var(--ease-out);
	}
	.card:hover .media img,
	.card:hover .media video,
	.card:focus-visible .media img {
		scale: 1.06;
	}
	.meta {
		margin-top: 1.1rem;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.meta h2 {
		font-size: clamp(1.5rem, 2.6vw, 2.25rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		transition: translate 0.5s var(--ease-out);
	}
	.card:hover .meta h2 {
		translate: 0.5rem 0;
	}
	.meta p {
		color: var(--color-mute);
		font-size: 0.95rem;
	}
	.card:focus-visible {
		outline-offset: 6px;
		border-radius: 24px;
	}

	.empty {
		padding: 3rem 0 8rem;
		max-width: 46ch;
		display: grid;
		gap: 1rem;
		justify-items: start;
		color: var(--color-mute);
		line-height: 1.55;
	}
	.empty-h {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-paper);
	}

	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.grid li:nth-child(even) {
			margin-top: 0;
		}
		.tall .media {
			aspect-ratio: 4 / 3;
		}
	}
</style>
