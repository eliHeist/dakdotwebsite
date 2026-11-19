<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { building } from '$app/environment';
	import Logo from '$lib/components/ui/Logo.svelte';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import ServiceArt from '$lib/components/ui/ServiceArt.svelte';
	import { LINE_IDS, LINES, type LineId } from '$lib/data/network';
	import { CONTACT, whatsappHref } from '$lib/data/contact';

	let menuOpen = $state(false);
	let svcOpen = $state(false);
	/** 0 at the top of the page, 1 once the bar has fully become the island. */
	let p = $state(0);
	const scrolled = $derived(p > 0.04);
	/** True for a moment after the services panel toggles, so that morph runs slower. */
	let morphing = $state(false);
	let morphTimer = 0;
	const ISLAND_AT = 220; // px of scroll over which the bar shrinks into the island
	let hot = $state<LineId | null>(null);
	let shell: HTMLDivElement | undefined = $state();
	let closeTimer = 0;

	afterNavigate(() => {
		menuOpen = false;
		svcOpen = false;
	});

	const is = (prefix: string) => $page.url.pathname.startsWith(prefix);

	// Over the light colour field (Motion's yellow) the bar turns ink until scrolled.
	const onLight = $derived(
		!scrolled && !menuOpen && !svcOpen && $page.url.pathname.startsWith('/services/motion')
	);

	const blurb: Record<LineId, string> = {
		web: 'Web apps, business systems and fast websites that run real operations.',
		brand: 'Identities built as systems: logos, type, colour and guidelines.',
		motion: 'Animation, 3D and video that explain what you do.'
	};

	const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
	function openSvc() {
		clearTimeout(closeTimer);
		svcOpen = true;
	}
	function closeSoon() {
		clearTimeout(closeTimer);
		closeTimer = window.setTimeout(() => {
			svcOpen = false;
			hot = null;
		}, 160);
	}
	function onFocusOut(e: FocusEvent) {
		if (shell && !shell.contains(e.relatedTarget as Node)) svcOpen = false;
	}

	$effect(() => {
		document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
	});

	// Opening or closing the panel gets a slower, deliberate morph; scrolling stays tight.
	let lastSvc = false;
	$effect(() => {
		if (svcOpen === lastSvc) return;
		lastSvc = svcOpen;
		morphing = true;
		clearTimeout(morphTimer);
		morphTimer = window.setTimeout(() => (morphing = false), 950);
	});

	let raf = 0;
	function onScroll() {
		if (pinned || raf) return;
		raf = requestAnimationFrame(() => {
			raf = 0;
			p = Math.min(1, Math.max(0, window.scrollY / ISLAND_AT));
		});
	}
	$effect(() => {
		if (!pinned) p = Math.min(1, Math.max(0, window.scrollY / ISLAND_AT));
	});

	// Review aid for static captures: ?nav=island or ?nav=services pins a header state.
	// Read at render time (skipped while prerendering, where the query is unavailable).
	const pin = building ? null : $page.url.searchParams.get('nav');
	const pinned = pin === 'island' || pin === 'services';
	if (pinned) {
		p = 1;
		svcOpen = pin === 'services';
		if (pin === 'services') hot = 'web';
	}
</script>

<svelte:window
	onscroll={onScroll}
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			menuOpen = false;
			svcOpen = false;
		}
	}}
/>

<header
	class="page-header"
	class:island={scrolled && !menuOpen}
	class:svc-open={svcOpen}
	class:open={menuOpen}
	class:on-light={onLight}
	class:morphing
	style="--p: {menuOpen ? 0 : p.toFixed(3)}"
