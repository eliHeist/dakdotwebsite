<script lang="ts">
	import { Plus } from "lucide-svelte";
	import PulsingCircles from "../pulsingCircles.svelte";

    let wrapper:HTMLElement

    $effect(() => {
        wrapper.querySelectorAll('article').forEach((card, i) => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded')
                wrapper.querySelectorAll('article').forEach((card, j) => {
                    if (i !== j) {
                        card.classList.remove('expanded')
                    }
                })
            })
        })
    })
</script>

<section class="py-32">
    <h2 class="title-2">Our values</h2>
    <div class="content-grid @container">
        <div class="grid @min-md:grid-cols-12 gap-6" bind:this={wrapper}>
            <article class="card group slide-in-up outline-2 outline-white @min-md:col-span-10 @min-lg:col-span-8 @min-xl:col-span-6 @min-2xl:col-span-5 @min-5xl:col-span-4">
                <div class="icon">
                    <svg width="113" height="132" viewBox="0 0 113 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6667 64.6667H2" stroke="#274595" stroke-width="3" stroke-linecap="round"/>
                        <path d="M27.3333 26.6666L20 19.3333" stroke="#FDFEFD" stroke-width="3" stroke-linecap="round"/>
                        <path d="M56.667 14.6667V2" stroke="#EE2531" stroke-width="3" stroke-linecap="round"/>
                        <path d="M90 26.6666L97.3333 19.3333" stroke="#FDFEFD" stroke-width="3" stroke-linecap="round"/>
                        <path d="M98 64.6667H111.333" stroke="#274595" stroke-width="3" stroke-linecap="round"/>
                        <path d="M38 117.333H76" stroke="#EFD212" stroke-width="3" stroke-linecap="round"/>
                        <path d="M38 130H76" stroke="#EFD212" stroke-width="3" stroke-linecap="round"/>
                        <path d="M52.0003 102C53.3337 94.4444 53.3337 78.1333 42.667 73.3333" stroke="#FDFEFD" stroke-width="3" stroke-linecap="round"/>
                        <path d="M61.2721 102C59.9388 94.4444 59.9388 78.1333 70.6055 73.3333" stroke="#FDFEFD" stroke-width="3" stroke-linecap="round"/>
                        <path d="M83.167 67.3334C83.167 77.7298 80.1133 87.0806 75.2511 93.7951C70.3875 100.511 63.798 104.5 56.667 104.5C49.536 104.5 42.9465 100.511 38.0829 93.7951C33.2207 87.0806 30.167 77.7298 30.167 67.3334C30.167 56.9371 33.2207 47.5863 38.0829 40.8717C42.9465 34.1554 49.536 30.1667 56.667 30.1667C63.798 30.1667 70.3875 34.1554 75.2511 40.8717C80.1133 47.5863 83.167 56.9371 83.167 67.3334Z" stroke="#EE2531" stroke-width="3"/>
                        </svg>
                        
                </div>
                <div class="body">We believe in thinking outside the box, pushing boundaries, and bringing unique solutions to every project.​​</div>
                <header>
                    <h3 class="title">Creativity</h3>
                    <div class="plus-btn group-hover:bg-white group-hover:text-black">
                        <Plus />
                    </div>
                </header>
            </article>
            <article class="card group slide-in-up outline-2 outline-white @min-md:col-span-10 @min-lg:col-span-8 @min-xl:col-span-6 @min-2xl:col-span-7 @min-5xl:col-span-4">
                <div class="icon">
                    <img src="/svgs/collaboration.svg" alt="">
                </div>
                <div class="body">We work with our clients closely to truly understand their vision and needs, ensuring tailored solutions.​​​</div>
                <header>
                    <h3 class="title">Collaboration</h3>
                    <div class="plus-btn group-hover:bg-white group-hover:text-black">
                        <Plus />
                    </div>
                </header>
            </article>
            <article class="card group slide-in-up outline-2 outline-white @min-md:col-span-10 @min-lg:col-span-8 @min-xl:col-span-6 @min-2xl:col-span-6 @min-5xl:col-span-4">
                <div class="icon">
                    <svg width="132" height="131" viewBox="0 0 132 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M65.8246 105.102C87.5165 105.102 105.101 87.5167 105.101 65.8248C105.101 44.1329 87.5165 26.5481 65.8246 26.5481C44.1326 26.5481 26.5479 44.1329 26.5479 65.8248C26.5479 76.8149 31.0617 86.7508 38.3366 93.8796" stroke="#EE2531" stroke-width="3" stroke-linecap="round"/>
                        <rect x="48.3877" y="86.9631" width="34.874" height="41.8877" rx="9.5" stroke="#FDFEFD" stroke-width="3"/>
                        <path d="M2 65.8245H14.9753" stroke="#274595" stroke-width="3" stroke-linecap="round"/>
                        <path d="M16.7285 16.7288L24.7943 24.4438" stroke="#FDFEFD" stroke-width="3" stroke-linecap="round"/>
                        <path d="M66.1748 2V13.2219" stroke="#EFD212" stroke-width="3" stroke-linecap="round"/>
                        <path d="M115.272 16.7288L107.206 24.4438" stroke="#FDFEFD" stroke-width="3" stroke-linecap="round"/>
                        <path d="M129.999 65.8245H118.427" stroke="#274595" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                        
                </div>
                <div class="body">We’re committed to integrating the latest technologies and design trends, keeping our clients ahead of the curve.​​</div>
                <header>
                    <h3 class="title">Innovation</h3>
                    <div class="plus-btn group-hover:bg-white group-hover:text-black">
                        <Plus />
                    </div>
                </header>
            </article>
            <article class="card group slide-in-up outline-2 outline-white @min-md:col-span-10 @min-lg:col-span-8 @min-xl:col-span-6 @min-2xl:col-span-6 @min-5xl:col-span-6">
                <div class="icon">
                    <svg width="131" height="132" viewBox="0 0 131 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M128.999 59.4546C128.996 52.0767 126.86 44.8577 122.85 38.6709C118.839 32.4841 113.126 27.5946 106.401 24.594C104.02 19.249 100.444 14.525 95.9496 10.7875C91.455 7.05009 86.1625 4.3996 80.4818 3.04126C74.8011 1.68291 68.8848 1.65317 63.1908 2.95433C57.4968 4.25549 52.178 6.85264 47.6462 10.5447H46.6637C41.3416 10.5497 36.0796 11.6726 31.2171 13.8409C26.3545 16.0091 21.9993 19.1747 18.4322 23.1334C14.8651 27.0921 12.1653 31.7562 10.5069 36.8248C8.84853 41.8934 8.26834 47.2541 8.80375 52.5613C5.59816 57.1826 3.45365 62.4582 2.52431 68.009C1.59497 73.5598 1.90386 79.248 3.4288 84.6649C4.95374 90.0819 7.65686 95.093 11.3439 99.3383C15.031 103.584 19.6105 106.958 24.7534 109.218C27.2925 114.21 30.8994 118.578 35.3167 122.012C39.734 125.445 44.8529 127.859 50.3082 129.082C55.7636 130.305 61.4209 130.306 66.8767 129.085C72.3325 127.864 77.4522 125.452 81.8708 122.02C82.8206 122.02 83.7376 122.02 84.6874 122.02C94.7779 122.037 104.463 118.041 111.617 110.908C118.77 103.775 122.807 94.0888 122.842 83.9752C122.842 82.8263 122.842 81.7103 122.646 80.6927C126.835 74.4095 129.048 67.0115 128.999 59.4546Z" stroke="#FDFEFD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                </div>
                <div class="body">We make sure that our solutions are easy to use, affordable, and effective for businesses of all sizes.​​</div>
                <header>
                    <h3 class="title">Simplicity</h3>
                    <div class="plus-btn group-hover:bg-white group-hover:text-black">
                        <Plus />
                    </div>
                </header>
            </article>
            <article class="card group slide-in-up outline-2 outline-white @min-md:col-span-10 @min-lg:col-span-8 @min-xl:col-span-6 @min-2xl:col-span-8 @min-5xl:col-span-6">
                <div class="icon">
                    <svg width="132" height="132" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="66.0003" cy="66.0001" r="10.1966" fill="#EE2531" stroke="#EE2531" stroke-width="3"/>
                        <circle cx="42.5697" cy="79.8848" r="10.1966" stroke="#EE2531" stroke-width="3"/>
                        <circle cx="42.5697" cy="54.7186" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="89.431" cy="54.7186" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="89.431" cy="79.8848" r="10.1966" stroke="#EE2531" stroke-width="3"/>
                        <circle cx="66.0003" cy="92.9017" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="66.0003" cy="39.0982" r="10.1966" stroke="#EE2531" stroke-width="3"/>
                        <circle cx="12.1966" cy="66.0001" r="10.1966" stroke="#274595" stroke-width="3"/>
                        <circle cx="119.803" cy="66.0001" r="10.1966" stroke="#EFD212" stroke-width="3"/>
                        <circle cx="115.031" cy="38.2305" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="115.031" cy="93.7696" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="17.4036" cy="38.2305" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="17.4036" cy="93.7696" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="94.637" cy="17.8372" r="10.1966" stroke="#274595" stroke-width="3"/>
                        <circle cx="94.637" cy="114.163" r="10.1966" stroke="#274595" stroke-width="3"/>
                        <circle cx="38.6644" cy="17.8372" r="10.1966" stroke="#EFD212" stroke-width="3"/>
                        <circle cx="38.6644" cy="114.163" r="10.1966" stroke="#EFD212" stroke-width="3"/>
                        <circle cx="66.0003" cy="119.803" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        <circle cx="66.0003" cy="12.1966" r="10.1966" stroke="#FDFEFD" stroke-width="3"/>
                        </svg>
                        
                </div>
                <div class="body">We aim to create work that not only looks great but performs brilliantly, leading to measurable results and client success.​</div>
                <header>
                    <h3 class="title">Impact</h3>
                    <div class="plus-btn group-hover:bg-white group-hover:text-black">
                        <Plus />
                    </div>
                </header>
            </article>
        </div>
    </div>
