<script lang="ts">
	import { Star, Computer } from 'lucide-svelte';
	import { gsap } from 'gsap';

    let { services } = $props();

	let tags = [
		{ name: 'UI/UX Design' },
		{ name: 'Product Visualization' },
		{ name: 'Brand Design' },
		{ name: 'Digital Marketing' },
		{ name: 'Web App Development' },
		{ name: 'Branding' },
		{ name: 'Motion Graphics' },
		{ name: 'Video Production' },
		{ name: 'Animation' },
		{ name: 'Photography' }
	];

	let servicesWrapper: HTMLElement;
	let servicesHeader: HTMLElement;
</script>

<section class="content-grid py-32">
	<div class="services gap-y-12 grid place-content-center relative" bind:this={servicesWrapper}>
		<header class="" bind:this={servicesHeader}>
			<h2 class="title-1">
				What we <br />Do for You?
			</h2>
		</header>
        <div class="grid gap-6 md:grid-cols-2">
            {#each services as service, index}
                <div class="card fade-in-up">
                    <div class="icons">
                        <div class="icon">
                            <img class="default" src={service.icon} alt={service.title}>
                            <img class="hover" src={service.icon_colored} alt={service.title}>
                        </div>
                    </div>
                    <h3>{service.title}</h3>
                    <div class=""></div>
                    <p>{service.details}</p>
                </div>
            {/each}
        </div>
	</div>
	<section class="py-20 bg-black">
		<div class="scroller" data-direction="right" data-speed="fast">
			<div class="scroller__inner gap-x-3">
				{#each tags.slice(0, Math.ceil(tags.length / 2)) as tag}
					<div class="px-3 flex gap-x-2 items-center w-max">
						<Star class="fill-red stroke-red h-4" />
						<span>{tag.name}</span>
					</div>
				{/each}
			</div>
		</div>
		<div class="scroller" data-direction="left" data-speed="fast">
			<div class="scroller__inner gap-x-3">
				{#each tags.slice(Math.ceil(tags.length / 2)) as tag}
					<div class="px-3 flex gap-x-2 items-center w-max">
						<Star class="fill-red stroke-red h-4" />
						<span>{tag.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
</section>

<style>
	.card {
        --gap: 1.5rem;
        --icon: 4rem;
        --img: 55%;
        --duration: .35s;

		border-radius: calc(var(--gap)/1.5);
        background-color: var(--color-white);
		display: grid;
        column-gap: var(--gap);
        row-gap: calc(var(--gap)/1.5);
        padding: var(--gap);
        grid-template-columns: auto 1fr;

        .icons {
            .icon{
                height: var(--icon);
                width: var(--icon);
                background-color: var(--color-white);
                border-radius: 50%;
                position: relative;
                overflow: hidden;
                border: 1px solid var(--color-dark);

                img{
                    width: var(--img);
                    height: var(--img);
                    object-fit: contain;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    translate: -50% -50%;
                    transition: top var(--duration) cubic-bezier(0.175, 0.885, 0.32, 1.275), left var(--duration) cubic-bezier(0.175, 0.885, 0.32, 1.275);

                    &.hover{
                        left: -20%;
                        top: 120%;
                    }
                }
            }
        }

        h3{
            font-size: 2rem;
            margin: auto 0;
            color: var(--color-dark);
        }

        p{
            color: var(--color-lead);
            color: var(--color-dark-lead);
        }

        &:hover{
            .icons{
                img{
                    &.default{
                        left: 120%;
                        top: -20%;
                    }
                    &.hover{
                        left: 50%;
                        top: 50%;
                    }
                }
            }
        }

        @media (min-width: 1024px) {
            --gap: 2.25rem;
        }
	}
</style>
