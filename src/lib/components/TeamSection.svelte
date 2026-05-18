<script lang="ts">
    import { ArrowUp } from "@lucide/svelte";

    let team = [
        {
            name: 'Oscar Kayima',
            role: 'CEO & Animation Lead',
            image: '/images/team/oscar-dd.webp',
            bio: 'The visionary behind DakDot Creations, leading the company with a passion for excellence. With a background in animation and motion design, he oversees all projects to ensure they meet our standard. He also spear-heads our animation team, creating top tier animations that bring our clients, visions to life.',
            color: 'var(--color-yellow)'
        },
        {
            name: 'Allan Martin Ssebaggala',
            role: 'Design Lead',
            image: '/images/team/martin-dd.webp',
            bio: 'Martin is a talented designer with a keen eye for aesthetics and user experience. He leads our design team in creating visually stunning and user-friendly digital products.',
            color: 'var(--color-blue)'
        },
        {
            name: 'Acuty Bruce Byereta',
            role: 'Content Strategist',
            image: '/images/team/bruce-dd.webp',
            bio: 'Bruce is a skilled content strategist who crafts compelling narratives that resonate with audiences. He works closely with all the teams to ensure our content is authentic to each project.',
            color: 'var(--color-blue)'
        },
        {
            name: 'Elijah Triumph Angengeun',
            role: 'Dev Lead',
            image: '/images/team/elijah-dd.webp',
            bio: 'Responsible for leading our development team and ensuring the successful delivery of our software projects. With expertise in web application development.',
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
                    <p class="bio text-lg">{member.bio}</p>
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