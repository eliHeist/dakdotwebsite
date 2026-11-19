<script lang="ts">
	import ServicePage from '$lib/components/services/ServicePage.svelte';
	import HeroBrand from '$lib/components/services/visuals/HeroBrand.svelte';
	import { TEAM } from '$lib/data/team';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Brand Design | Dakdot</title>
	<meta
		name="description"
		content="Brand identities designed as systems by Dakdot: logos, type, colour and guidelines that keep every touchpoint consistent."
	/>
</svelte:head>

<ServicePage
	id="brand"
	title={['Brand', 'visual', 'design.']}
	intro="Your brand is more than just a logo. It's the visual and emotional identity that connects with your audience. We create unique, compelling identities that communicate your values and make you stand out."
	introBy={TEAM.martin}
	contactBy={TEAM.martin}
	visual={HeroBrand}
	process={data.process}
	features={data.features}
	faq={data.faq}
	technologies={data.technologies}
	products={data.products}
	toolsHeading="Software we use"
/>
