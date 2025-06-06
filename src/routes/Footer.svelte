<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	let spacer: HTMLElement;
	let footer: HTMLElement;
	let textSVG: SVGElement;

	const runAnimation = () => {
		// Kill only footer-related GSAP animations
		gsap.killTweensOf([
			spacer,
			textSVG,
			'footer .lower-deck',
			'footer .heading',
			'footer .reveal-in',
			'footer .slide-in-left'
		]);

		// Kill only ScrollTriggers related to the footer
		ScrollTrigger.getAll().forEach((trigger) => {
			if (trigger.trigger && footer.contains(trigger.trigger)) {
				trigger.kill();
			}
		});

		gsap.set(textSVG, { stroke: 'black', translateX: '70%' });

		let timeline1 = gsap.timeline({
			scrollTrigger: {
				trigger: spacer,
				start: 'top 100%',
				end: 'top top',
				scrub: 2
			}
		});
		timeline1.to(textSVG, {
			stroke: '#0C0C0C',
			fill: '#0C0C0C',
			translateX: '0%'
		});

		gsap.set('#svgcliprect', { width: '0%' });

		let timeline2 = gsap.timeline({
			scrollTrigger: {
				trigger: spacer,
				start: 'top 50%',
				end: 'top 10%',
				toggleActions: 'play play reverse reverse',
				scrub: 1
			}
		});

		gsap.set('footer .lower-deck', { opacity: 0.3, translateY: 100 });

		timeline2.to('footer .lower-deck', { 
            opacity: 1, 
            translateY: 0, 
            translateX: 0, 
            duration: 1
        });

		timeline2.to(
			'footer .heading',
			{
				clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
				translateX: '0%',
				duration: 1
			},
			'-=0.75'
		);

		timeline2.to(
			'footer .reveal-in',
			{
				clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
				translateX: '0%',
				duration: 1,
				stagger: 0.2
			},
			'-=0.5'
		);

		gsap.set('footer .slide-in-left', { translateX: 50, opacity: 0 });

		timeline2.to(
			'footer .slide-in-left',
			{
				translateX: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.4
			},
			'-=1'
		);

		timeline2.to('#svgcliprect', { width: '100%', duration: 5 }, '-=3');

		ScrollTrigger.refresh(); // Refresh only footer-related ScrollTriggers
	};

	// Run on first load
	$effect(() => {
		runAnimation();
	});
</script>

<!-- clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); -->
<!-- clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); -->

<footer bind:this={footer}
	class="bg-white text-dark pt-24 pb-4 content-grid h-screen fixed inset-0 z-[5]"
