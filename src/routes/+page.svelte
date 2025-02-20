<script lang="ts">
	import Hero from '$lib/components/homepage/hero.svelte';
	import Aboutus from '$lib/components/homepage/aboutus.svelte';
	import Projects from '$lib/components/homepage/projects.svelte';
    import { observeText } from "$lib/scripts/textanims";

    import type { PageProps } from './$types';
    import { onDestroy } from "svelte";
	import Clients from '$lib/components/homepage/clients.svelte';
	import Services from '$lib/components/homepage/services.svelte';
	import Process from '$lib/components/homepage/process.svelte';
	import Faq from '$lib/components/homepage/faq.svelte';
	import Button from '$lib/components/ui/button.svelte';
    import { addAnimation } from "$lib/scripts/sitewide";

	let { data }: PageProps = $props();
    
    const { projects } = data;

    const sentence = "CREATIVE PROGRAMMING BRANDS DESIGN TO PRODUCE MOTION ANIMATE EDIT AND REFINE WITH CODE";
    const wordsArray = sentence.split(' ').reverse();

    $effect(() => {
        observeText('top 80%', 'top 20%')

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			addAnimation();
		}

    })
</script>

<svelte:head>
	<title>DakDot Creations</title>
	<meta name="description" content="Dakdot homepage, landing page" />
</svelte:head>


<Hero/>

<Clients/>

<Aboutus/>

<Services services={data.services}/>

<Projects {projects}/>

<Process/>

<Faq/>

<section class="">
    <div class="content-grid justify-center text-center">
        <div class="bg-gradient-to-tr from-15% from-[#1F1C1C] to-[#1F1C1D] to-75% py-32 px-6 rounded-4xl grid place-content-center">
            <h2 class="title-1">Got an Idea?</h2>
            <p class="text-lg">
                Great ideas deserve great execution. Let’s collaborate and turn your concept into something extraordinary.
            </p>
            <div class="mt-6">
                <a href="/contact">
					<button
						class="px-6 py-3 text-lg font-medium text-black bg-white rounded-lg [text-decoration:none]"
					>
						Lets Get Started
					</button>
				</a>
            </div>
        </div>
    </div>
</section>

<section class="py-8 bg-black">
	<div class="scroller" data-direction="right" data-speed="fast">
		<div class="scroller__inner gap-4 text-xl">
            {#each wordsArray as word}
                <li>{word}</li>
            {/each}
		</div>
	</div>
</section>



