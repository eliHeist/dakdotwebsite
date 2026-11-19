<script lang="ts">
	import Logo from '$lib/components/network/Logo.svelte';
	import { CONTACT, SOCIALS, whatsappHref } from '$lib/data/contact';
	import { LINE_IDS, LINES } from '$lib/data/network';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="rails" aria-hidden="true">
		{#each LINE_IDS as id}<span style="background: var({LINES[id].colorVar})"></span>{/each}
	</div>

	<div class="grid">
		<div class="col talk">
			<p class="h">Contact</p>
			<a href="/#book">Book a call</a>
			<a href={whatsappHref} target="_blank" rel="noopener">WhatsApp</a>
			<a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
			<a href="mailto:{CONTACT.email}">{CONTACT.email}</a>
		</div>

		<div class="col">
			<p class="h">Lines</p>
			{#each LINE_IDS as id}
				<a href={LINES[id].href}>{LINES[id].name}</a>
				{#each LINES[id].capabilities as cap}<span class="cap">{cap}</span>{/each}
			{/each}
		</div>

		<div class="col">
			<p class="h">Studio</p>
			<a href="/case-studies">Work</a>
			<a href="/about">About</a>
			<a href="/contact">Contact</a>
		</div>

		<div class="col">
			<p class="h">Follow</p>
			{#each SOCIALS as s}<a href={s.href} target="_blank" rel="noopener">{s.name}</a>{/each}
		</div>
	</div>

	<div class="base">
		<Logo class="flogo" />
		<p class="tnum">© {year} Dakdot · Kampala, Uganda</p>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--color-rule);
		margin-top: 2rem;
		padding: 0 1.5rem 2rem;
	}
	.rails {
		max-width: 85rem;
		margin: 0 auto;
		display: grid;
		gap: 6px;
		padding-top: 6px;
	}
	.rails span {
		height: 3px;
		border-radius: 2px;
	}
	.grid {
		max-width: 85rem;
		margin: 0 auto;
		padding: 4rem 0 3rem;
		display: grid;
		grid-template-columns: minmax(0, 2fr) repeat(3, minmax(0, 1fr));
		gap: 2.5rem;
	}
	.col {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.45rem;
		font-size: 0.95rem;
	}
	.h {
		font-size: 0.85rem;
		color: var(--color-mute);
		margin-bottom: 0.5rem;
	}
	.col a {
		color: var(--color-paper);
		text-decoration: none;
	}
	.col a:hover {
		text-decoration: underline;
	}
	.cap {
		color: var(--color-mute);
		font-size: 0.82rem;
		padding-left: 0.75rem;
	}
	.cap + a {
		margin-top: 0.6rem;
	}
	.base {
		max-width: 85rem;
		margin: 0 auto;
		padding-top: 2rem;
		border-top: 1px solid var(--color-rule);
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		color: var(--color-mute);
		font-size: 0.85rem;
	}
	.base :global(.flogo) {
		height: clamp(2.5rem, 7vw, 5.5rem);
		width: auto;
		color: var(--color-paper);
	}

	@media (max-width: 820px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
		.talk {
			grid-column: 1 / -1;
		}
	}
</style>
