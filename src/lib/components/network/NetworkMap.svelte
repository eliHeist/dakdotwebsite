<script lang="ts">
	import { LINE_IDS, LINES, type LineId, type Station } from '$lib/data/network';
	import { HUB, MAP_H, MAP_W, ROUTES, pathD, placeStations, type PlacedStation } from './layout';

	let { stations }: { stations: Station[] } = $props();

	const layout = $derived(placeStations(stations));

	let active = $state<PlacedStation | null>(null);
	let pinned = $state(false);

	const litLines = $derived(new Set<LineId>(active ? active.station.lines : []));

	function enter(p: PlacedStation) {
		if (!pinned) active = p;
	}
	function leave() {
		if (!pinned) active = null;
	}
	/** Touch: the first tap previews, a second tap on the same station follows the link. */
	function tap(e: MouseEvent, p: PlacedStation) {
		if (!matchMedia('(hover: none)').matches) return;
		if (active?.station.slug !== p.station.slug) {
			e.preventDefault();
			active = p;
			pinned = true;
		}
	}
	function clear() {
		pinned = false;
		active = null;
	}

	const lineColor = (l: LineId) => `var(${LINES[l].colorVar})`;
	const anchor = (nx: number) => (nx > 0.3 ? 'start' : nx < -0.3 ? 'end' : 'middle');

	/**
	 * Label placement at a given type size (viewBox units): offset to the
	 * station's outer side, clear of the line, and kept inside the map using an
	 * estimated text width.
	 */
	function label(x: number, y: number, nx: number, ny: number, text: string, size: number) {
		const a = anchor(nx);
		const w = text.length * size * 0.56;
		const off = size * 0.75 + 8;
		let lx = x + nx * off;
		let ly = y + ny * off + size * 0.35;
		// Vertical clearance: text above sits wholly above the line, text below wholly below.
		if (ny > 0.3) ly = Math.max(ly, y + 8 + size * 0.75);
		if (ny < -0.3) ly = Math.min(ly, y - 8 - size * 0.2);
		const pad = 4;
		if (a === 'start') lx = Math.min(lx, MAP_W - pad - w);
		else if (a === 'end') lx = Math.max(lx, pad + w);
		else lx = Math.min(Math.max(lx, pad + w / 2), MAP_W - pad - w / 2);
		return { x: lx, y: ly, anchor: a };
	}

	/** Preview card position, as a percentage of the map box, kept inside it. */
	const preview = $derived.by(() => {
		if (!active) return null;
		const left = (active.x / MAP_W) * 100;
		const top = (active.y / MAP_H) * 100;
		return {
			left: Math.min(Math.max(left, 4), 60),
			top: top > 55 ? top - 4 : top + 4,
			above: top > 55
		};
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && clear()} />

<div class="map" class:has-active={!!active}>
	<svg
		viewBox="0 0 {MAP_W} {MAP_H}"
		role="group"
		aria-label="The Dakdot network: service lines and the projects on them"
	>
		<!-- Lines -->
		{#each LINE_IDS as line, i}
			<!-- Always-visible base track; the bright route draws over it once on load. -->
			<path
				class="track"
				class:dim={active && !litLines.has(line)}
				d={pathD(ROUTES[line])}
				stroke={lineColor(line)}
			/>
			<path
				class="route"
				class:lit={litLines.has(line)}
				class:dim={active && !litLines.has(line)}
				d={pathD(ROUTES[line])}
				pathLength="1"
				stroke={lineColor(line)}
				style="--i:{i}"
			/>
		{/each}

		<!-- Capability stops on lines that have no work yet -->
		{#each layout.capabilities as c}
			<g class="cap" class:dim={!!active} aria-hidden="true">
				<line
					x1={c.x - c.nx * 7}
					y1={c.y - c.ny * 7}
					x2={c.x + c.nx * 7}
					y2={c.y + c.ny * 7}
					stroke={lineColor(c.line)}
				/>
				<text
					class="label cap-label"
					x={c.x + c.nx * 16}
					y={c.y + c.ny * 16 + 4}
					text-anchor={anchor(c.nx)}>{c.label}</text
				>
			</g>
		{/each}

		<!-- Hub: the Dakdot dot -->
		<g class="hub" aria-hidden="true">
			<circle cx={HUB[0]} cy={HUB[1]} r="24" class="hub-ring" />
			<circle cx={HUB[0]} cy={HUB[1]} r="13" class="hub-dot" />
		</g>

		<!-- Stations -->
		{#each layout.placed as p (p.station.slug)}
			{@const d = label(p.x, p.y, p.nx, p.ny, p.station.title, 14)}
			{@const m = label(p.x, p.y, p.nx, p.ny, p.station.title, 24)}
			<a
				href={p.station.href}
				target={p.station.external ? '_blank' : undefined}
				rel={p.station.external ? 'noopener' : undefined}
				class="station"
				class:on={active?.station.slug === p.station.slug}
				class:dim={active && !p.station.lines.some((l) => litLines.has(l))}
				aria-label="{p.station.title}, {p.station.lines.map((l) => LINES[l].name).join(' and ')}"
				data-cursor={p.station.kind === 'product' ? 'Open' : 'View'}
				onmouseenter={() => enter(p)}
				onmouseleave={leave}
				onfocus={() => enter(p)}
				onblur={leave}
				onclick={(e) => tap(e, p)}
			>
				<circle class="hit" cx={p.x} cy={p.y} r="18" />
				{#if p.interchange}
					<circle cx={p.x} cy={p.y} r="9" class="node interchange" />
					{#each p.station.lines as l, k}
						<circle
							cx={p.x + (k - (p.station.lines.length - 1) / 2) * 5}
							cy={p.y}
							r="2"
							fill={lineColor(l)}
						/>
					{/each}
				{:else}
					<circle cx={p.x} cy={p.y} r="6" class="node" stroke={lineColor(p.line)} />
				{/if}
				<text class="label desk" x={d.x} y={d.y} text-anchor={d.anchor}>{p.station.title}</text>
				<text class="label touch" x={m.x} y={m.y} text-anchor={m.anchor} aria-hidden="true"
					>{p.station.title}</text
				>
			</a>
		{/each}
	</svg>

	{#if active && preview}
		{@const s = active.station}
		<div
			class="preview"
			class:above={preview.above}
			style="left:{preview.left}%; top:{preview.top}%"
			role="status"
		>
			<div class="thumb">
				{#if s.thumb.type === 'video'}
					<video src={s.thumb.src} poster={s.thumb.poster} muted autoplay loop playsinline></video>
				{:else}
					<img src={s.thumb.src} alt={s.thumb.alt ?? ''} loading="lazy" />
				{/if}
			</div>
			<div class="meta">
				<p class="title">{s.title}</p>
				<p class="lines">
					{#each s.lines as l}
						<span><i style="background:{lineColor(l)}"></i>{LINES[l].name}</span>
					{/each}
				</p>
				{#if s.summary}<p class="summary">{s.summary}</p>{/if}
				{#if pinned}
					<a class="go" href={s.href}
						>{s.kind === 'product' ? 'Open product' : 'View case study'}
						<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></a
					>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.map {
		position: relative;
		width: 100%;
	}
	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.track {
		fill: none;
		stroke-width: 5;
		stroke-linecap: round;
		stroke-linejoin: round;
		opacity: 0.35;
		transition: opacity 0.35s var(--ease-out);
	}
	.track.dim {
		opacity: 0.08;
	}
	.route {
		fill: none;
		stroke-width: 5;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition:
			opacity 0.35s var(--ease-out),
			stroke-width 0.35s var(--ease-out);
	}
	.route.dim {
		opacity: 0.14;
	}
	.route.lit {
		stroke-width: 7;
	}
	@media (prefers-reduced-motion: no-preference) {
		.route {
			stroke-dasharray: 1;
			stroke-dashoffset: 1;
			animation: draw 1.1s var(--ease-out) forwards;
			animation-delay: calc(var(--i) * 140ms + 120ms);
		}
	}
	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	.hub-ring {
		fill: none;
		stroke: var(--color-rule);
		stroke-width: 1.5;
	}
	.hub-dot {
		fill: var(--color-paper);
	}

	.cap line {
		stroke-width: 3;
		stroke-linecap: round;
	}
	.cap {
		transition: opacity 0.3s var(--ease-out);
	}
	.cap.dim {
		opacity: 0.2;
	}

	.label {
		font-size: 14px;
		font-weight: 500;
		fill: var(--color-paper);
		letter-spacing: -0.005em;
		paint-order: stroke;
		stroke: var(--color-ink);
		stroke-width: 5px;
		stroke-linejoin: round;
	}
	.cap-label {
		fill: var(--color-mute);
		font-weight: 400;
	}

	.station {
		cursor: pointer;
		outline: none;
		transition: opacity 0.3s var(--ease-out);
	}
	.station.dim {
		opacity: 0.25;
	}
	.hit {
		fill: transparent;
	}
	.node {
		fill: var(--color-ink);
		stroke-width: 3.5;
		transition:
			r 0.3s var(--ease-out),
			fill 0.3s var(--ease-out);
	}
	.node.interchange {
		stroke: var(--color-paper);
	}
	.station:hover .node,
	.station.on .node,
	.station:focus-visible .node {
		r: 9;
	}
	.station:hover .node:not(.interchange),
	.station.on .node:not(.interchange) {
		fill: var(--color-paper);
	}
	.station:focus-visible .hit {
		stroke: var(--color-line-brand);
		stroke-width: 2;
	}

	.preview {
		position: absolute;
		z-index: 5;
		width: min(17.5rem, 70vw);
		background: var(--color-ink-2);
		border: 1px solid var(--color-rule);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 18px 40px -12px rgb(0 0 0 / 0.7);
		pointer-events: none;
		transform: translateY(0);
		animation: pop 0.28s var(--ease-out);
	}
	.preview.above {
		transform: translateY(-100%);
	}
	.preview:has(.go) {
		pointer-events: auto;
	}
	@keyframes pop {
		from {
			opacity: 0;
			translate: 0 6px;
			clip-path: inset(0 0 30% 0 round 10px);
		}
	}
	.thumb {
		aspect-ratio: 16 / 10;
		background: var(--color-ink-3);
	}
	.thumb img,
	.thumb video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.meta {
		padding: 0.85rem 1rem 1rem;
	}
	.title {
		font-weight: 600;
		font-size: 1.05rem;
		letter-spacing: -0.01em;
	}
	.lines {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.85rem;
		margin-top: 0.3rem;
		font-size: 0.8rem;
		color: var(--color-mute);
	}
	.lines span {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}
	.lines i {
		width: 0.9rem;
		height: 3px;
		border-radius: 2px;
	}
	.summary {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.45;
		color: var(--color-mute);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.go svg {
		width: 0.9rem;
		height: 0.9rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
	}
	.go {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.7rem;
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--color-paper);
	}

	.label.touch {
		display: none;
		font-size: 24px;
		stroke-width: 8px;
	}
	@media (max-width: 640px) {
		.label.desk {
			display: none;
		}
		.label.touch {
			display: inline;
		}
		.cap-label {
			display: none;
		}
	}
</style>
