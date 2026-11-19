<script lang="ts">
	import { LINES, type Station } from '$lib/data/network';

	let { stations }: { stations: Station[] } = $props();

	let hovered = $state<Station | null>(null);
	let frame: HTMLDivElement | undefined = $state();
	let fine = $state(false);

	$effect(() => {
		fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
	});

	// Cursor-following preview, eased toward the pointer.
	let x = 0,
		y = 0,
		px = 0,
		py = 0,
		raf = 0;
	function follow() {
		px += (x - px) * 0.18;
		py += (y - py) * 0.18;
		if (frame) frame.style.transform = `translate3d(${px}px, ${py}px, 0)`;
		raf = Math.abs(x - px) + Math.abs(y - py) > 0.2 ? requestAnimationFrame(follow) : 0;
	}
	function move(e: PointerEvent) {
		x = e.clientX + 24;
		y = e.clientY - 120;
		if (!hovered) {
			px = x;
			py = y;
		}
		if (!raf) raf = requestAnimationFrame(follow);
	}
	$effect(() => () => cancelAnimationFrame(raf));
</script>

<section id="work" class="wrap" aria-labelledby="work-h">
	<div class="head">
		<h2 id="work-h">Stations on the map</h2>
		<a class="all" href="/case-studies">
			All case studies
			<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
		</a>
	</div>

	{#if stations.length}
		<ul class="list" onpointerleave={() => (hovered = null)}>
			{#each stations as s, i (s.slug)}
				<li>
					<a
						href={s.href}
						target={s.external ? '_blank' : undefined}
						rel={s.external ? 'noopener' : undefined}
						class="row"
						class:muted={hovered && hovered.slug !== s.slug}
						data-cursor={s.kind === 'product' ? 'Open' : 'View'}
						onpointerenter={() => (hovered = s)}
						onpointermove={move}
						onfocus={() => (hovered = s)}
						onblur={() => (hovered = null)}
					>
						<span
							class="stop"
							class:first={i === 0}
							class:last={i === stations.length - 1}
							class:interchange={s.lines.length > 1}
							style="--c: var({LINES[s.lines[0]].colorVar})"
							aria-hidden="true"
						>
							<i></i>
						</span>
						<span class="title">{s.title}</span>
						<span class="what">
							{[s.lines.map((l) => LINES[l].name).join(' + '), s.industry, s.tags[0]]
								.filter(Boolean)
								.join(' · ')}
						</span>
						<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"
							><path d="M3 8h10M9 4l4 4-4 4" /></svg
						>
						{#if s.thumb.type === 'image' || s.thumb.poster}
							<img
								class="mobile-thumb"
								src={s.thumb.type === 'image' ? s.thumb.src : s.thumb.poster}
								alt=""
								loading="lazy"
							/>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="empty">
			New work is on its way to the map. Ask us on a call to see what we're building.
		</p>
	{/if}

	{#if fine}
		<div class="float" bind:this={frame} class:show={!!hovered} aria-hidden="true">
			{#each stations as s (s.slug)}
				{#if s.thumb.type === 'video'}
					<video
						class:on={hovered?.slug === s.slug}
						src={s.thumb.src}
						poster={s.thumb.poster}
						muted
						loop
						playsinline
						autoplay
					></video>
				{:else}
					<img class:on={hovered?.slug === s.slug} src={s.thumb.src} alt="" loading="lazy" />
				{/if}
			{/each}
		</div>
	{/if}
</section>

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 5rem 1.5rem;
	}
	.head {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1.5rem;
		flex-wrap: wrap;
	}
	h2 {
		font-size: clamp(2.25rem, 5vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1;
	}
	.all {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
		color: var(--color-paper);
		text-decoration: none;
		background: linear-gradient(currentColor, currentColor) no-repeat 0 100% / 0% 1px;
		transition: background-size 0.4s var(--ease-out);
		padding-bottom: 2px;
	}
	.all:hover {
		background-size: 100% 1px;
	}
	.all svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
	}

	.list {
		list-style: none;
		padding: 0;
		margin-top: 2.5rem;
		border-top: 1px solid var(--color-rule);
	}
	.row {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1.4fr) minmax(0, 1fr) auto;
		align-items: center;
		gap: 1.5rem;
		padding: 1.6rem 0;
		border-bottom: 1px solid var(--color-rule);
		color: inherit;
		text-decoration: none;
		transition: opacity 0.3s var(--ease-out);
	}
	.row.muted {
		opacity: 0.35;
	}

	/* The route: one continuous line down the index, each project a stop on it. */
	.stop {
		position: relative;
		align-self: stretch;
		margin: -1.6rem 0;
	}
	.stop::before {
		content: '';
		position: absolute;
		left: 50%;
		top: -1px;
		bottom: -1px;
		width: 4px;
		margin-left: -2px;
		background: var(--c);
	}
	.stop.first::before {
		top: 50%;
	}
	.stop.last::before {
		bottom: 50%;
	}
	.stop i {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 16px;
		height: 16px;
		margin: -8px 0 0 -8px;
		border-radius: 50%;
		background: var(--color-ink);
		border: 3.5px solid var(--c);
		transition:
			transform 0.3s var(--ease-out),
			background 0.3s var(--ease-out);
	}
	.stop.interchange i {
		border-color: var(--color-paper);
	}
	.row:hover .stop i,
	.row:focus-visible .stop i {
		transform: scale(1.35);
		background: var(--color-paper);
	}

	.title {
		font-size: clamp(1.4rem, 2.6vw, 2.1rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 1.1;
		transition: translate 0.4s var(--ease-out);
	}
	.row:hover .title,
	.row:focus-visible .title {
		translate: 0.5rem 0;
	}
	.what {
		color: var(--color-mute);
		font-size: 0.95rem;
	}
	.arrow {
		width: 1.1rem;
		height: 1.1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		transition: transform 0.3s var(--ease-out);
	}
	.row:hover .arrow {
		transform: translateX(4px);
	}
	.mobile-thumb {
		display: none;
	}
	.empty {
		margin-top: 2rem;
		color: var(--color-mute);
	}

	.float {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 50;
		width: 22rem;
		aspect-ratio: 4 / 3;
		pointer-events: none;
		border-radius: 10px;
		overflow: hidden;
		background: var(--color-ink-3);
		opacity: 0;
		scale: 0.85;
		transition:
			opacity 0.25s var(--ease-out),
			scale 0.4s var(--ease-out);
		box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.75);
	}
	.float.show {
		opacity: 1;
		scale: 1;
	}
	.float img,
	.float video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.3s var(--ease-out);
	}
	.float .on {
		opacity: 1;
	}

	@media (max-width: 760px) {
		.row {
			grid-template-columns: 1.5rem 1fr auto;
			grid-template-areas:
				'stop title arrow'
				'stop what what'
				'stop thumb thumb';
			column-gap: 1rem;
			row-gap: 0.4rem;
		}
		.stop {
			grid-area: stop;
		}
		/* Stop aligns with the title line (row padding + half the title). */
		.stop i {
			top: 2.35rem;
		}
		.stop.first::before {
			top: 2.35rem;
		}
		.stop.last::before {
			bottom: calc(100% - 2.35rem);
		}
		.title {
			grid-area: title;
		}
		.what {
			grid-area: what;
		}
		.arrow {
			grid-area: arrow;
		}
		.mobile-thumb {
			display: block;
			grid-area: thumb;
			width: 100%;
			aspect-ratio: 16 / 9;
			object-fit: cover;
			border-radius: 8px;
			margin-top: 0.75rem;
			background: var(--color-ink-3);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.row,
		.title,
		.float {
			transition: none;
		}
	}
</style>
