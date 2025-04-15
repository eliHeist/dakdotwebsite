<script lang="ts">
	import { Plus, Paintbrush, Handshake, Lightbulb, Puzzle, TrendingUp, Rocket, Layout, Target, Shield } from 'lucide-svelte';
	import PulsingCircles from '../pulsingCircles.svelte';

	let wrapper: HTMLElement;

	$effect(() => {
		wrapper.querySelectorAll('article').forEach((card, i) => {
			card.addEventListener('click', () => {
				card.classList.toggle('expanded');
				wrapper.querySelectorAll('article').forEach((card, j) => {
					if (i !== j) {
						card.classList.remove('expanded');
					}
				});
			});
		});
	});
</script>

<section class="py-32">
    <div class="content-grid @container">
        <div class="bento-grid">
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up">
                <div>
                    <div class="grid place-content-center py-16">
                        <Paintbrush class="size-32 stroke-1 [filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" />
                    </div>
                </div>
                <header>
                    <h2 class="inline font-semibold">Creativity:</h2>
                    <p class="inline opacity-70">We believe in thinking outside the box, pushing boundaries, and bringing unique solutions to every project.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up">
                <figure>
                    <div class="grid place-content-center py-16">
                        <Handshake class="size-32 stroke-1 [filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" />
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Collaboration:</h2>
                    <p class="inline opacity-70">We work with our clients closely to truly understand their vision and needs, ensuring tailored solutions.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up">
                <figure>
                    <div class="grid place-content-center py-16">
                        <Rocket class="size-32 stroke-1 [filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-red));]" />
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Innovation:</h2>
                    <p class="inline opacity-70">We’re committed to integrating the latest technologies and design trends, keeping our clients ahead of the curve.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up">
                <figure>
                    <div class="grid place-content-center py-16">
                        <Layout class="size-32 stroke-1 [filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-blue));]" />
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Simplicity:</h2>
                    <p class="inline opacity-70">We make sure that our solutions are easy to use, affordable, and effective for each business audience.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up">
                <figure>
                    <div class="grid place-content-center py-16">
                        <Target class="size-32 stroke-1 [filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" />
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Impact:</h2>
                    <p class="inline opacity-70">We aim to create work that not only looks great but performs brilliantly, leading to measurable results and client success.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up">
                <figure>
                    <div class="grid place-content-center py-16">
                        <Shield class="size-32 stroke-1 [filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" />
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Integrity:</h2>
                    <p class="inline opacity-70">We uphold honesty, transparency, and ethical standards in all our work, building trust with our clients and partners.</p>
                </header>
            </div>
        </div>
    </div>
</section>


<style>
	@reference "tailwindcss/theme";

	.bento-grid{
        display: grid;
        gap: 1rem;

        grid-template-columns: 1fr 30fr 1fr;
        grid-template-areas:
            'a a x'
            'y b b'
            'c c z'
            't d d'
            'e e r'
            's f f'
        ;

        @media screen and (min-width: 580px) {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
                'a b'
                'c c'
                'd e'
                'f f'
            ;
        }

        @media screen and (min-width: 680px) {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
                'a b'
                'c d'
                'e f'
            ;
        }

        @media screen and (min-width: 940px) {
            grid-template-columns: 3fr 1fr 3fr;
            grid-template-areas:
                'a b b'
                'c c d'
                'e f f'
            ;
        }

        @media screen and (min-width: 1080px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas:
                'a a a b b b c c c c c'
                'd d d d d e e e f f f'
            ;
        }

        :nth-child(1){
            grid-area: a;
        }
        :nth-child(2){
            grid-area: b;
        }
        :nth-child(3){
            grid-area: c;
        }
        :nth-child(4){
            grid-area: d;
        }
        :nth-child(5){
            grid-area: e;
        }
        :nth-child(6){
            grid-area: f;
        }
    }

    
</style>
