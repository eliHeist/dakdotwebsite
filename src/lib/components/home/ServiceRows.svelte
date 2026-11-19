<script lang="ts">
	import { LINE_IDS, LINES, lineCounts, type Station } from '$lib/data/network';
	import { parallax, reveal, splitWords } from '$lib/actions/motion';
	import { page } from '$app/stores';
	import { building } from '$app/environment';

	let {
		stations,
		heading = "Here's how we help you grow."
	}: { stations: Station[]; heading?: string } = $props();

	const counts = $derived(lineCounts(stations));

	// Review aid for static captures: ?svc=web|brand|motion shows that row's hover artifacts.
	const pinSvc = building ? null : $page.url.searchParams.get('svc');

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
		<h2 id="svc-h" use:splitWords>{heading}</h2>
		<p class="lede" use:reveal>
			Three teams under one roof, so your brand, your product and your motion all speak the same
			language.
		</p>
	</div>

	<ol class="rows">
		{#each LINE_IDS as id, i}
			{@const s = LINES[id]}
			<li
				class="item {id}"
				class:show={pinSvc === id}
				style="--f: var({s.colorVar})"
				use:reveal={i * 60}
				use:parallax
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

				<!-- Hover artifacts: small pieces of the craft that pop out around the name. -->
				<div class="art" aria-hidden="true">
					{#if id === 'web'}
						<span class="a a1" data-depth="18"><b>&lt;App /&gt;</b></span>
						<span class="a a2 win" data-depth="30"
							><i></i><i></i><i></i><em style="--h:.5"></em><em style="--h:.8"></em><em
								style="--h:.65"
							></em><em class="hi" style="--h:1"></em></span
						>
						<span class="a a3 toggle" data-depth="12"><i></i></span>
						<svg class="a a4 cursor" data-depth="40" viewBox="0 0 24 24"
							><path d="M4 2l16 9-7 2-3 7z" /></svg
						>
					{:else if id === 'brand'}
						<span class="a a1 aa" data-depth="20">Aa</span>
						<span class="a a2 sw" data-depth="32"><i></i><i></i><i></i></span>
						<svg class="a a3 mark" data-depth="14" viewBox="0 0 40 40"
							><circle cx="18" cy="22" r="12" /><circle class="d" cx="31" cy="9" r="5" /></svg
						>
						<span class="a a4 grid" data-depth="38"></span>
					{:else}
						<svg class="a a1 play" data-depth="22" viewBox="0 0 24 24"
							><path d="M8 5l11 7-11 7z" /></svg
						>
						<span class="a a2 keys" data-depth="34"><i></i><i></i><i></i></span>
						<span class="a a3 ball" data-depth="14"></span>
						<span class="a a4 fps" data-depth="40"><b>24 fps</b></span>
					{/if}
				</div>
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
		border-top: 1px solid var(--color-rule);
	}
	.item {
		position: relative;
		border-bottom: 1px solid var(--color-rule);
	}
	.row {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(0, 3fr);
		grid-template-areas:
			'name desc go'
			'name caps go';
		column-gap: 2rem;
		row-gap: 1rem;
		padding: 3rem 0;
		color: inherit;
		text-decoration: none;
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
		color: var(--color-mute);
		transition: color 0.4s var(--ease-out);
	}
	.row:hover .desc {
		color: var(--color-paper);
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
		border: 1px solid var(--color-rule-strong);
		transition: border-color 0.3s var(--ease-out);
	}
	.row:hover .caps span {
		border-color: var(--color-mute);
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
		border: 1px solid var(--color-rule-strong);
		transition:
			background 0.35s var(--ease-out),
			border-color 0.35s var(--ease-out),
			color 0.35s var(--ease-out),
			scale 0.4s var(--ease-out);
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
		background: var(--color-paper);
		border-color: var(--color-paper);
		color: var(--color-ink);
		scale: 1.08;
	}
	.row:hover .circle svg {
		rotate: -45deg;
	}

	/* ---------- Hover artifacts ---------- */
	.art {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 2;
	}
	.a {
		position: absolute;
		opacity: 0;
		scale: 0.4;
		transition:
			opacity 0.3s var(--ease-out),
			scale 0.55s cubic-bezier(0.34, 1.4, 0.64, 1),
			rotate 0.55s var(--ease-out);
	}
	.item:hover .a,
	.item.show .a,
	.item:focus-within .a {
		opacity: 1;
		scale: 1;
	}
	.item:hover .a2,
	.item:focus-within .a2 {
		transition-delay: 50ms;
	}
	.item:hover .a3,
	.item:focus-within .a3 {
		transition-delay: 100ms;
	}
	.item:hover .a4,
	.item:focus-within .a4 {
		transition-delay: 150ms;
	}
	/* They pop into the empty bands above and below the row's content, never over the copy. */
	.a1 {
		left: 24%;
		top: 0.15rem;
		rotate: -10deg;
	}
	.a2 {
		left: 50%;
		bottom: 0.15rem;
		rotate: 8deg;
	}
	.a3 {
		left: 63%;
		top: 0.35rem;
		rotate: -4deg;
	}
	.a4 {
		left: 37%;
		bottom: 0.25rem;
		rotate: 12deg;
	}
	.item:hover .a1 {
		rotate: -4deg;
	}
	.item:hover .a2 {
		rotate: 3deg;
	}
	.item:hover .a4 {
		rotate: 4deg;
	}

	.a1 b,
	.fps b {
		display: inline-block;
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		background: var(--color-paper);
		color: var(--color-ink);
		font-size: 0.8rem;
		font-weight: 700;
	}
	/* Web */
	.win {
		width: 4.5rem;
		height: 2.5rem;
		padding: 0.85rem 0.45rem 0.3rem;
		border-radius: 10px;
		background: var(--color-ink-3);
		border: 1px solid var(--color-rule-strong);
		display: flex;
		align-items: end;
		gap: 4px;
	}
	.win i {
		position: absolute;
		top: 6px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--color-rule-strong);
	}
	.win i:nth-child(1) {
		left: 7px;
	}
	.win i:nth-child(2) {
		left: 14px;
	}
	.win i:nth-child(3) {
		left: 21px;
	}
	.win em {
		flex: 1;
		height: calc(var(--h) * 100%);
		border-radius: 2px;
		background: var(--color-rule-strong);
	}
	.win em.hi {
		background: var(--f);
	}
	.toggle {
		width: 2.5rem;
		height: 1.4rem;
		border-radius: 999px;
		background: var(--f);
	}
	.toggle i {
		position: absolute;
		right: 3px;
		top: 3px;
		width: calc(1.4rem - 6px);
		height: calc(1.4rem - 6px);
		border-radius: 50%;
		background: #fff;
	}
	.cursor {
		width: 1.5rem;
		height: 1.5rem;
		fill: var(--color-paper);
		stroke: var(--color-ink);
		stroke-width: 1.2;
	}
	/* Brand */
	.aa {
		padding: 0.3rem 0.7rem;
		border-radius: 12px;
		background: var(--color-paper);
		color: var(--color-ink);
		font-size: 1.6rem;
		font-weight: 900;
		letter-spacing: -0.04em;
		line-height: 1;
	}
	.sw {
		display: flex;
		gap: 4px;
		padding: 0.4rem;
		border-radius: 999px;
		background: var(--color-ink-3);
		border: 1px solid var(--color-rule-strong);
	}
	.sw i {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: var(--color-paper);
	}
	.sw i:nth-child(2) {
		background: var(--color-mute);
	}
	.sw i:nth-child(3) {
		background: #5b616b;
	}
	.mark {
		width: 2.75rem;
		height: 2.75rem;
		fill: var(--color-paper);
	}
	.mark .d {
		fill: var(--color-ink);
		stroke: var(--color-paper);
		stroke-width: 2.5;
	}
	.grid {
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 8px;
		border: 1px solid var(--color-rule-strong);
		background:
			linear-gradient(var(--color-rule-strong) 1px, transparent 1px) 0 0 / 0.75rem 0.75rem,
			linear-gradient(90deg, var(--color-rule-strong) 1px, transparent 1px) 0 0 / 0.75rem 0.75rem;
	}
	/* Motion */
	.play {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.6rem;
		border-radius: 50%;
		background: var(--color-paper);
		fill: var(--color-ink);
	}
	.keys {
		display: flex;
		gap: 0.7rem;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
		background: var(--color-ink-3);
		border: 1px solid var(--color-rule-strong);
	}
	.keys i {
		width: 0.6rem;
		height: 0.6rem;
		rotate: 45deg;
		border-radius: 1.5px;
		background: var(--f);
	}
	.ball {
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		background: var(--f);
	}
	.item:hover .ball {
		animation: hop 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	}
	@keyframes hop {
		50% {
			translate: 0 -1.25rem;
		}
	}

	@media (max-width: 860px) {
		.intro {
			grid-template-columns: 1fr;
		}
		.row {
			grid-template-columns: 1fr;
			grid-template-areas: 'name' 'desc' 'caps' 'go';
			padding: 2.25rem 0;
		}
		.go {
			justify-self: start;
		}
		.art {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.name,
		.a,
		.circle,
		.circle svg {
			transition: none;
		}
	}
</style>
