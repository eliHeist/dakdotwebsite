<script lang="ts">
    import { Plus } from "lucide-svelte";
    import { gsap } from "gsap";
  
    let { question, answer, i, open = false } = $props();

    function toggleAccordion() {
        open = !open;
    }

    let item: HTMLElement;

    $effect(() => {
        const icon = item.querySelector(".plus-btn") as HTMLElement;
        
        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 100%",
                end: "bottom 98%",
                scrub: true,
                markers: false,
                toggleActions: 'play play reverse reverse'
            }
        });

        gsap.set(item, { y: 100, opacity: 0, scale: 0.95 });

        timeline.to(item,
            { y: 0, opacity: 1, scale: 1, ease: 'power1.out', }
        );
    });
</script>

<div class="accordion-item" bind:this={item}>
    <button onclick={toggleAccordion} class="w-full text-left">
        <header class="bg-lead text-dark p-2 rounded-lg flex justify-between cursor-pointer">
            <h3 class="text-xl">{question}</h3>
            <Plus class="plus-btn" size="24" />
        </header>
    </button>
    <div class="accordion-content p-2 text-lg" class:hidden={!open}>
        <p>{answer}</p>
    </div>
</div>