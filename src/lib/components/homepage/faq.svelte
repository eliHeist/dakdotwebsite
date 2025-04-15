<script lang="ts">
    import { Plus } from "lucide-svelte";
	import AccordionItem from "../ui/accordion-item.svelte";
    
    let faq = [
        {
            question: 'How long does it take to build a website?',
            answer: 'It depends on the complexity and size of the website. A simple website can take 2-3 weeks, while a more complex or larger website can take 4-6 weeks.'
        },
        {
            question: 'How much does a website cost?',
            answer: 'The cost of a website depends on the complexity of the website. A simple website can cost anywhere from 700,000/= to 1,100,000/=, while a more complex website can cost from 1,500,000/= to 3,000,000/=.'
        },
        {
            question: 'Do you offer branding services?',
            answer: 'Yes, we offer full branding services such as logo design, brand identity, and brand strategy with brand guidelines.'
        },
        {
            question: 'Do you offer hosting services?',
            answer: 'No, we do not offer hosting as an independent service, rather we handle the hosting services for our clients as part of our web development services.'
        },
        {
            question: 'Do you offer maintenance services?',
            answer: 'Yes, we offer maintenance services such as website updates, security updates, and performance optimization overtime for our web development services.'
        },
        {
            question: 'Do you offer support services?',
            answer: 'Yes, we offer support services such as technical support, customer support, and training.'
        },
        {
            question: 'Do you offer consulting services?',
            answer: 'Yes, we offer consulting services such as strategy consulting, technology consulting, and marketing consulting.'
        },
    ]

    let accordion: HTMLElement;

    $effect(() => {
        let items = accordion.querySelectorAll('.accordion-item');

        items.forEach((item, i) => {
            item.addEventListener('click', () => {
                items.forEach((el, j) => {
                    if (el !== item) {
                        el.classList.remove('open');
                    }
                });
            });
        });
    })

</script>

<section class="py-24 content-grid">
    <div class="wrapper">
        <!-- accordion for the faq -->
        <div class="accordion grid w-[90%] mx-auto" bind:this={accordion}>
            {#each faq as { question, answer }, i}
                <AccordionItem {question} {answer} {i} />
            {/each}
        </div>
    </div>
</section>
