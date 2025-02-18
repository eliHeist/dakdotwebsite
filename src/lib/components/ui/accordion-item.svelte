<script lang="ts">
    import { Plus } from "lucide-svelte";
    import { gsap } from "gsap";
  
    let { question, answer, i, open = false } = $props();

    function toggleAccordion() {
        open = !open;

    }

    let item: HTMLElement;

    $effect(() => {
    });
</script>

<div class="accordion-item fade-in-up relative" class:open={open}>
    <button class="w-full header-btn text-left border-t border-white cursor-pointer group" onclick="{toggleAccordion}">
        <header class="flex gap-x-6 justify-between py-3">
            <h3 class="text-xl my-auto">{question}</h3>
            <div class="rounded-full aspect-square h-10 w-10 grid place-content-center group-hover:bg-white group-hover:text-black transition-all duration-400 btn-plus">
                <Plus class="plus-btn text-2xl" />
            </div>
        </header>
    </button>
    <div class="accordion-content">
        <p>{answer}</p>
    </div>
    <div class="accordion-backdrop rounded-2xl"></div>
</div>

<!-- <div class="accordion-item open hidden"></div> -->

<style>
    .accordion-item {
        display: grid;
        grid-template-rows: auto 0fr;
        transition: all 0.3s;
        margin-bottom: 0rem;

        .accordion-content{
            overflow: hidden;
        }
        
        .accordion-backdrop {
            background-color: var(--color-white);
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 100%;
            margin: 0 0;
            transition: all 0.3s;
        }

        &.open{
            padding-bottom: 1.25rem;
            margin-bottom: 1.25rem;
            color: var(--color-dark);
            grid-template-rows: auto 1fr;
            
            .accordion-content {
                color: var(--color-dark);
            }

            .header-btn{
                &:hover .btn-plus {
                    background-color: transparent;
                }
            }
            
            .accordion-backdrop {
                background-color: var(--color-white);
                position: absolute;
                inset: 0;
                margin: 0 -1.5rem;
            }
        }
    }
</style>

