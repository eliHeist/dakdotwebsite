<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import Logo from '$lib/components/ui/Logo.svelte';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import { LINE_IDS, LINES } from '$lib/data/network';
	import { CONTACT, whatsappHref } from '$lib/data/contact';

	let menuOpen = $state(false);
	let scrolled = $state(false);

	afterNavigate(() => (menuOpen = false));

	const is = (prefix: string) => $page.url.pathname.startsWith(prefix);

	const links = [
		{ label: 'Work', href: '/case-studies' },
		{ label: 'Services', href: '/#services' },
		{ label: 'About', href: '/about' }
	];

	$effect(() => {
		document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
	});
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 8)}
	onkeydown={(e) => e.key === 'Escape' && (menuOpen = false)}
/>

<header class="page-header" class:scrolled class:open={menuOpen}>
	<div class="bar">
		<a href="/" class="brand" aria-label="Dakdot home"><Logo class="logo" /></a>

		<nav aria-label="Main">
			<ul>
				{#each links as l}
					<li>
						<a
							href={l.href}
							class="roll-link"
							aria-current={l.href.startsWith('/#') ? undefined : is(l.href) ? 'page' : undefined}
						>
							<span aria-hidden="true">{l.label}</span>
							<span aria-hidden="true">{l.label}</span>
							<span class="sr">{l.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="cta"><RollButton label="Book a call" href="/#book" variant="light" /></div>

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

	<div id="mobile-menu" class="sheet" hidden={!menuOpen}>
		<ul class="big">
			{#each [{ label: 'Home', href: '/' }, ...links] as l, i}
				<li style="--i:{i}"><a href={l.href}>{l.label}</a></li>
			{/each}
		</ul>
		<ul class="svc">
			{#each LINE_IDS as id}
				<li><a href={LINES[id].href}>{LINES[id].name}</a></li>
			{/each}
		</ul>
		<div class="sheet-foot">
			<RollButton label="Book a call" href="/#book" />
			<a href={whatsappHref} target="_blank" rel="noopener">WhatsApp</a>
			<a href="mailto:{CONTACT.email}">{CONTACT.email}</a>
		</div>
	</div>
</header>

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 100;
		transition: background 0.35s var(--ease-out);
	}
	header.scrolled,
	header.open {
		background: var(--color-ink);
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
		height: 1.6rem;
		width: auto;
	}
	/* While Dot is out in the hero, the logo's own dot is empty. */
	:global(html.dot-away) .brand :global(.dot) {
		opacity: 0;
	}

	nav ul {
		display: flex;
		gap: 1.75rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.roll-link {
		position: relative;
		display: inline-grid;
		overflow: hidden;
		height: 1.3em;
		line-height: 1.3em;
		color: var(--color-paper);
		text-decoration: none;
		font-weight: 500;
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
	.roll-link[aria-current='page']::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 5px;
		height: 5px;
		margin-left: -2.5px;
		border-radius: 50%;
		background: var(--color-paper);
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}

	.toggle {
		display: none;
		align-items: center;
		gap: 0.6rem;
		font: inherit;
		font-weight: 600;
		color: var(--color-paper);
		background: none;
		border: 1px solid #3a404a;
		border-radius: 999px;
		padding: 0.55rem 1rem;
		cursor: pointer;
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
		height: calc(100svh - 4.5rem);
		overflow-y: auto;
		padding: 1rem 1.5rem 2rem;
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
		border: 1px solid #3a404a;
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
		.cta {
			display: none;
		}
		.toggle {
			display: inline-flex;
		}
	}
</style>
