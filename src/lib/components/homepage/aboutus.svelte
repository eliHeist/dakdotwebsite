<script lang="ts">
    import { observeText } from "$lib/scripts/textanims";
    import { aboutUsSection } from "$lib/scripts/homeAnimations";

    import { ArrowUpIcon } from "lucide-svelte";

    let wrapper: HTMLElement
    let content: HTMLElement
    let title: HTMLElement

    $effect(() => {
        observeText('top 95%', 'top 40%')
        // aboutUsSection(wrapper, content, title)
    })
</script>

<div class="h-24 bg-gradient-to-t from-black to-transparent"></div>
<section class="about grid relative items-center bg-black" bind:this={wrapper}>
    <div class="absolutely content-grid items-center h-screen" bind:this={content}>
        <div class="text-4xl xl:text-6xl">
            <div class="reveal-type">
                Fueled by passion and driven by impact, every service is crafted with creativity, precision, and a deep understanding of what truly makes a difference. World-class, tailored solutions that spark meaningful change. 
            </div>
            <p class="text-gradient font-semibold mt-4">That’s so us.</p>
        </div>
    </div>
</section>


<style>

</style>