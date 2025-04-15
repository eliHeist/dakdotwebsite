<script>
    let { number, title, body } = $props();
</script>

<div class="step fade-in">
    <div class="step-number text-xl">{number}</div>
    <div class="step-title text-xl">{title}</div>
    <div class="step-spacer"><div class="line"></div></div>
    <div class="step-body">
        <div class="body">{body}</div>
    </div>
</div>

<style>
    .step {
        display: grid;
        grid-template-columns: auto 1fr;
        /* grid-template-rows: auto 0fr; */
        column-gap: 1.25rem;
        row-gap: .25rem;
        transition: grid-template-rows 0.5s ease-in-out;

        &:hover {
            & .step-body{
                opacity: 1;
                translate: 0 0;
            }

            & .step-spacer .line {
                height: 100%;
            }
        }
    }

    .step-number {
        --_size: 2rem;
        font-weight: 500;
        color: var(--red-500);
        height: var(--_size);
        width: var(--_size);
        border-radius: 50%;
        display: grid;
        place-content: center;
        color: var(--color-black);
        background-color: var(--color-white);
    }

    .step-title {
        font-weight: 600;
        margin: auto 0;
    }

    .step-spacer {
        display: grid;
        justify-content: center;
        overflow: hidden;
        
        & .line {
            width: .1rem;
            height: 0%;
            background-image: var(--gradient-main);
            transition: height .3s linear;
        }
    }

    .step-body {
        font-weight: 400;
        overflow: hidden;
        opacity: 0.4;
        translate: 0 -0.5rem;
        transition: all .3s linear;

        & .body {
            padding: 1rem 0;
        }
    }
</style>

