<script lang="ts">
	import ServiceArt from '$lib/components/ui/ServiceArt.svelte';
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import { LINE_IDS, LINES, type LineId } from '$lib/data/network';
	import { reveal, splitWords } from '$lib/actions/motion';

	let { heading = 'What we do' }: { heading?: string } = $props();

	const copy: Record<LineId, string> = {
		web: 'Custom web applications, business systems and fast websites, built to run real operations, not just to sit online.',
		brand:
			'Identities designed as systems: logos, type, colour and rules that keep every touchpoint working together.',
		motion:
			'Animation, 3D and product visualisation that explain what you do and make launches land.'
	};

	let active = $state<LineId>('web');
</script>

<section class="wrap" aria-labelledby="spot-h">
	<h2 id="spot-h" class="sec-h" use:splitWords>{heading}</h2>

	<div class="spot" use:reveal>
		<ul class="names">
			{#each LINE_IDS as id}
				<li>
					<a
						href={LINES[id].href}
						class:on={active === id}
						aria-describedby="spot-panel"
						onpointerenter={() => (active = id)}
						onfocus={() => (active = id)}
					>
						<span class="nm">{LINES[id].name}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="panel" id="spot-panel" aria-live="polite">
			{#key active}
				<div class="pane">
					<ServiceArt id={active} active />
					<p class="desc">{copy[active]}</p>
					<ul class="caps">
						{#each LINES[active].capabilities as cap}<li>{cap}</li>{/each}
					</ul>
					<RollButton
						label={`Explore ${LINES[active].name}`}
						href={LINES[active].href}
						variant="ghost"
					/>
				</div>
			{/key}
		</div>
	</div>

	<!-- Touch and narrow screens: every service with its illustration. -->
	<ul class="stack">
		{#each LINE_IDS as id}
			<li>
				<a href={LINES[id].href}>
					<ServiceArt {id} active />
					<span class="nm">{LINES[id].name}</span>
					<span class="desc">{copy[id]}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
	.sec-h {
		font-size: clamp(2.25rem, 5vw, 4.25rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1;
		padding-top: 6rem;
		margin-bottom: 2.5rem;
	}
	.spot {
		display: grid;
		grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
		gap: 3rem 5rem;
		align-items: start;
	}
	.names {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--color-rule);
	}
	.names a {
		display: flex;
		align-items: baseline;
		gap: 1.5rem;
		padding: 1.6rem 0;
		border-bottom: 1px solid var(--color-rule);
		color: var(--color-mute);
		text-decoration: none;
		transition: color 0.35s var(--ease-out);
	}
	.names a.on,
	.names a:focus-visible {
		color: var(--color-paper);
	}
	.names .nm {
		font-size: clamp(2.25rem, 4.6vw, 4.25rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1;
		transition: translate 0.5s var(--ease-out);
	}
	.names a.on .nm {
		translate: 0.75rem 0;
	}

	.panel {
		position: sticky;
		top: 6rem;
	}
	.pane {
		display: grid;
		gap: 1.25rem;
		justify-items: start;
		animation: swap 0.5s var(--ease-out);
	}
	@keyframes swap {
		from {
			opacity: 0;
			translate: 0 10px;
		}
	}
	.pane :global(.art) {
		width: 100%;
	}
	.desc {
		color: var(--color-mute);
		line-height: 1.6;
		max-width: 46ch;
	}
	.caps {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
	.caps li {
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0.35rem 0.75rem;
		border-radius: 999px;
		border: 1px solid var(--color-rule-strong);
	}

	.stack {
		display: none;
		list-style: none;
		padding: 0;
		margin: 0;
		gap: 2.5rem;
	}
	.stack a {
		display: grid;
		gap: 0.75rem;
		color: inherit;
		text-decoration: none;
	}
	.stack .nm {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.035em;
	}

	@media (max-width: 860px), (hover: none) {
		.spot {
			display: none;
		}
		.stack {
			display: grid;
		}
	}
</style>
