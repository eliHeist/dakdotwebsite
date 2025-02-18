<script lang="ts">
    import { Plus } from "lucide-svelte";

    let { title, body, icon } = $props();

    let card:HTMLElement
    let expanded = $state(false)

    $effect(() => {
        card.addEventListener("click", () => {
            expanded = !expanded
        })
    })
</script>


<div class="card slide-in-up" bind:this={card} class:expanded={expanded}>
    <div class="icon">
        <img src={icon} alt={title}>
    </div>
    <div class="body">{body}</div>
    <header>
        <h3 class="title">{title}</h3>
        <div class="plus-btn">
            <Plus />
        </div>
    </header>
</div>

<style>
    @reference "tailwindcss/theme";
    
    .card {
        background-color: var(--color-white);
        color: var(--color-black);
        padding: 1.5rem;
        border-radius: 1.5rem;
        aspect-ratio: 3/4;
        display: grid;
        grid-template-rows: 1fr 0 auto;
        cursor: pointer;
        transition: grid-template-rows .3s linear;
        
        & .icon {
            display: grid;
            place-content: center;
            overflow: hidden;
        }

        & .body {
            @apply text-xl;
            color: var(--color-dark);
            overflow: hidden;
        }

        & header{
            display: flex;
            justify-content: space-between;
            column-gap: .75rem;
            
            & .title{
                font-size: 1.5rem;
                margin: auto 0;
            }
            
            & .plus-btn{
                @apply h-10 w-10 mt-auto;
                font-size: 1rem;
                aspect-ratio: 1/1;
                outline: 1px solid var(--color-black);
                display: grid;
                place-content: center;
                border-radius: 50%;
                rotate: 0;
                transition: all .375s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        }

        &:hover {
            & header .plus-btn {
                color: var(--color-white);
                background-color: var(--color-black);
            }
        }

        &.expanded {
            grid-template-rows: 0 1fr auto;

            & header .plus-btn {
                rotate: 45deg;
            }
        }
    }
</style>