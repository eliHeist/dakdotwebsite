<script lang="ts">
	import ServicePage from '$lib/components/services/ServicePage.svelte';
	import HeroMotion from '$lib/components/services/visuals/HeroMotion.svelte';
	import { TEAM } from '$lib/data/team';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Motion | Dakdot</title>
	<meta
		name="description"
		content="Animation, motion graphics, 3D and video from Dakdot that explain what you do and make launches land."
	/>
</svelte:head>

<ServicePage
	id="motion"
	title={['Turn stills', 'into stories', 'with motion.']}
	intro="Visual storytelling is how you hold attention. Our animations, motion graphics, VFX and post-production bring your brand's vision to life, from explainer videos to ads and polished edits."
	introBy={TEAM.bruce}
	contactBy={TEAM.oscar}
	visual={HeroMotion}
	process={data.process}
	features={data.features}
	faq={data.faq}
	technologies={data.technologies}
	products={data.products}
	toolsHeading="Software we use"
/>
