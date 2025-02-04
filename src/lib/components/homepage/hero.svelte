<script>
	import Button from '../ui/button.svelte';
</script>

<section class="grid items-end -z-10 h-[100svh] full-width">
	<div class="grid content-grid">
        <div class="relative breakout">
            <svg
                class="w-full absolute top-0 left-0 z-[-1]"
                viewBox="0 0 905 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M905 453.5C905 453.5 702.909 453.5 453 453.5C203.091 453.5 0 453.5 0 453.5C0 203.039 202.591 0 452.5 0C702.409 0 905 203.039 905 453.5Z"
                    fill="#FDFEFD"
                />
                <path
                    d="M905 459.5C905 459.5 702.909 459.5 453 459.5C203.091 459.5 0 459.5 0 459.5C0 209.039 202.591 6 452.5 6C702.409 6 905 209.039 905 459.5Z"
                    fill="#0C0C0C"
                />
            </svg>
    
            <div class="text-center w-full z-[3] mt-20 px-10">
                <div class="grid text-[2rem] sm:text-[2.5rem] text-white">
                    <h2 class="font-bold">Brand Design</h2>
                    <h3>with excellence</h3>
                </div>
                <p class="mt-4 text-lg text-lead max-w-md mx-auto">
                    Innovative design solutions for technology firms and emerging businesses weary of the
                    typical aesthetic methodology, Arriving shortly.
                </p>
                <div class="mt-12">
                    <a href="#">
                        <Button text="What do we do?" />
                    </a>
                </div>
            </div>
        </div>
	</div>
	<div class="bg-black h-[5vh] relative"></div>
</section>
