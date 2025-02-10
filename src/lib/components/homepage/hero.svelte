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
	let follower1: SVGElement;
	let follower2: SVGElement;

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
		animation.to(heroSVGBackDrop, {
			opacity: 1,
			duration: 2
		});
		animation.to(follower1, {
			scale: 1,
			y: 0,
			duration: 3
		}, '<');
		animation.to(follower2, {
			scale: 1,
			y: 0,
			duration: 1
		}, '-=1');

		document.addEventListener('mousemove', (e) => {
			const { clientX: x, clientY: y } = e;
			let winWidth = window.innerWidth;
			let winHeight = window.innerHeight;

			// Move smoothly towards cursor
			changeTransform(follower1, winWidth, winHeight, x, y);
			changeTransform(follower2, winWidth, winHeight, x, y);
		});

		function changeTransform(
			follower: SVGElement,
			win_width: number,
			win_height: number,
			clientX: number,
			clientY: number
		) {
			return;
			let follower_width = follower.clientWidth;
			let follower_height = follower.clientHeight;

			let x = win_width / 2;
			let y = win_height / 2;

			let x_percent = ((x - follower_width / 2) / win_width) * 100;
			let y_percent = ((y - follower_height / 2) / win_height) * 100;

			follower.style.transform = `translate3d(${x_percent}%, ${y_percent}%, 0)`;
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

<section class="grid items-end -z-10 h-[100svh] full-width relative overflow-hidden" bind:this={heroElement}>
	<svg
		class="absolute top-[10vh] sm:top-0 -left-[20vw] sm:left-0 z-[-1] w-[60vw] sm:w-[40vw] opacity-0 glowing"
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

	<svg
		class="absolute top-[15vh] sm:top-[20vh] -right-[15vw] sm:right-[5vw] z-[-1] w-[50vw] sm:w-[30vw] opacity-0 glowing"
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

	<div class="content-grid absolute top-0 left-0 right-0 hidden glowing"></div>
	<div class="grid content-grid">
		<div class="relative">
			<div class="absolute top-0 left-0 right-0 z-[-1]" bind:this={heroSVGSection}>
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

				<div class="bg-black h-[20vh] w-full -translate-y-10 opacity-0"></div>
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

			<div class="text-center w-full z-[3] px-10 mt-36 sm:mt-48 md:mt-56 lg:mt-68">
				<div
					class="grid text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-7xl text-white font-light [line-height:100%]"
				>
					<h2 class="font-bold hero-text-reveal">Brand Design</h2>
					<h3 class="hero-text-reveal">with excellence</h3>
				</div>
				<p class="mt-4 text-lg text-lead max-w-[35rem] mx-auto hero-text-reveal">
					Revolutionizing Digital Presence for firms and emerging businesses tired of the usual
					aesthetics. We deliver unique and impactful visual and digital solutions tailored to your
					brand's distinct identity. Get ready to stand out in the digital landscape.
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
		50% {
			opacity: 0.8;
		}
		100% {
			opacity: 0.5;
		}
	}
</style>
