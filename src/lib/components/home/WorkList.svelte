<script lang="ts">
	import { LINES, type Station } from '$lib/data/network';
	import { reveal, splitWords } from '$lib/actions/motion';

	let { stations }: { stations: Station[] } = $props();

	let hovered = $state<Station | null>(null);
	let frame: HTMLDivElement | undefined = $state();
	let fine = $state(false);

	$effect(() => {
		fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
	});

	// Cursor-following preview that tilts with the pointer's speed.
	let x = 0,
		y = 0,
		px = 0,
		py = 0,
		tilt = 0,
		raf = 0;
	function follow() {
		const dx = x - px;
		px += dx * 0.16;
		py += (y - py) * 0.16;
		tilt += (Math.max(-12, Math.min(12, dx * 0.08)) - tilt) * 0.2;
		if (frame) frame.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${tilt}deg)`;
		raf =
			Math.abs(x - px) + Math.abs(y - py) + Math.abs(tilt) > 0.15
				? requestAnimationFrame(follow)
				: 0;
	}
	function move(e: PointerEvent) {
		x = e.clientX - 180;
		y = e.clientY - 135;
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
		<h2 id="work-h" use:splitWords>Work we're proud of</h2>
		<a class="all" href="/case-studies" data-cursor="All work">
			All case studies
			<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
		</a>
	</div>

	{#if stations.length}
		<ul class="list" onpointerleave={() => (hovered = null)}>
			{#each stations as s, i (s.slug)}
				<li use:reveal={i * 50}>
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
						<span class="title">{s.title}</span>
						<span class="what">
							{[s.lines.map((l) => LINES[l].name).join(' + '), s.industry]
								.filter(Boolean)
								.join(' · ')}
						</span>
						<span class="circle" aria-hidden="true">
							<svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
						</span>
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
		<p class="empty">New work is on its way. Ask us on a call to see what we're building.</p>
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
		padding: 6rem 1.5rem;
	}
	.head {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1.5rem;
		flex-wrap: wrap;
	}
	h2 {
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 0.98;
		text-wrap: balance;
	}
	.all {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
		color: var(--color-paper);
		text-decoration: none;
		background: linear-gradient(currentColor, currentColor) no-repeat 100% 100% / 0% 1px;
		transition: background-size 0.45s var(--ease-out);
		padding-bottom: 3px;
	}
	.all:hover {
		background-position: 0 100%;
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
		margin-top: 3rem;
		border-top: 1px solid var(--color-rule);
	}
	.row {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) auto;
		align-items: center;
		gap: 1.5rem;
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-rule);
		color: inherit;
		text-decoration: none;
		transition: opacity 0.35s var(--ease-out);
	}
	.row.muted {
		opacity: 0.3;
	}
	.title {
		font-size: clamp(1.75rem, 3.6vw, 3rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.05;
		transition: translate 0.5s var(--ease-out);
	}
	.row:hover .title,
	.row:focus-visible .title {
		translate: 1rem 0;
	}
	.what {
		color: var(--color-mute);
		font-size: 0.95rem;
	}
	.circle {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		border: 1px solid var(--color-rule-strong);
		transition:
			background 0.35s var(--ease-out),
			color 0.35s var(--ease-out),
			border-color 0.35s var(--ease-out);
	}
	.circle svg {
		width: 1.1rem;
		height: 1.1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		transition: rotate 0.4s var(--ease-out);
	}
	.row:hover .circle {
		background: var(--color-paper);
		border-color: var(--color-paper);
		color: var(--color-ink);
	}
	.row:hover .circle svg {
		rotate: -45deg;
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
		width: 22.5rem;
		aspect-ratio: 4 / 3;
		pointer-events: none;
		border-radius: 18px;
		overflow: hidden;
		background: var(--color-ink-3);
		opacity: 0;
		scale: 0.6;
		transition:
			opacity 0.25s var(--ease-out),
			scale 0.5s var(--ease-out);
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
		scale: 1.12;
		transition:
			opacity 0.35s var(--ease-out),
			scale 0.7s var(--ease-out);
	}
	.float .on {
		opacity: 1;
		scale: 1;
	}

	@media (max-width: 760px) {
		.row {
			grid-template-columns: 1fr auto;
			grid-template-areas:
				'title circle'
				'what what'
				'thumb thumb';
			row-gap: 0.5rem;
		}
		.title {
			grid-area: title;
		}
		.what {
			grid-area: what;
		}
		.circle {
			grid-area: circle;
		}
		.mobile-thumb {
			display: block;
			grid-area: thumb;
			width: 100%;
			aspect-ratio: 16 / 10;
			object-fit: cover;
			border-radius: 14px;
			margin-top: 0.75rem;
			background: var(--color-ink-3);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.row,
		.title,
		.float,
		.float img {
			transition: none;
		}
	}
</style>
