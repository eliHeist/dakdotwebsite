<script lang="ts">
    import { getContext } from 'svelte';
	import Button from '../ui/button.svelte';
	import { gsap } from 'gsap';
    import { ChevronDown } from "lucide-svelte";

	let preloaderElement: HTMLElement;
	let heroElement: HTMLElement;
	let heroSVGSection: HTMLElement;
	let heroSVG: SVGElement;
	let heroSVGBackDrop: SVGElement;
	let heroSVGGlow: SVGElement;
	let heroText: HTMLElement;
	let follower1: SVGElement;
	let follower2: SVGElement;
    let spacer: HTMLElement;

	$effect(() => {
        let headerHeight = document.querySelector(".page-header")?.clientHeight || 0;
        heroElement.style.paddingTop = `${headerHeight}px`;
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
			y: '100%',
			duration: 1,
			ease: 'power1.inOut'
		}, '-=0.5');

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
			'-=1'
		);
		animation.to('.hero-text-reveal', {
			y: 0,
			duration: 1
		}, '');
		animation.to(
			'.hero-text-reveal',
			{
				clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
				stagger: 0.3,
				duration: 0.5
			},
			'<'
		);
        animation.from('.hero-next', {
            opacity: 0,
            y: 100,
            duration: 1,
            stagger: 0.5
        },);
		animation.to(heroSVGBackDrop, {
			opacity: 1,
			duration: 2
		});
		animation.to(follower1, {
			scale: 1.2,
			y: 0,
			duration: 3
		}, '<');
		animation.to(follower2, {
			scale: 1.2,
			y: 0,
			duration: 3
		}, '-=2.5');

		document.addEventListener('mousemove', (e) => {
			const { clientX: x, clientY: y } = e;
			let winWidth = window.innerWidth;
			let winHeight = window.innerHeight;

			// Move smoothly towards cursor
			changeTransform(follower1, winWidth, winHeight, x, y);
			changeTransform(follower2, winWidth, winHeight, x, y, true);
		});

		function changeTransform(
			follower: SVGElement,
			win_width: number,
			win_height: number,
			clientX: number,
			clientY: number,
            flip: boolean = false
		) {
			// get the value 20% of the follower's width and its height too
            let transform_x = follower.clientWidth * 0.2;
            let transform_y = follower.clientHeight * 0.2;

            // get the x and y percentage of the cursor position from the mid point of the window
            let mid_x = win_width / 2;
            let mid_y = win_height / 2;

            let x_percent = (mid_x - clientX) / mid_x;
            let y_percent = (mid_y - clientY) / mid_y;

            let x_transform = x_percent * transform_x;
            let y_transform = y_percent * transform_y;

            if (flip) {
                x_transform = -x_transform;
                y_transform = -y_transform;
            }
			follower.style.transform = `translate3d(${x_transform}px, ${y_transform}px, 0)`;
		}
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

