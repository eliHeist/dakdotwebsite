<script lang="ts">
    import { observeText } from "$lib/scripts/textanims";
    import { aboutUsSection } from "$lib/scripts/homeAnimations";

    import { ArrowUpIcon } from "lucide-svelte";

    let wrapper: HTMLElement
    let content: HTMLElement
    let title: HTMLElement

    $effect(() => {
        observeText('top 80%', 'top 10%', true)
        // aboutUsSection(wrapper, content, title)
    })
</script>

<section class="about grid relative items-center bg-white text-dark" bind:this={wrapper}>
    <div class="absolutely content-grid items-center h-screen" bind:this={content}>
        <div class="text-3xl xl:text-6xl">
            <div class="reveal-type">
                <span class="font-bold">Fueled by passion and driven by impact,</span> where every service is crafted with creativity, precision, and a deep understanding of what truly makes a difference. It’s a place where innovation meets purpose, where ideas turn into solutions, and where excellence isn’t just a goal—it’s <span class="font-bold">the standard.</span> With world-class, tailored services designed to inspire growth and create meaningful change, this is more than just business; it’s a commitment to making a real difference. 
                <span class="font-bold">That’s so us.</span>
            </div>
            <p class="text-gradient font-semibold mt-4"></p>
        </div>
    </div>
</section>


<style>

</style>