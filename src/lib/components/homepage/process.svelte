<script lang="ts">
    let steps = [
        {
            title: 'Discovery & Strategy',
            description: 'Every journey starts with a conversation. We take the time to understand your brand, goals, and challenges. Through research and strategy, we define the roadmap to bring your vision to life.'
        },
        {
            title: 'Design & Development',
            description: 'With a clear direction, we craft engaging, thoughtful, and innovative solutions. Every element is designed with precision, balancing creativity with functionality to transform concepts into seamless, high-quality experiences.'
        },
        {
            title: 'Testing',
            description: 'Quality is non-negotiable. We review, test, and optimize to ensure everything functions flawlessly. From fine-tuning details to enhancing performance, this stage guarantees that the final result meets the highest standards.'
        },
        {
            title: 'Delivery and Support',
            description: 'Once perfected, the project is deployed with confidence. But delivery isn’t the end—it’s the beginning of growth. We provide support and continuous improvements, ensuring long-term success in an ever-evolving digital world.'
        }
    ];
</script>

<section class="content-grid bg-black py-24">
    <header class="pb-16">
        <h2 class="title-1">How we <br>Work?</h2>
    </header>
    <div class="steps grid gap-y-24">
        {#each steps as step, index}
            <div class="step">
                <div class="number grid content-center">
                    <div class="rounded-full bg-white h-8 aspect-square grid place-content-center text-black text-xl font-semibold">
                        {index + 1}
                    </div>
                </div>
                <header class="grid content-center">
                    <h3 class="text-4xl">{step.title}</h3>
                </header>
                <div class="spacer"></div>
                <div class="description text-lead text-lg">
                    <p>{step.description}</p>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .step{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
    }
</style>