>
	<div class="breakout grid h-full">
		<div class="grid lg:flex lg:flex-row-reverse lg:justify-between">
			<div class="">
				<h3 class="text-2xl lg:text-4xl font-medium heading">Contact Us</h3>
				<div class="grid gap-y-3 text-lg mt-4 sm:mt-10">
					<!-- <p class="text-lg">123 Main St, New York, NY 10001</p> -->
					<p class="text-lg reveal-in">
						<a href="tel:+256769345389" class="">+256 769 345 389</a>
					</p>
					<p class="text-lg reveal-in">
						<a href="mailto:connect@dakdot.com" class=""> connect@dakdot.com </a>
					</p>
					<div class="flex gap-x-4">
						<a target="_blank" href="https://x.com/dakdotcreations" class="slide-in-left">
							<svg class="h-6 hover:fill-red" role="img" viewBox="0 0 24 24"
								><title>X</title><path
									d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
								/></svg
							>
						</a>
						<a target="_blank" href="https://www.instagram.com/dakdotcreations/" class="slide-in-left">
							<svg class="h-6 hover:fill-red" viewBox="0 0 448 512"
								><path
									d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
								/></svg
							>
						</a>
						<a target="_blank"
							href="https://www.linkedin.com/company/dakdotcreations/"
							class="slide-in-left"
						>
							<svg class="h-6 hover:fill-red" viewBox="0 0 448 512"
								><path
									d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
								/></svg
							>
						</a>
					</div>
				</div>
			</div>
			<div>
				<h3 class="text-2xl lg:text-4xl font-medium heading">Navigate</h3>
				<ul class="space-y-1.5 gap-x-12 grid grid-cols-2 mt-4 sm:mt-10 lg:text-lg">
					<a href="/services/web-development/" class="reveal-in">Websites</a>
					<a href="/services/web-development/" class="reveal-in">Web Development</a>
					<a href="/services/brand-design/" class="reveal-in">Branding</a>
					<a href="/services/brand-design/" class="reveal-in">Digital Marketing</a>
					<a href="/services/motion/" class="reveal-in">Product Visualization</a>
					<a href="/services/motion/" class="reveal-in">Animation</a>
				</ul>
			</div>
		</div>
		<div class="svgWrapper mt-auto">
			<svg bind:this={textSVG} class="w-full mt-auto dakSVG" viewBox="0 0 1357 236" fill="none">
				<defs>
					<clipPath id="darkSVG">
						<rect id="svgcliprect" width="0%" height="100%" />
					</clipPath>
				</defs>
				<g clip-path="url(#darkSVG)">
					<path
						d="M188.23 56.3301C178.89 39.2001 165.65 26.0401 148.52 16.8601C131.38 7.67008 111.02 3.08008 87.42 3.08008H0V232.4H88.34C111.63 232.4 131.79 227.84 148.83 218.7C165.86 209.57 179.02 196.44 188.3 179.3C197.59 162.17 202.23 141.7 202.23 117.89C202.23 94.0801 197.56 73.4701 188.23 56.3301ZM133.44 155.22C129.23 164.2 123.1 170.48 115.04 174.07C106.99 177.66 97.27 179.46 85.88 179.46H62.18V56.0201H84.03C96.04 56.0201 106.17 57.8501 114.43 61.4901C122.69 65.1301 128.97 71.4401 133.28 80.4201C137.59 89.4001 139.75 101.89 139.75 117.89C139.75 133.89 137.64 146.24 133.44 155.22Z"
					/>
					<path
						d="M363.99 3.08008H279.03L204.69 232.4H274.26L286.82 188.38H357.43L370.6 232.4H441.09L363.99 3.08008ZM300.08 141.9C305.45 123.08 310.29 103.57 314.58 83.3401C316.67 73.4801 318.76 63.6401 320.83 53.8301C323.1 63.6401 325.43 73.4701 327.82 83.3401C332.71 103.57 337.94 123.08 343.53 141.9H300.08Z"
					/>
					<path
						d="M680.41 232.4H607.16L553.4 142.71L525.12 175.12V232.4H462.95V3.08008H525.12V52.3301L524.03 110.61C527.69 103.8 531.87 96.8901 536.59 89.8801C541.98 81.8801 548.72 72.6001 556.83 62.0301L602.39 3.08008H676.11L595.92 101.8L680.41 232.4Z"
					/>
					<path
						d="M890.49 56.3301C881.16 39.2001 867.92 26.0401 850.79 16.8601C833.65 7.67008 813.29 3.08008 789.69 3.08008H702.27V232.4H790.61C813.9 232.4 834.06 227.84 851.1 218.7C868.13 209.57 881.29 196.44 890.57 179.3C899.86 162.17 904.5 141.7 904.5 117.89C904.5 94.0801 899.83 73.4701 890.49 56.3301ZM835.71 155.22C831.5 164.2 825.37 170.48 817.31 174.07C809.26 177.66 799.54 179.46 788.15 179.46H764.45V56.0201H786.3C798.31 56.0201 808.44 57.8501 816.7 61.4901C824.96 65.1301 831.24 71.4401 835.55 80.4201C839.86 89.4001 842.01 101.89 842.01 117.89C842.01 133.89 839.91 146.24 835.71 155.22Z"
					/>
					<path
						d="M1037.48 235.48C1016.65 235.48 997.8 230.97 980.92 221.94C964.04 212.91 950.68 199.65 940.83 182.16C930.98 164.67 926.05 143.25 926.05 117.9C926.05 92.5498 930.98 70.8098 940.83 53.2598C950.68 35.7198 964.04 22.4598 980.92 13.4798C997.8 4.49977 1016.65 0.00976562 1037.48 0.00976562C1058.31 0.00976562 1077.13 4.49977 1093.96 13.4798C1110.79 22.4598 1124.15 35.7198 1134.05 53.2598C1143.95 70.8098 1148.9 92.3498 1148.9 117.9C1148.9 143.45 1143.95 164.82 1134.05 182.31C1124.15 199.8 1110.78 213.04 1093.96 222.02C1077.13 231 1058.31 235.49 1037.48 235.49V235.48ZM1037.48 181.3C1047.84 181.3 1056.54 178.86 1063.57 173.99C1070.6 169.12 1075.91 161.96 1079.5 152.52C1083.09 143.08 1084.89 131.54 1084.89 117.89C1084.89 104.24 1083.1 92.5198 1079.5 83.0298C1075.91 73.5398 1070.6 66.3598 1063.57 61.4798C1056.54 56.6098 1047.84 54.1698 1037.48 54.1698C1027.12 54.1698 1018.57 56.6098 1011.55 61.4798C1004.52 66.3498 999.18 73.5398 995.54 83.0298C991.9 92.5198 990.08 104.14 990.08 117.89C990.08 131.64 991.9 143.08 995.54 152.52C999.18 161.96 1004.52 169.12 1011.55 173.99C1018.58 178.87 1027.22 181.3 1037.48 181.3Z"
					/>
					<path
						d="M1157.68 53.2501V3.08008H1356.83V53.2501H1288.34V232.4H1226.16V53.2501H1157.67H1157.68Z"
					/>
				</g>
				<g fill="none">
					<path
						d="M188.23 56.3301C178.89 39.2001 165.65 26.0401 148.52 16.8601C131.38 7.67008 111.02 3.08008 87.42 3.08008H0V232.4H88.34C111.63 232.4 131.79 227.84 148.83 218.7C165.86 209.57 179.02 196.44 188.3 179.3C197.59 162.17 202.23 141.7 202.23 117.89C202.23 94.0801 197.56 73.4701 188.23 56.3301ZM133.44 155.22C129.23 164.2 123.1 170.48 115.04 174.07C106.99 177.66 97.27 179.46 85.88 179.46H62.18V56.0201H84.03C96.04 56.0201 106.17 57.8501 114.43 61.4901C122.69 65.1301 128.97 71.4401 133.28 80.4201C137.59 89.4001 139.75 101.89 139.75 117.89C139.75 133.89 137.64 146.24 133.44 155.22Z"
					/>
					<path
						d="M363.99 3.08008H279.03L204.69 232.4H274.26L286.82 188.38H357.43L370.6 232.4H441.09L363.99 3.08008ZM300.08 141.9C305.45 123.08 310.29 103.57 314.58 83.3401C316.67 73.4801 318.76 63.6401 320.83 53.8301C323.1 63.6401 325.43 73.4701 327.82 83.3401C332.71 103.57 337.94 123.08 343.53 141.9H300.08Z"
					/>
					<path
						d="M680.41 232.4H607.16L553.4 142.71L525.12 175.12V232.4H462.95V3.08008H525.12V52.3301L524.03 110.61C527.69 103.8 531.87 96.8901 536.59 89.8801C541.98 81.8801 548.72 72.6001 556.83 62.0301L602.39 3.08008H676.11L595.92 101.8L680.41 232.4Z"
					/>
					<path
						d="M890.49 56.3301C881.16 39.2001 867.92 26.0401 850.79 16.8601C833.65 7.67008 813.29 3.08008 789.69 3.08008H702.27V232.4H790.61C813.9 232.4 834.06 227.84 851.1 218.7C868.13 209.57 881.29 196.44 890.57 179.3C899.86 162.17 904.5 141.7 904.5 117.89C904.5 94.0801 899.83 73.4701 890.49 56.3301ZM835.71 155.22C831.5 164.2 825.37 170.48 817.31 174.07C809.26 177.66 799.54 179.46 788.15 179.46H764.45V56.0201H786.3C798.31 56.0201 808.44 57.8501 816.7 61.4901C824.96 65.1301 831.24 71.4401 835.55 80.4201C839.86 89.4001 842.01 101.89 842.01 117.89C842.01 133.89 839.91 146.24 835.71 155.22Z"
					/>
					<path
						d="M1037.48 235.48C1016.65 235.48 997.8 230.97 980.92 221.94C964.04 212.91 950.68 199.65 940.83 182.16C930.98 164.67 926.05 143.25 926.05 117.9C926.05 92.5498 930.98 70.8098 940.83 53.2598C950.68 35.7198 964.04 22.4598 980.92 13.4798C997.8 4.49977 1016.65 0.00976562 1037.48 0.00976562C1058.31 0.00976562 1077.13 4.49977 1093.96 13.4798C1110.79 22.4598 1124.15 35.7198 1134.05 53.2598C1143.95 70.8098 1148.9 92.3498 1148.9 117.9C1148.9 143.45 1143.95 164.82 1134.05 182.31C1124.15 199.8 1110.78 213.04 1093.96 222.02C1077.13 231 1058.31 235.49 1037.48 235.49V235.48ZM1037.48 181.3C1047.84 181.3 1056.54 178.86 1063.57 173.99C1070.6 169.12 1075.91 161.96 1079.5 152.52C1083.09 143.08 1084.89 131.54 1084.89 117.89C1084.89 104.24 1083.1 92.5198 1079.5 83.0298C1075.91 73.5398 1070.6 66.3598 1063.57 61.4798C1056.54 56.6098 1047.84 54.1698 1037.48 54.1698C1027.12 54.1698 1018.57 56.6098 1011.55 61.4798C1004.52 66.3498 999.18 73.5398 995.54 83.0298C991.9 92.5198 990.08 104.14 990.08 117.89C990.08 131.64 991.9 143.08 995.54 152.52C999.18 161.96 1004.52 169.12 1011.55 173.99C1018.58 178.87 1027.22 181.3 1037.48 181.3Z"
					/>
					<path
						d="M1157.68 53.2501V3.08008H1356.83V53.2501H1288.34V232.4H1226.16V53.2501H1157.67H1157.68Z"
					/>
				</g>
			</svg>
		</div>
		<div class="flex justify-between items-center mt-auto">
			<svg
				class="h-8 lower-deck translate-x-[-100%]"
				viewBox="0 0 58 71"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_457_491)">
					<path
						d="M28 71C43.464 71 56 58.464 56 43C56 27.536 43.464 15 28 15C12.536 15 0 27.536 0 43C0 58.464 12.536 71 28 71Z"
						fill="#0C0C0C"
					/>
					<path
						d="M54 8C56.2091 8 58 6.20914 58 4C58 1.79086 56.2091 0 54 0C51.7909 0 50 1.79086 50 4C50 6.20914 51.7909 8 54 8Z"
						fill="#0C0C0C"
					/>
				</g>
				<defs>
					<clipPath id="clip0_457_491">
						<rect width="58" height="71" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<p class="lower-deck translate-x-[100%]">© Copyright 2025</p>
		</div>
	</div>
</footer>
<div class="h-screen pointer-events-none" bind:this={spacer}></div>

<style>
	.heading {
		width: fit-content;
		clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
		transform: translateX(200px);
		transition: all 1s ease-in-out;
	}

	.reveal-in {
		width: fit-content;
		transform: translateX(50px);
		clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
		transition: all 0.5s ease-in-out;
	}
</style>
