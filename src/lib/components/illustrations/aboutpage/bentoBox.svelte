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
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up group">
                <div>
                    <div class="grid place-content-center py-16">
                        <svg class="size-32 transition-all 
                            group-hover:text-yellow
                            hover:[filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" 
                        viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5c-3.81 0-6.5 2.743-6.5 6.119c0 1.536.632 2.572 1.425 3.56c.172.215.347.422.527.635l.096.112c.21.25.427.508.63.774c.404.531.783 1.128.995 1.834a.75.75 0 0 1-1.436.432c-.138-.46-.397-.89-.753-1.357a18.111 18.111 0 0 0-.582-.714l-.092-.11c-.18-.212-.37-.436-.555-.667C4.87 12.016 4 10.651 4 8.618C4 4.363 7.415 1 12 1s8 3.362 8 7.619c0 2.032-.87 3.397-1.755 4.5c-.185.23-.375.454-.555.667l-.092.109c-.21.248-.405.481-.582.714c-.356.467-.615.898-.753 1.357a.751.751 0 0 1-1.437-.432c.213-.706.592-1.303.997-1.834c.202-.266.419-.524.63-.774l.095-.112c.18-.213.355-.42.527-.634c.793-.99 1.425-2.025 1.425-3.561C18.5 5.243 15.81 2.5 12 2.5ZM8.75 18h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Zm.75 3.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z"/></svg>
                        <!-- <Paintbrush class="size-32 stroke-1 [filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" /> -->
                    </div>
                </div>
                <header>
                    <h2 class="inline font-semibold">Creativity:</h2>
                    <p class="inline opacity-70">We believe in thinking outside the box, pushing boundaries, and bringing unique solutions to every project.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up group">
                <figure>
                    <div class="grid place-content-center py-16">
                        <svg class="size-32 transition-all 
                            group-hover:text-yellow
                            hover:[filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" 
                            viewBox="0 0 32 32"><path fill="currentColor" d="M19.313 6.969c-.555.004-1.106.031-1.688.187a6.026 6.026 0 0 0-1.781.813c-.766-.45-1.508-.82-2.219-.907c-.883-.109-1.703-.05-2.656-.03c-1.13.023-1.867.6-3.063 1.062C6.711 8.554 5.172 9 3 9H2v9.625l.563.281l1.843.907l6.563 7.312l.031.031c.75.742 1.762.926 2.656.875c.895-.05 1.735-.312 2.406-.718c1.477-.891 5.5-3.688 5.5-3.688l.094-.063l.063-.062c.476-.473.715-1.05.875-1.656l3.843-1.938l2.875-.968l.688-.22V9h-1a12.84 12.84 0 0 1-4.906-.938C22.898 7.595 22.172 7.024 21.03 7c-.61-.012-1.164-.035-1.718-.031zm.03 2c.45-.004.97.02 1.626.031c.105.004 1.066.414 2.406.938c1.133.445 2.707.84 4.625.968v6.375l-2.313.782h-.062l-.063.03l-3.03 1.532a3.55 3.55 0 0 0-.75-1.25l-.063-.094l-4.25-5.218l-.625-.782l-.782.625l-2.687 2.188c-.902.625-1.633.445-2.375.094c-.215-.102-.203-.133-.375-.25l4.563-3.782l.062-.062c1.355-1.344 2.188-1.809 2.906-2c.36-.098.739-.121 1.188-.125zM12.376 9a7.291 7.291 0 0 1 1 .031c.262.031.559.254.813.344c-.102.094-.176.148-.282.25l-.062.063l-5.469 4.53l-.844.688l.75.781s.723.782 1.844 1.313c1.121.531 2.852.832 4.406-.25l.063-.063l1.937-1.593l3.688 4.531l.031.063l.031.03c.66.653.645 1.68 0 2.345c-.008.007.008.023 0 .03c-.008.005-.14.083-.156.095l-1.313-1.782l-1.625 1.188l1.282 1.718c-.52.352-.754.536-1.313.907l-1.343-1.813l-1.626 1.188l1.282 1.718c-.114.07-.348.227-.438.282c-.316.191-.926.406-1.469.437c-.511.028-.902-.09-1.093-.25l-.031-.031l-6.688-7.406l-.125-.157L4 17.375v-6.469c1.91-.125 3.496-.504 4.625-.937c1.336-.512 2.29-.934 2.406-.938L12.375 9z"/></svg>
                        <!-- <Handshake class="size-32 transition-all 
                            group-hover:text-yellow
                            hover:[filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-yellow));]" /> -->
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Collaboration:</h2>
                    <p class="inline opacity-70">We work with our clients closely to truly understand their vision and needs, ensuring tailored solutions.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up group">
                <figure>
                    <div class="grid place-content-center py-16">
                        <svg class="size-32 transition-all 
                            group-hover:text-red
                            hover:[filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-red));]"
                            viewBox="0 0 256 256"><path fill="currentColor" d="M152 224a8 8 0 0 1-8 8h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8Zm-24-112a12 12 0 1 0-12-12a12 12 0 0 0 12 12Zm95.62 43.83l-12.36 55.63a16 16 0 0 1-25.51 9.11L158.51 200h-61l-27.26 20.57a16 16 0 0 1-25.51-9.11l-12.36-55.63a16.09 16.09 0 0 1 3.32-13.71l28.56-34.26a123.07 123.07 0 0 1 8.57-36.67c12.9-32.34 36-52.63 45.37-59.85a16 16 0 0 1 19.6 0c9.34 7.22 32.47 27.51 45.37 59.85a123.07 123.07 0 0 1 8.57 36.67l28.56 34.26a16.09 16.09 0 0 1 3.32 13.71ZM99.43 184h57.14c21.12-37.54 25.07-73.48 11.74-106.88C156.55 47.64 134.49 29 128 24c-6.51 5-28.57 23.64-40.33 53.12c-13.31 33.4-9.36 69.34 11.76 106.88Zm-15 5.85q-16.15-29.35-19.6-57.69L48 152.36L60.36 208l.18-.13ZM208 152.36l-16.83-20.2q-3.42 28.28-19.56 57.69l23.85 18l.18.13Z"/></svg>
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Innovation:</h2>
                    <p class="inline opacity-70">We’re committed to integrating the latest technologies and design trends, keeping our clients ahead of the curve.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up group">
                <figure>
                    <div class="grid place-content-center py-16">
                        <svg class="size-32 transition-all 
                            group-hover:text-green-500
                            hover:[filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-green-500));]"
                            viewBox="0 0 256 256"><path fill="currentColor" d="M208 40H48a16 16 0 0 0-16 16v58.77c0 89.61 75.82 119.34 91 124.39a15.53 15.53 0 0 0 10 0c15.2-5.05 91-34.78 91-124.39V56a16 16 0 0 0-16-16Zm0 74.79c0 78.42-66.35 104.62-80 109.18c-13.53-4.51-80-30.69-80-109.18V56h160Z"/></svg>
                        <!-- <Shield  /> -->
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Integrity:</h2>
                    <p class="inline opacity-70">We uphold honesty, transparency, and ethical standards in all our work, building trust with our clients and partners.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up group">
                <figure>
                    <div class="grid place-content-center py-16">
                        <svg class="size-32 transition-all 
                            group-hover:text-pink-500
                            hover:[filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-pink-500));]"
                            viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="8"/><circle cx="10.5" cy="10.5" r="2"/><circle cx="10.5" cy="10.5" r="5"/></g></svg>
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Impact:</h2>
                    <p class="inline opacity-70">We aim to create work that not only looks great but performs brilliantly, leading to measurable results and client success.</p>
                </header>
            </div>
            <div class="bg-dark/60 transition-all duration-700 hover:bg-dark/90 p-6 gap-6 rounded-lg fade-in-up group">
                <figure>
                    <div class="grid place-content-center py-16">
                        <svg class="size-32 transition-all 
                            group-hover:text-blue
                            hover:[filter:drop-shadow(0_0_.1rem_var(--color-white))_drop-shadow(0_0_1.5rem_var(--color-blue));]"
                            viewBox="0 0 48 48"><path fill="currentColor" d="M20.002 10.5a4 4 0 0 0 2.226 3.586l.492.179a3.75 3.75 0 0 0 2.566 0l.491-.179a4 4 0 1 0-5.775-3.586Zm-2.194 1.977A6.5 6.5 0 0 1 24.003 4a6.5 6.5 0 0 1 6.194 8.477l6.1-2.22a4.25 4.25 0 0 1 2.908 7.988l-8.201 2.985v4.796c0 .353.067.703.2 1.03L35.69 38.16a4.25 4.25 0 1 1-7.882 3.185l-3.807-9.422l-3.807 9.421a4.25 4.25 0 0 1-7.882-3.184l4.49-11.112c.132-.327.2-.677.2-1.03V21.23L8.8 18.245a4.25 4.25 0 1 1 2.907-7.987l6.1 2.22Zm3.444 3.914l-10.399-3.784a1.75 1.75 0 0 0-1.197 3.289l8.365 3.044a2.25 2.25 0 0 1 1.481 2.114v4.964c0 .674-.13 1.342-.382 1.967l-4.49 11.112a1.75 1.75 0 1 0 3.245 1.311l4.04-9.995c.758-1.877 3.414-1.877 4.172 0l4.04 9.995a1.75 1.75 0 0 0 3.245-1.311l-4.487-11.105a5.25 5.25 0 0 1-.382-1.966v-4.972c0-.945.592-1.79 1.481-2.114l8.365-3.044a1.75 1.75 0 1 0-1.197-3.29l-10.398 3.785a6.477 6.477 0 0 1-2.751.609a6.477 6.477 0 0 1-2.751-.609Z"/></svg>
                        <!-- <Layout  /> -->
                    </div>
                </figure>
                <header>
                    <h2 class="inline font-semibold">Ease of access:</h2>
                    <p class="inline opacity-70">We make sure that our solutions are easy to use, affordable, and effectively valuable for each client.</p>
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
