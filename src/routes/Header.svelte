<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import Logo from '$lib/components/network/Logo.svelte';
	import { LINE_IDS, LINES } from '$lib/data/network';

	let menuOpen = $state(false);
	let servicesOpen = $state(false);
	let scrolled = $state(false);
	let servicesWrap: HTMLElement | undefined = $state();

	afterNavigate(() => {
		menuOpen = false;
		servicesOpen = false;
	});

	const is = (prefix: string) => $page.url.pathname.startsWith(prefix);

	function onDocClick(e: MouseEvent) {
		if (servicesOpen && servicesWrap && !servicesWrap.contains(e.target as Node))
			servicesOpen = false;
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			servicesOpen = false;
			menuOpen = false;
		}
	}
	$effect(() => {
		document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
	});
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} onkeydown={onKey} />
<svelte:document onclick={onDocClick} />

<header class="page-header" class:scrolled class:open={menuOpen}>
	<div class="bar">
		<a href="/" class="brand" aria-label="Dakdot home"><Logo class="logo" /></a>

		<nav aria-label="Main">
			<ul>
				<li>
					<a href="/case-studies" aria-current={is('/case-studies') ? 'page' : undefined}>Work</a>
				</li>
				<li class="svc" bind:this={servicesWrap}>
					<button
						type="button"
						aria-expanded={servicesOpen}
						aria-controls="svc-menu"
						aria-current={is('/services') ? 'page' : undefined}
						onclick={() => (servicesOpen = !servicesOpen)}
					>
						Services
						<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
					</button>
					<ul id="svc-menu" class="menu" hidden={!servicesOpen}>
						{#each LINE_IDS as id}
							<li>
								<a href={LINES[id].href}>
									<i style="background: var({LINES[id].colorVar})"></i>
									<span>
										<b>{LINES[id].name}</b>
										<small>{LINES[id].summary}</small>
									</span>
								</a>
							</li>
						{/each}
					</ul>
				</li>
				<li><a href="/about" aria-current={is('/about') ? 'page' : undefined}>About</a></li>
			</ul>
		</nav>

		<a class="cta" href="/#book">Book a call</a>

		<button
			class="toggle"
			type="button"
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? 'Close' : 'Menu'}
		</button>
	</div>

	<div id="mobile-menu" class="sheet" hidden={!menuOpen}>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/case-studies">Work</a></li>
			{#each LINE_IDS as id}
				<li class="sub">
					<a href={LINES[id].href}
						><i style="background: var({LINES[id].colorVar})"></i>{LINES[id].name}</a
					>
				</li>
			{/each}
			<li><a href="/about">About</a></li>
		</ul>
		<a class="cta wide" href="/#book">Book a call</a>
	</div>
</header>

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 100;
		transition:
			background 0.3s var(--ease-out),
			border-color 0.3s var(--ease-out);
		border-bottom: 1px solid transparent;
	}
	header.scrolled,
	header.open {
		background: var(--color-ink);
		border-bottom-color: var(--color-rule);
	}
	.bar {
		max-width: 88rem;
		margin: 0 auto;
		height: 4.5rem;
		padding: 0 1.5rem;
		display: flex;
		align-items: center;
		gap: 2rem;
	}
	.brand {
		color: var(--color-paper);
		margin-right: auto;
	}
	.brand :global(.logo) {
		height: 1.5rem;
		width: auto;
	}

	nav ul {
		display: flex;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	nav > ul > li > a,
	nav button {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.55rem 0.9rem;
		border-radius: 999px;
		color: var(--color-paper);
		text-decoration: none;
		font: inherit;
		font-weight: 500;
		background: none;
		border: 0;
		cursor: pointer;
		transition: background 0.2s var(--ease-out);
	}
	nav > ul > li > a:hover,
	nav button:hover,
	nav button[aria-expanded='true'] {
		background: var(--color-ink-3);
	}
	[aria-current='page'] {
		box-shadow: inset 0 -2px 0 var(--color-line-web);
		border-radius: 0 !important;
	}
	nav button svg {
		width: 0.9rem;
		height: 0.9rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		transition: transform 0.25s var(--ease-out);
	}
	nav button[aria-expanded='true'] svg {
		transform: rotate(180deg);
	}
	.svc {
		position: relative;
	}
	.menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 50%;
		translate: -50% 0;
		display: grid !important;
		gap: 0.15rem;
		width: 18rem;
		padding: 0.5rem !important;
		background: var(--color-ink-2);
		border: 1px solid var(--color-rule);
		border-radius: 12px;
		box-shadow: 0 20px 40px -16px rgb(0 0 0 / 0.7);
		animation: drop 0.22s var(--ease-out);
	}
	.menu[hidden] {
		display: none !important;
	}
	@keyframes drop {
		from {
			opacity: 0;
			translate: -50% -4px;
		}
	}
	.menu a {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.7rem 0.8rem;
		border-radius: 8px;
		color: var(--color-paper);
		text-decoration: none;
	}
	.menu a:hover {
		background: var(--color-ink-3);
	}
	.menu i,
	.sheet i {
		flex: none;
		width: 1.25rem;
		height: 4px;
		border-radius: 2px;
	}
	.menu span {
		display: grid;
	}
	.menu b {
		font-weight: 600;
	}
	.menu small {
		color: var(--color-mute);
		font-size: 0.8rem;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		padding: 0.6rem 1.15rem;
		border-radius: 999px;
		background: var(--color-paper);
		color: var(--color-ink);
		font-weight: 600;
		text-decoration: none;
		transition: background 0.2s var(--ease-out);
	}
	.cta:hover {
		background: #fff;
	}
	.toggle {
		display: none;
		font: inherit;
		font-weight: 600;
		color: var(--color-paper);
		background: none;
		border: 1px solid var(--color-rule);
		border-radius: 999px;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	.sheet {
		height: calc(100svh - 4.5rem);
		overflow-y: auto;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.sheet[hidden] {
		display: none;
	}
	.sheet ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.sheet a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0;
		color: var(--color-paper);
		text-decoration: none;
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.03em;
	}
	.sheet .sub a {
		font-size: 1.15rem;
		font-weight: 500;
		letter-spacing: 0;
		padding-left: 0.25rem;
		color: var(--color-mute);
	}
	.cta.wide {
		justify-content: center;
		font-size: 1.05rem;
		letter-spacing: 0;
		color: var(--color-ink);
		padding: 1rem;
	}

	@media (max-width: 760px) {
		nav,
		.bar > .cta {
			display: none;
		}
		.toggle {
			display: inline-flex;
		}
	}
</style>
