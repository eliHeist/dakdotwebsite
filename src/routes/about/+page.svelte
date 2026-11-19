<script lang="ts">
	import ServiceSpotlight from '$lib/components/home/ServiceSpotlight.svelte';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import { TEAM, TEAM_ORDER } from '$lib/data/team';
	import { reveal, splitWords } from '$lib/actions/motion';
	const team = TEAM_ORDER.map((id) => TEAM[id]);

	const values = [
		{
			name: 'Results-driven',
			body: 'We focus on work that moves your business: products that run operations, brands that get remembered, content that gets watched.'
		},
		{
			name: 'Client-focused',
			body: 'We start from your goals, not our portfolio, and shape every design and system around how your business actually works.'
		},
		{
			name: 'Committed to craft',
			body: "We don't settle for good enough. Every detail gets attention, from the first sketch to the last line of code."
		}
	];
</script>

<svelte:head>
	<title>About | Dakdot</title>
	<meta
		name="description"
		content="Dakdot is a team of designers, developers and storytellers in Kampala building brands, software and motion as one system."
	/>
</svelte:head>

<section class="wrap hero" aria-labelledby="about-h">
	<h1 id="about-h" use:splitWords>We're Dakdot.</h1>
	<div class="hero-copy">
		<p class="big" use:reveal>
			A team of designers, developers and storytellers helping businesses thrive in the digital age.
		</p>
		<p class="small" use:reveal={80}>
			We craft brands, software and motion that work together, so your business looks, runs and
			speaks as one. We're more than a service provider; we're your creative partner, committed to
			turning ideas into reality.
		</p>
	</div>
</section>

<section class="wrap" aria-labelledby="values-h">
	<h2 id="values-h" class="sec-h" use:splitWords>What we believe</h2>
	<ul class="values">
		{#each values as v, i}
			<li use:reveal={i * 70}>
				<h3>{v.name}</h3>
				<p>{v.body}</p>
			</li>
		{/each}
	</ul>
</section>

<ServiceSpotlight />

<section class="wrap" aria-labelledby="team-h">
	<h2 id="team-h" class="sec-h" use:splitWords>The people behind the work</h2>
	<ul class="team">
		{#each team as p, i}
			<li use:reveal={(i % 2) * 80}>
				<article class="member" aria-labelledby="m-{p.id}">
					<div class="photo">
						<img src={p.image} alt={`Portrait of ${p.name}`} loading="lazy" />
					</div>
					<div class="info">
						<h3 id="m-{p.id}">{p.name}</h3>
						<p class="role">{p.role}</p>
						<p class="bio">{p.bio}</p>
						{#if p.linkedin}
							<a class="li" href={p.linkedin} target="_blank" rel="noopener">LinkedIn</a>
						{/if}
					</div>
				</article>
			</li>
		{/each}
	</ul>
</section>

<section class="wrap" aria-labelledby="end-h">
	<div class="end" use:reveal>
		<h2 id="end-h">Let's create the future together.</h2>
		<p>
			Whether you're a startup looking for a bold identity or a company that needs serious digital
			systems, we'd love to hear what you're building.
		</p>
		<RollButton label="Book a call" href="/contact" variant="light" size="lg" />
	</div>
</section>

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
	.hero {
		min-height: 88svh;
		padding-top: clamp(8rem, 18vh, 12rem);
		padding-bottom: 4rem;
		display: grid;
		align-content: space-between;
		gap: 4rem;
	}
	h1 {
		font-size: clamp(3.5rem, 13vw, 12rem);
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 0.88;
	}
	.hero-copy {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 2rem 4rem;
		align-items: end;
	}
	.big {
		font-size: clamp(1.6rem, 3.2vw, 2.85rem);
		font-weight: 600;
		letter-spacing: -0.025em;
		line-height: 1.2;
		text-wrap: pretty;
	}
	.small {
		color: var(--color-mute);
		font-size: 1.1rem;
		line-height: 1.6;
		max-width: 44ch;
	}

	.sec-h {
		font-size: clamp(2.25rem, 5vw, 4.25rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1;
		padding-top: 6rem;
		margin-bottom: 2.5rem;
	}

	.values {
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--color-rule);
	}
	.values li {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		gap: 1rem 4rem;
		align-items: baseline;
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-rule);
	}
	.values h3 {
		font-size: clamp(1.75rem, 3.4vw, 3rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.05;
		transition: translate 0.5s var(--ease-out);
	}
	.values li:hover h3 {
		translate: 0.6rem 0;
	}
	.values p {
		color: var(--color-mute);
		line-height: 1.6;
		max-width: 52ch;
	}

	.team {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5rem;
	}
	.member {
		position: relative;
		display: block;
		aspect-ratio: 9 / 10;
		border-radius: 24px;
		overflow: hidden;
		background: var(--color-ink-3);
		outline-offset: 4px;
	}
	.photo {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: end center;
	}
	.photo img {
		width: 82%;
		transition:
			width 0.9s var(--ease-out),
			translate 0.9s var(--ease-out);
	}
	.member:hover .photo img,
	.member:focus-within .photo img {
		width: 90%;
		translate: 0 2%;
	}
	.info {
		position: absolute;
		left: 0.75rem;
		right: 0.75rem;
		bottom: 0.75rem;
		padding: 1.1rem 1.25rem;
		border-radius: 18px;
		background: var(--color-ink);
		display: grid;
		grid-template-rows: auto auto 0fr auto;
		transition: grid-template-rows 0.5s var(--ease-out);
	}
	.member:hover .info,
	.member:focus-within .info {
		grid-template-rows: auto auto 1fr auto;
	}
	.info h3 {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.role {
		margin-top: 0.15rem;
		font-size: 0.85rem;
		color: var(--color-mute);
	}
	.bio {
		overflow: hidden;
		min-height: 0;
		color: var(--color-mute);
		line-height: 1.55;
		opacity: 0;
		transition: opacity 0.4s var(--ease-out);
	}
	.member:hover .bio,
	.member:focus-within .bio {
		opacity: 1;
		padding-top: 0.75rem;
	}
	.li {
		justify-self: start;
		margin-top: 0.75rem;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-paper);
	}

	.end {
		margin: 8rem 0 6rem;
		display: grid;
		gap: 1.5rem;
		justify-items: start;
	}
	.end h2 {
		font-size: clamp(2.75rem, 8vw, 7.5rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.95;
		max-width: 12ch;
		text-wrap: balance;
	}
	.end p {
		color: var(--color-mute);
		font-size: 1.15rem;
		line-height: 1.55;
		max-width: 46ch;
	}

	@media (max-width: 860px) {
		.hero-copy,
		.values li {
			grid-template-columns: 1fr;
		}
		.team {
			grid-template-columns: 1fr;
		}
		.hero {
			min-height: auto;
		}
	}
	@media (hover: none) {
		.info {
			grid-template-rows: auto auto 1fr auto;
		}
		.bio {
			opacity: 1;
			padding-top: 0.75rem;
		}
	}
</style>
