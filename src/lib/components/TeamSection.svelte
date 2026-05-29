<script lang="ts">
    import { ArrowUp } from "@lucide/svelte";

    let team = [
        {
            name: 'Oscar Kayima',
            role: 'CGI Director',
            image: '/images/team/oscar-dd.webp',
            bio: 'The Visionary: Turning concepts into photorealistic 3D assets and environments.',
            color: 'var(--color-yellow)'
        },
        {
            name: 'Allan Martin Ssebaggala',
            role: 'Art Director',
            image: '/images/team/martin-dd.webp',
            bio: 'The Stylist: Crafting the visual soul of every project through design and intentional aesthetic direction.',
            color: 'var(--color-blue)'
        },
        {
            name: 'Acuty Bruce Byereta',
            role: 'Content Lead',
            image: '/images/team/bruce-dd.webp',
            bio: 'The Storyteller: Weaving compelling narratives that connect with audiences and bring our projects to life.',
            color: 'var(--color-blue)'
        },
        {
            name: 'Elijah Triumph Angengeun',
            role: 'Chief Technology Officer',
            image: '/images/team/elijah-dd.webp',
            bio: 'The Architect: Transforms ideas into high-performance digital systems.',
            color: 'var(--color-red)'
        }
    ];
</script>

<div class="content-grid py-32">
    <h2 class="title-2 h-fit">Meet The Team</h2>
    <div class="@container mt-32">
        <div class="grid gap-8 @min-2xl:grid-cols-2">
            {#each team as member}
            <article class="aspect-9/10 bg-beige rounded-4xl relative overflow-hidden group">
                <img src={member.image} alt={member.name} class="absolute top-16 w-10/12 left-1/2 -translate-x-1/2 transition-all duration-1000 group-hover:top-4 group-hover:w-11/12" />
                <div class="p-4 absolute bg-dark/30 backdrop-blur-xl left-2 right-2 bottom-2 rounded-3xl content">
                    <div>
                        <h3 class="font-medium text-xl text-white">{member.name}</h3>
                        <p class="uppercase text-sm mt-1">{member.role}</p>
                    </div>
                    <button class="absolute right-2 top-2 p-2 rotate-45 opacity-80 arrow-btn">
                        <ArrowUp class="size-6" />
                    </button>
                    <p class="bio text-lg overflow-hidden">{member.bio}</p>
                </div>
            </article>
            {/each}
        </div>
    </div>
</div>

<style>
    article {
        & .content{
            display: grid;
            grid-template-rows: auto 0fr;
            row-gap: 0rem;
            transition: grid-template-rows 0.5s ease, row-gap 0.5s ease;

            & .bio {
                min-height: 0;
                opacity: 0;
                transition: opacity 0.6s ease-in-out;
            }

            & .arrow-btn {
                transform: rotateZ(0deg);
                transition: transform 2s ease;
            }
        }

        &:hover {
            & .content {
                grid-template-rows: auto 1fr;
                row-gap: 1rem;

                & .bio {
                    opacity: 0.7;
                }

                & .arrow-btn {
                    transform: rotateZ(180deg);
                }
            }
        }
    }
</style>