<section class="grid items-end h-[100svh] full-width relative overflow-hidden" bind:this={heroElement}>
	<svg class="absolute top-[5svh] lg:top-[0vh] -left-[20vw] sm:left-0 z-[0] w-[60vw] sm:w-[40vw] opacity-0 glowing"
		fill="none"
		bind:this={follower1}
		viewBox="0 0 660 596"
	>
		<rect width="660" height="596" fill="url(#paint0_radial_548_181)" />
		<defs>
			<radialGradient
				id="paint0_radial_548_181"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(330 298) rotate(90) scale(298 330)"
			>
				<stop stop-color="#F3E5E6" stop-opacity="0.25" />
				<stop offset="1" stop-color="#FBF0F0" stop-opacity="0" />
			</radialGradient>
		</defs>
	</svg>

	<svg class="absolute top-[10svh] lg:top-[5vh] -right-[15vw] sm:right-[5vw] z-[0] w-[50vw] sm:w-[30vw] opacity-0 glowing"
		viewBox="0 0 568 497"
		fill="none"
		bind:this={follower2}
	>
		<rect y="-16" width="568" height="513" fill="url(#paint0_radial_545_179)" />
		<defs>
			<radialGradient
				id="paint0_radial_545_179"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(284 240.5) rotate(90) scale(256.5 284)"
			>
				<stop stop-color="#EE2531" stop-opacity="0.37" />
				<stop offset="1" stop-color="#FF0000" stop-opacity="0" />
			</radialGradient>
		</defs>
	</svg>

	<div class="content-grid absolute top-[20vh] left-0 right-0 hidden glowing"></div>
	<div class="grid content-grid h-[70vh] content-end sm:h-[60vh]">
        <div bind:this={spacer}></div>
		<div class="relative lg:max-w-[80vw] mx-auto xl:mb-20">
			<div class="absolute left-0 right-0 -top-24 sm:-top-40 olg:-top-64 translate-y-40" bind:this={heroSVGSection}>
				<svg class="w-full main-svg hero-svg-shadow" viewBox="0 0 905 470" fill="none">
					<g filter="url(#filter0_f_414_113)">
						<path
							bind:this={heroSVGBackDrop}
							d="M894 461C894 461 696.822 461 452.988 461C209.154 461 11 461 11 461C11 208.606 208.666 4 452.5 4C696.334 4 894 208.606 894 461Z"
							fill="#EE2531"
							fill-opacity="0.91"
						/>
					</g>
					<path
						d="M905 463.5C905 463.5 702.909 463.5 453 463.5C203.091 463.5 0 463.5 0 463.5C0 213.039 202.591 10 452.5 10C702.409 10 905 213.039 905 463.5Z"
						fill="#FDFEFD"
					/>
					<path
						d="M905 469.5C905 469.5 702.909 469.5 453 469.5C203.091 469.5 0 469.5 0 469.5C0 219.039 202.591 16 452.5 16C702.409 16 905 219.039 905 469.5Z"
						fill="#0C0C0C"
					/>
					<defs>
						<filter
							id="filter0_f_414_113"
							x="7"
							y="0"
							width="891"
							height="465"
							filterUnits="userSpaceOnUse"
							color-interpolation-filters="sRGB"
						>
							<feFlood flood-opacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_414_113" />
						</filter>
					</defs>
				</svg>
			</div>

			<div class="text-center w-full z-[2] mb-20">
				<div
					class="grid text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-7xl text-white font-light [line-height:100%]"
				>
					<h2 class="font-bold hero-text-reveal">Your Digital <br/>Growth Partner!</h2>
					<!-- <h2 class="font-bold hero-text-reveal">Brand Design</h2>
					<h3 class="hero-text-reveal">with excellence</h3> -->
				</div>
				<p class="mt-4 text-lg text-lead max-w-[90%] sm:max-w-[80%] mx-auto hero-next">
					We design, develop, and brand businesses for success. Whether you need a high-performing web app, a powerful brand identity, or expert digital marketing, we craft strategies that turn visitors into loyal customers.
				</p>
				<div class="mt-12">
					<a href="#clients">
                        <div class="grid gap-3 place-content-center justify-items-center text-center mx-auto hero-next">
                            <span class="w-max">Browse More</span>
                            <div class="rounded-full border-2 border-white/50 h-8 w-8 grid place-content-center animation-down">
                                <ChevronDown class="w-6 h-6" />
                            </div>
                        </div>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-text-reveal {
		clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
		transition: all 1.5s;
		transform: translateY(3rem);
	}

	.main-svg {
		position: relative;

		&::after {
			pointer-events: none;
			content: '';
			position: absolute;
			top: 100%;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: var(--color-red);
			filter: blur(2em);
			opacity: 1;
			transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
			transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}

	.glowing {
		/* create a glowing animation that is infinite and uses opacity from 0.5 to 1 */
		animation: glowing 5s infinite;
        scale: 0;
        /* transform: translateY(50%); */
	}

	@keyframes glowing {
		0% {
			opacity: 0.5;
			/* tra */
		}
		/* 50% {
			opacity: 0.8;
		} */
        60% {
            opacity: 0.9;
        }
		100% {
			opacity: 0.5;
		}
	}

    .animation-down {
        animation: down 4s infinite;
    }

    @keyframes down {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(2rem);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