</section>

<div class="hidden">
    <div class="card expanded">
        <div class="icon"></div>
        <header><div class="plus-btn"></div></header>
    </div>
</div>


<style>
    @reference "tailwindcss/theme";

    .card {
        padding: 1.5rem;
        border-radius: 1.5rem;
        display: grid;
        grid-template-rows: 1fr 0 auto;
        cursor: pointer;
        transition: grid-template-rows .3s linear;
        height: 25rem;
        
        & .icon {
            display: grid;
            place-content: center;
            overflow: hidden;
            /* aspect-ratio: 1/1; */
        }

        & .body {
            @apply text-lg;
            overflow: hidden;
        }

        & header{
            display: flex;
            justify-content: space-between;
            column-gap: .75rem;
            
            & .title{
                font-size: 1.5rem;
                margin: auto 0;
            }
            
            & .plus-btn{
                @apply h-10 w-10 mt-auto;
                font-size: 1rem;
                aspect-ratio: 1/1;
                outline: 2px solid;
                display: grid;
                place-content: center;
                border-radius: 50%;
                rotate: 0;
                transition: all .375s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        }

        &.expanded {
            grid-template-rows: 0 1fr auto;

            & .icon {
                padding: 0;
            }

            & header .plus-btn {
                rotate: 45deg;
            }
        }
    }
</style>
