<script lang="ts">
	import Hero from '$lib/components/homepage/hero.svelte';
	import Aboutus from '$lib/components/homepage/aboutus.svelte';
	import Projects from '$lib/components/homepage/projects.svelte';
    import { observeText } from "$lib/scripts/textanims";

    import type { PageProps } from './$types';

	let { data }: PageProps = $props();
    
    const { projects } = data;

    $effect(() => {
        observeText('top 80%', 'top 20%')
    })
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Dakdot homepage, landing page" />
</svelte:head>


<Hero/>

<Aboutus/>

<Projects {projects}/>



