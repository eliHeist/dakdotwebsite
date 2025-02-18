<script lang="ts">
    import { Plus } from "lucide-svelte";
	import AccordionItem from "../ui/accordion-item.svelte";
    
    let faq = [
        {
            question: 'What is Dakdot?',
            answer: 'Dakdot is a digital agency that specializes in web development, branding, and digital marketing.'
        },
        {
            question: 'How long does it take to build a website?',
            answer: 'It depends on the complexity of the website. A simple website can take 2-3 weeks, while a more complex website can take 4-6 weeks.'
        },
        {
            question: 'How much does a website cost?',
            answer: 'The cost of a website depends on the complexity of the website. A simple website can cost $1000-$2000, while a more complex website can cost $3000-$5000.'
        },
        {
            question: 'Do you offer branding services?',
            answer: 'Yes, we offer branding services such as logo design, brand identity, and brand strategy.'
        },
        {
            question: 'Do you offer digital marketing services?',
            answer: 'Yes, we offer digital marketing services such as SEO, social media marketing, and email marketing.'
        },
        {
            question: 'Do you offer web development services?',
            answer: 'Yes, we offer web development services such as website design, website development, and website maintenance.'
        },
        {
            question: 'Do you offer hosting services?',
            answer: 'Yes, we offer hosting services such as domain registration, web hosting, and email hosting.'
        },
        {
            question: 'Do you offer maintenance services?',
            answer: 'Yes, we offer maintenance services such as website updates, security updates, and performance optimization.'
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
