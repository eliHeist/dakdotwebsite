<script lang="ts">
    import { Plus } from "lucide-svelte";

    export let question: string;
    export let answer: string;
    export let i: number;
    export let open: boolean = false;

    function toggleAccordion() {
        open = !open;
    }
</script>

<div class="accordion-item">
    <button onclick={toggleAccordion} class="w-full text-left">
        <header class="bg-lead text-dark p-2 rounded-lg flex justify-between cursor-pointer">
            <h3 class="text-xl">{question}</h3>
            <Plus class="" size="24" />
        </header>
    </button>
    <div class="accordion-content p-2 text-lg" class:hidden={!open}>
        <p>{answer}</p>
    </div>
</div>