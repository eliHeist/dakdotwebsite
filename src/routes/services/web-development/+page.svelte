<script lang="ts">
	import ServicePage from '$lib/components/services/ServicePage.svelte';
	import HeroWeb from '$lib/components/services/visuals/HeroWeb.svelte';
	import { TEAM } from '$lib/data/team';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Web Development | Dakdot</title>
	<meta
		name="description"
		content="Custom web applications, business systems and fast websites from Dakdot, built to run real operations."
	/>
</svelte:head>

<ServicePage
	id="web"
	title={['Custom', 'solutions', 'on the web.']}
	intro="In today's digital world, businesses need more than just a website. They need powerful, interactive web applications that automate operations, store information and define how the business runs."
	introBy={TEAM.elijah}
	contactBy={TEAM.elijah}
	visual={HeroWeb}
	process={data.process}
	features={data.features}
	faq={data.faq}
	technologies={data.technologies}
	products={data.products}
	toolsHeading="Our tech stack"
/>