>
	<div
		class="shell"
		bind:this={shell}
		onpointerleave={() => fine() && closeSoon()}
		onpointerenter={() => clearTimeout(closeTimer)}
		onfocusout={onFocusOut}
		role="presentation"
	>
		<div class="bar">
			<a href="/" class="brand" aria-label="Dakdot home"><Logo class="logo" /></a>

			<nav aria-label="Main">
				<ul>
					<li>
						<a
							href="/case-studies"
							class="roll-link"
							aria-current={is('/case-studies') ? 'page' : undefined}
						>
							<span aria-hidden="true">Work</span><span aria-hidden="true">Work</span><span
								class="sr">Work</span
							>
						</a>
					</li>
					<li>
						<button
							type="button"
							class="roll-link svc-btn"
							aria-expanded={svcOpen}
							aria-controls="svc-panel"
							aria-current={is('/services') ? 'page' : undefined}
							onpointerenter={() => fine() && openSvc()}
							onclick={() => (svcOpen = !svcOpen)}
						>
							<span aria-hidden="true">Services</span><span aria-hidden="true">Services</span><span
								class="sr">Services</span
							>
							<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
						</button>
					</li>
					<li>
						<a href="/about" class="roll-link" aria-current={is('/about') ? 'page' : undefined}>
							<span aria-hidden="true">About</span><span aria-hidden="true">About</span><span
								class="sr">About</span
							>
						</a>
					</li>
				</ul>
			</nav>

			<div class="cta">
				<RollButton label="Book a call" href="/contact" variant={onLight ? 'ink' : 'light'} />
			</div>

			<button
				class="toggle"
				type="button"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span class="burger" aria-hidden="true"><i></i><i></i></span>
				{menuOpen ? 'Close' : 'Menu'}
			</button>
		</div>

		<!-- The island grows downward to reveal the services. -->
		<div id="svc-panel" class="panel" inert={!svcOpen}>
			<div class="panel-in">
				<ul class="tiles">
					{#each LINE_IDS as id, i}
						<li style="--i:{i}">
							<a
								href={LINES[id].href}
								class="tile"
								onpointerenter={() => (hot = id)}
								onpointerleave={() => (hot = null)}
								onfocus={() => (hot = id)}
								onblur={() => (hot = null)}
							>
								<ServiceArt {id} active={hot === id} />
								<span class="t-name">
									{LINES[id].name}
									<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
								</span>
								<span class="t-blurb">{blurb[id]}</span>
							</a>
						</li>
					{/each}
				</ul>
				<div class="panel-foot">
					<span>Not sure which one you need?</span>
					<a href="/contact">Tell us about your project</a>
				</div>
			</div>
		</div>

		<div id="mobile-menu" class="sheet" hidden={!menuOpen}>
			<ul class="big">
				{#each [{ label: 'Home', href: '/' }, { label: 'Work', href: '/case-studies' }, { label: 'About', href: '/about' }] as l, i}
					<li style="--i:{i}"><a href={l.href}>{l.label}</a></li>
				{/each}
			</ul>
			<ul class="svc">
				{#each LINE_IDS as id}
					<li><a href={LINES[id].href}>{LINES[id].name}</a></li>
				{/each}
			</ul>
			<div class="sheet-foot">
				<RollButton label="Book a call" href="/contact" />
				<a href={whatsappHref} target="_blank" rel="noopener">WhatsApp</a>
				<a href="mailto:{CONTACT.email}">{CONTACT.email}</a>
			</div>
		</div>
	</div>
</header>

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 100;
		padding: 0.6rem 0.75rem 0;
		pointer-events: none;
	}

	/*
	 * One shell morphs with scroll. --p runs 0 → 1 over the first ~220px:
	 *   p = 0  full-width bar, transparent
	 *   p = 1  compact centred island
	 * In either state, Services grows the shell downward into the panel.
	 */
	header {
		--dur: 0.2s;
		--min: 33rem;
	}
	header.morphing {
		/* Opening/closing the panel is a deliberate, slower morph. */
		--dur: 0.9s;
	}
	.shell {
		pointer-events: auto;
		max-width: calc(88rem - (88rem - var(--min)) * var(--p));
		margin: 0 auto;
		border-radius: calc(28px + 972px * var(--p));
		border: 1px solid rgb(38 43 51 / var(--p));
		background: rgb(26 30 37 / var(--p));
		overflow: hidden;
		transition:
			max-width var(--dur) var(--ease-out),
			border-radius var(--dur) var(--ease-out),
			background var(--dur) var(--ease-out),
			border-color var(--dur) var(--ease-out);
	}
	.svc-open .shell {
		max-width: 60rem;
		border-radius: 28px;
		background: var(--color-ink-3);
		border-color: var(--color-rule);
	}
	.open .shell {
		max-width: none;
		border-radius: 20px;
		background: var(--color-ink);
	}

	.bar {
		height: calc(3.75rem - 0.5rem * var(--p));
		/* The right padding closes to zero so the CTA sits flush with the island's edge. */
		padding: 0 calc(0.75rem * (1 - var(--p))) 0 calc(1.25rem - 0.15rem * var(--p));
		display: flex;
		align-items: center;
		gap: calc(2rem - 0.75rem * var(--p));
		transition:
			height var(--dur) var(--ease-out),
			gap var(--dur) var(--ease-out),
			padding var(--dur) var(--ease-out);
	}
	.brand {
		color: var(--color-paper);
		margin-right: auto;
		transition: color 0.3s var(--ease-out);
	}
	.brand :global(.logo) {
		height: calc(1.6rem - 0.35rem * var(--p));
		width: auto;
		transition: height var(--dur) var(--ease-out);
	}
	:global(html.dot-away) .brand :global(.dot) {
		opacity: 0;
	}

	nav ul {
		display: flex;
		gap: calc(1.75rem - 0.65rem * var(--p));
		list-style: none;
		margin: 0;
		padding: 0;
		transition: gap var(--dur) var(--ease-out);
	}

	/* The CTA grows to the bar's full height as it becomes the island, sharing its radius. */
	.cta {
		align-self: stretch;
		display: flex;
		align-items: center;
	}
	.cta :global(.btn) {
		height: calc(3rem + (100% - 3rem) * var(--p));
		border-radius: 999px;
		transition:
			height var(--dur) var(--ease-out),
			background 0.3s var(--ease-out);
	}
	.svc-open .cta :global(.btn) {
		border-radius: 27px;
	}
	.roll-link {
		position: relative;
		display: inline-grid;
		grid-auto-flow: column;
		align-items: center;
		overflow: hidden;
		height: 1.3em;
		line-height: 1.3em;
		color: var(--color-paper);
		text-decoration: none;
		font: inherit;
		font-weight: 500;
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		transition: color 0.3s var(--ease-out);
	}
	.roll-link > span:not(.sr) {
		grid-area: 1 / 1;
		transition: translate 0.45s var(--ease-out);
	}
	.roll-link > span:nth-child(2) {
		translate: 0 100%;
	}
	.roll-link:hover > span:nth-child(1),
	.roll-link:focus-visible > span:nth-child(1) {
		translate: 0 -100%;
	}
	.roll-link:hover > span:nth-child(2),
	.roll-link:focus-visible > span:nth-child(2) {
		translate: 0 0;
	}
	.svc-btn {
		grid-template-columns: auto auto;
		column-gap: 0.3rem;
	}
	.svc-btn svg {
		grid-column: 2;
		width: 0.85rem;
		height: 0.85rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		transition: rotate 0.4s var(--ease-out);
	}
	.svc-btn[aria-expanded='true'] svg {
		rotate: 180deg;
	}
	.roll-link[aria-current='page']::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 5px;
		height: 5px;
		margin-left: -2.5px;
		border-radius: 50%;
		background: currentColor;
	}
	.svc-btn[aria-current='page']::after {
		left: calc(50% - 0.55rem);
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
	.on-light .brand,
	.on-light .roll-link,
	.on-light .toggle {
		color: var(--color-ink);
	}
	.on-light .toggle {
		border-color: color-mix(in srgb, var(--color-ink) 35%, transparent);
	}

	/* ---------- Services panel ---------- */
	.panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.55s var(--ease-out);
	}
	.svc-open .panel {
		grid-template-rows: 1fr;
	}
	.panel-in {
		min-height: 0;
		overflow: hidden;
		padding: 0 0.75rem;
		opacity: 0;
		transition:
			opacity 0.3s var(--ease-out),
			padding 0.55s var(--ease-out);
	}
	.svc-open .panel-in {
		opacity: 1;
		padding: 0.5rem 0.75rem 0.75rem;
		transition-delay: 0.08s, 0s;
	}
	.tiles {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.5rem;
	}
	.tiles li {
		translate: 0 12px;
		opacity: 0;
		transition:
			translate 0.55s var(--ease-out),
			opacity 0.4s var(--ease-out);
		transition-delay: calc(var(--i) * 50ms);
	}
	.svc-open .tiles li {
		translate: 0 0;
		opacity: 1;
		transition-delay: calc(0.1s + var(--i) * 60ms);
	}
	.tile {
		display: grid;
		gap: 0.5rem;
		padding: 0.6rem 0.6rem 1rem;
		border-radius: 20px;
		color: var(--color-paper);
		text-decoration: none;
		transition: background 0.3s var(--ease-out);
	}
	.tile:hover,
	.tile:focus-visible {
		background: var(--color-ink);
	}
	.t-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 0.35rem;
		padding: 0 0.35rem;
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.t-name svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		opacity: 0;
		translate: -6px 0;
		transition:
			opacity 0.3s var(--ease-out),
			translate 0.4s var(--ease-out);
	}
	.tile:hover .t-name svg,
	.tile:focus-visible .t-name svg {
		opacity: 1;
		translate: 0 0;
	}
	.t-blurb {
		padding: 0 0.35rem;
		font-size: 0.88rem;
		line-height: 1.45;
		color: var(--color-mute);
	}
	.panel-foot {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
		padding: 0.9rem 0.95rem 0.25rem;
		border-top: 1px solid var(--color-rule);
		font-size: 0.92rem;
		color: var(--color-mute);
	}
	.panel-foot a {
		color: var(--color-paper);
		font-weight: 600;
	}

	/* ---------- Mobile ---------- */
	.toggle {
		display: none;
		align-items: center;
		gap: 0.6rem;
		font: inherit;
		font-weight: 600;
		color: var(--color-paper);
		background: none;
		border: 1px solid var(--color-rule-strong);
		border-radius: 999px;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: color 0.3s var(--ease-out);
	}
	.burger {
		display: grid;
		gap: 4px;
		width: 16px;
	}
	.burger i {
		height: 2px;
		border-radius: 1px;
		background: currentColor;
		transition:
			rotate 0.35s var(--ease-out),
			translate 0.35s var(--ease-out);
	}
	.open .burger i:first-child {
		translate: 0 3px;
		rotate: 45deg;
	}
	.open .burger i:last-child {
		translate: 0 -3px;
		rotate: -45deg;
	}
	.sheet {
		height: calc(100svh - 5rem);
		overflow-y: auto;
		padding: 1rem 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.sheet[hidden] {
		display: none;
	}
	.sheet ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.big a {
		display: block;
		padding: 0.25rem 0;
		color: var(--color-paper);
		text-decoration: none;
		font-size: clamp(2.75rem, 13vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.05;
	}
	@media (prefers-reduced-motion: no-preference) {
		.big li {
			animation: in 0.6s var(--ease-out) both;
			animation-delay: calc(var(--i) * 50ms);
		}
	}
	@keyframes in {
		from {
			translate: 0 0.6em;
			opacity: 0.3;
		}
	}
	.svc {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.svc a {
		display: inline-block;
		padding: 0.45rem 0.9rem;
		border: 1px solid var(--color-rule-strong);
		border-radius: 999px;
		color: var(--color-paper);
		text-decoration: none;
		font-size: 0.95rem;
	}
	.sheet-foot {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	}
	.sheet-foot > a {
		color: var(--color-mute);
		text-decoration: none;
	}

	@media (max-width: 760px) {
		nav,
		.cta,
		.panel {
			display: none;
		}
		.toggle {
			display: inline-flex;
			margin-right: calc(0.4rem * var(--p));
		}
		header {
			--min: 22rem;
		}
	}
</style>
