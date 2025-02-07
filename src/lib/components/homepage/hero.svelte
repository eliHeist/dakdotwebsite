<script lang="ts">
	import Button from '../ui/button.svelte';
	import { gsap } from 'gsap';

	let preloaderElement: HTMLElement;
	let heroElement: HTMLElement;
	let heroSVGSection: HTMLElement;
	let heroSVG: SVGElement;
	let heroSVGBackDrop: SVGElement;
	let heroSVGGlow: SVGElement;
	let heroText: HTMLElement;

	$effect(() => {
		let svg = preloaderElement.querySelector('svg');
		svg?.classList.remove('animate-spin');

		let animation = gsap.timeline();

		animation.to(preloaderElement, {
			clipPath: 'circle(5%)',
			duration: 1,
			ease: 'power1.inOut'
		});
		animation.to(
			svg,
			{
				opacity: 0,
				duration: 1,
				ease: 'power1.inOut'
			},
			'<'
		);
		animation.to(preloaderElement, {
			opacity: 0,
			clipPath: 'circle(35%)',
			y: '100%',
			duration: 1,
			ease: 'power1.inOut'
		});

		gsap.set(heroSVGSection, { opacity: 0, y: '50%' });
		gsap.set(heroSVGBackDrop, { opacity: 0 });

		animation.to(
			heroSVGSection,
			{
				opacity: 1,
				y: 0,
				duration: 0.75,
				ease: 'power1.inOut'
			},
			'-=0.2'
		);
		animation.to('.hero-text-reveal', {
			y: 0,
			duration: 1
		});
		animation.to(
			'.hero-text-reveal',
			{
				clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
				stagger: 0.3,
				duration: 0.75
			},
			'<'
		);
        animation.to(
            heroSVGBackDrop,
            {
                opacity: 1,
                duration: 2
            }
        )
        animation.to(
            heroSVGGlow,
            {
                opacity: .3,
                duration: 2
            }
        )
	});
</script>

<section
	class="loader fixed z-50 inset-0 bg-white grid place-content-center [clip-path:circle(75%)]"
	bind:this={preloaderElement}
>
	<div class="w-40 h-40 animate-pulse">
		<svg
			class="w-full animate-spin"
			viewBox="0 0 96 96"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="96" height="96" fill="#D9D9D900" fill-opacity="0.49" />
			<g clip-path="url(#clip0_516_184)">
				<path
					d="M48 76C63.464 76 76 63.464 76 48C76 32.536 63.464 20 48 20C32.536 20 20 32.536 20 48C20 63.464 32.536 76 48 76Z"
					fill="#0C0C0C"
				/>
				<path
					d="M74 13C76.2091 13 78 11.2091 78 9C78 6.79086 76.2091 5 74 5C71.7909 5 70 6.79086 70 9C70 11.2091 71.7909 13 74 13Z"
					fill="#0C0C0C"
				/>
			</g>
			<defs>
				<clipPath id="clip0_516_184">
					<rect width="58" height="71" fill="white" transform="translate(20 5)" />
				</clipPath>
			</defs>
		</svg>
	</div>
</section>

<section class="grid items-end -z-10 h-[100svh] full-width relative" bind:this={heroElement}>
    <div class="content-grid absolute top-0 left-0 right-0 hidden">
        <svg
            bind:this={heroSVGGlow}
            class="w-full -z-[1] opacity-0"
            viewBox="0 0 968 474"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0.5 0H968V474H0.5V0Z" fill="url(#paint0_linear_526_197)" />
            <defs>
                <linearGradient
                    id="paint0_linear_526_197"
                    x1="36.5353"
                    y1="235.752"
                    x2="937"
                    y2="233"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#EE2531" stop-opacity="0" />
                    <stop offset="0.505" stop-color="#EE2531" />
                    <stop offset="1" stop-color="#EE2531" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>
    </div>
	<div class="grid content-grid">
		<div class="relative">
			<div class="absolute top-0 left-0 right-0 z-[-1]" bind:this={heroSVGSection}>
				<svg class="w-full" viewBox="0 0 969 585" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#filter0_df_414_113)">
						<path
                        bind:this={heroSVGBackDrop}
							d="M905 545C905 545 717.2 545 484.965 545C252.729 545 64 545 64 545C64 292.606 252.264 88 484.5 88C716.736 88 905 292.606 905 545Z"
							fill="#EE2531"
							fill-opacity="0.91"
							shape-rendering="crispEdges"
						/>
					</g>
					<path
						d="M937 547.5C937 547.5 734.909 547.5 485 547.5C235.091 547.5 32 547.5 32 547.5C32 297.039 234.591 94 484.5 94C734.409 94 937 297.039 937 547.5Z"
						fill="#FDFEFD"
					/>
					<path
						d="M937 553.5C937 553.5 734.909 553.5 485 553.5C235.091 553.5 32 553.5 32 553.5C32 303.039 234.591 100 484.5 100C734.409 100 937 303.039 937 553.5Z"
						fill="#0C0C0C"
					/>
					<defs>
						<filter
							id="filter0_df_414_113"
							x="0"
							y="0"
							width="969"
							height="585"
							filterUnits="userSpaceOnUse"
							color-interpolation-filters="sRGB"
						>
							<feFlood flood-opacity="0" result="BackgroundImageFix" />
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feMorphology
								radius="16"
								operator="dilate"
								in="SourceAlpha"
								result="effect1_dropShadow_414_113"
							/>
							<feOffset dy="-24" />
							<feGaussianBlur stdDeviation="24" />
							<feComposite in2="hardAlpha" operator="out" />
							<feColorMatrix
								type="matrix"
								values="0 0 0 0 0.933333 0 0 0 0 0.145098 0 0 0 0 0.192157 0 0 0 0.93 0"
							/>
							<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_414_113" />
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="effect1_dropShadow_414_113"
								result="shape"
							/>
							<feGaussianBlur stdDeviation="2" result="effect2_foregroundBlur_414_113" />
						</filter>
					</defs>
				</svg>
				<div class="bg-black h-[20vh] w-full -translate-y-10"></div>
			</div>

			<!-- <svg
				
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
			</svg> -->

			<div class="text-center w-full z-[3] px-10 mt-32 sm:mt-48 md:mt-56 lg:mt-68">
				<div
					class="grid text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-7xl text-white font-light [line-height:100%]"
				>
					<h2 class="font-bold hero-text-reveal">Brand Design</h2>
					<h3 class="hero-text-reveal">with excellence</h3>
				</div>
				<p class="mt-4 text-lg text-lead max-w-[35rem] mx-auto hero-text-reveal">
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

<style>
	.hero-text-reveal {
		clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
		transition: all 1.5s;
		transform: translateY(3rem);
	}
</style>
