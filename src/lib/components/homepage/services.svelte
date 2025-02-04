<script lang="ts">
    import { Star } from "lucide-svelte";
    
	let services = [
		{
			title: 'Software Solutions',
            image_url: '/images/business-woman-working-office.webp',
			description:
				'We create fast, responsive, and scalable digital experiences, from simple landing pages to complex web applications.'
		},
		{
			title: 'Design',
            image_url: '/images/business-woman-working-office.webp',
			description:
				'Our design team crafts stunning visuals and brand identities that connect with your audience and make your brand unforgettable.'
		},
		{
			title: 'Motion',
            image_url: '/images/business-woman-working-office.webp',
			description:
				'We produce captivating videos and motion graphics that grab attention, tell your story, and leave a lasting impression.'
		}
	];

    let tags = [
        {'name': "UI/UX Design"},
        {'name': "Product Visualization"},
        {'name': "Brand Design"},
        {'name': "Digital Marketing"},
        {'name': "Web App Development"},
        {'name': "Branding"},
        {'name': "Motion Graphics"},
        {'name': "Video Production"},
        {'name': "Animation"},
        {'name': "Photography"},
    ]
</script>

<!-- grid layout for 3services where each service hasan image on one side and the content (title and description) on the other side,  -->
<!-- the image and content should be in the same row -->
<section class="content-grid bg-black py-24">
    <header class="pb-16">
        <h2 class="title-1">What we <br>Do for You?</h2>
    </header>
    <div class="services breakout grid gap-y-12">
        {#each services as service, index}
        <article>
            <header class="text-4xl border-b border-lead/20 p-4">
                <h3>
                    <span class="text-red">{index + 1}.</span>
                    {service.title}
                </h3>
            </header>
            <div class="flex">
                <div class="text-4xl pl-4">
                    <span class="text-red opacity-0">{index + 1}.</span>
                </div>
                <div class="flex-1">
                    <p class="text-lg p-4 text-lead">{service.description}</p>
                </div>
            </div>
        </article>
        {/each}
    </div>
    <div class="tags py-20 flex flex-wrap gap-2 justify-center">
        {#each tags as tag}
            <div class="rounded-lg bg-dark/45 py-1.5 px-3 outline-2 outline-dark flex gap-x-2 items-center text-sm">
                <Star class="fill-red stroke-red h-4"/>
                <span>{tag.name}</span>
            </div>
        {/each}
    </div>
</section>

<style>
	
</style>

    <!-- <div class="rounded-xl overflow-hidden min-h-96 h-full bg-cover relative group col-span-2 row-span-2 lg:row-start-1 xl:col-span-3" style="background-image: url('{service.image_url}');">
        <div class="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0)] z-[1] transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
        <div class="absolute top-0 left-0 bottom-0 right-0 h-full w-full content p-4 z-[2] grid content-end">
            <h3 class="font-semibold text-white text-2xl transition-all duration-500 translate-y-10 group-hover:translate-y-0">{service.title}</h3>
            <p class="text-gray-200 mt-4 transition-all duration-500 delay-75 translate-y-10 group-hover:translate-y-0">{service.description}</p>
            <footer class="relative opacity-0 transition-all duration-500 delay-150 mt-4 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100">
                <a href="/services/#fish-farming" class="next-button w-fit">
                    <span class="hover-underline-animation text-white"> Read more </span>
                    <svg id="arrow-horizontal" width="30" height="10" viewBox="0 0 46 16" class="fill-white">
                        <path d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
                    </svg>
                </a>
            </footer>
        </div>
    </div> -->