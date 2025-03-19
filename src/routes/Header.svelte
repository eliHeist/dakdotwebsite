<script lang="ts">
	import { page } from '$app/stores';
	import { setContext } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	import { Phone } from 'lucide-svelte';
	import { gsap } from 'gsap';

	import { service_links } from '$lib/data/links';

	let header: HTMLElement;
	let spacer: HTMLElement;
	let hamburgerButton: HTMLButtonElement;
	let smHeader: HTMLElement;
	let brand_logo: SVGElement;

	let navOpen = $state(false);

	let lastScrollY = $state(0);
	let isCollapsed = $state(false);

	function handleScroll() {
		const currentScrollY = window.scrollY;

		if (currentScrollY > lastScrollY) {
            // scrilling down, hide the header
			isCollapsed = true;
			const timelineIn = gsap.timeline({ease: 'power1.inOut'});
			timelineIn.to(
				brand_logo,
				{
					scale: 0.75,
                    x: '-2rem',
                    opacity: 0,
                    y: '4rem',
					duration: 0.3,
				},
				'<'
			);
			timelineIn.to(
				hamburgerButton,
				{
					scale: 0.75,
                    x: '2rem',
                    opacity: 0,
                    y: '4rem',
					duration: 0.3,
				},
				'<'
			);
            gsap.to(header, {
                top: '-4rem',
            })
		} else {
			// Scrolling up, show the header
			isCollapsed = false;
			const timelineOut = gsap.timeline({ease: 'power1.inOut'});
			timelineOut.to(
				brand_logo,
				{
					scale: 1,
                    x: '0rem',
                    opacity: 1,
                    y: '0rem',
					duration: 0.3,
				},
				'<'
			);
			timelineOut.to(
				hamburgerButton,
				{
					scale: 1,
                    x: '0rem',
                    opacity: 1,
                    y: '0rem',
					duration: 0.3,
				},
				'<'
			);
            gsap.to(header, {
                top: '.5rem',
            })
		}

		lastScrollY = currentScrollY;
	}

	afterNavigate(() => {
		navOpen = false;
	});

	$effect(() => {
		setContext('header_height', header.clientHeight);

		const dropdown = document.querySelector('.dropdown');
		const dropdownLinks = document.querySelectorAll('.dropdown-wrapper');

		dropdownLinks.forEach((link) => {
			const targetID = link.getAttribute('data-target') as string;

			if (!targetID) return;

			const targetDropdown = document.getElementById(targetID) as HTMLElement;

			link.addEventListener('mouseover', () => {
				if (targetDropdown.classList.contains('show')) return;
				targetDropdown.classList.add('show');
			});
			targetDropdown.addEventListener('mouseover', () => {
				if (targetDropdown.classList.contains('show')) return;
				targetDropdown.classList.add('show');
			});

			link.addEventListener('mouseleave', (event) => {
				targetDropdown.classList.remove('show');
			});
			targetDropdown.addEventListener('mouseleave', () => {
				targetDropdown.classList.remove('show');
			});
		});

		gsap.set(brand_logo, {
			scale: 0.75,
			x: '-2rem',
            opacity: 0,
            y: '4rem',
		});
		gsap.set(
			hamburgerButton,
			{
				scale: 0.75,
				x: '2rem',
                opacity: 0,
                y: '4rem',
			}
		);
        gsap.set(header, {
                top: '.5rem',
        })

		window.addEventListener('scroll', handleScroll);
	});
</script>

<div
	class="hidden sm:grid content-grid fixed top-2 left-0 right-0 page-header py-2 z-20"
	bind:this={header}
>
	<header class="breakout z-[2]">
		<div class="corner">
			<a href="/" aria-labelledby="dakdot">
				<svg
					class="brand_logo h-6 transition-all duration-500 ease-in-out"
					viewBox="0 0 163 36"
					fill="#fdfefd"
				>
					<path
						d="M86 36H77.6025L70.175 25.0017L68.137 27.3336V33.6765C68.137 34.9609 67.1098 36 65.8453 36H61V2.32768C61 1.0433 62.0272 0 63.2917 0H68.137V19.3779H68.5421L76.5631 9.80533C76.9969 9.28576 77.6353 8.98649 78.3064 8.98649H85.5007L75.5564 20.7205L86 36Z"
					/>
					<path
						d="M110.116 0C108.841 0 107.805 1.03982 107.805 2.31991V13.0039C107.562 12.8299 107.315 12.6642 107.059 12.5151C105.169 11.3717 102.958 10.7171 100.59 10.7171C95.9577 10.7171 91.9108 13.2276 89.7285 16.9685C88.627 18.841 88 21.0283 88 23.3565C88 27.1305 89.646 30.5192 92.2614 32.835C94.4808 34.8028 97.3933 36 100.59 36C101.613 36 102.608 35.8757 103.561 35.6479C105.157 35.2585 106.634 34.5625 107.929 33.6262V35.8799H112.694C113.969 35.8799 115 34.8442 115 33.5641V0H110.116ZM100.512 28.7296C97.5418 28.7296 95.1367 26.3144 95.1367 23.3358C95.1367 20.3572 97.5418 17.9379 100.512 17.9379C103.482 17.9379 105.883 20.353 105.883 23.3358C105.883 26.3185 103.478 28.7296 100.512 28.7296Z"
					/>
					<path
						d="M22.1157 0C20.8409 0 19.8055 1.03982 19.8055 2.31991V13.0039C19.5621 12.8299 19.3146 12.6642 19.0588 12.5151C17.1694 11.3717 14.9583 10.7171 12.5904 10.7171C7.95767 10.7171 3.91077 13.2276 1.72849 16.9685C0.627038 18.841 0 21.0283 0 23.3565C0 27.1305 1.64599 30.5192 4.26142 32.835C6.48083 34.8028 9.39327 36 12.5904 36C13.6134 36 14.6076 35.8757 15.5606 35.6479C17.1571 35.2585 18.6339 34.5625 19.9293 33.6262V35.8799H24.694C25.9687 35.8799 27 34.8442 27 33.5641V0H22.1157ZM12.512 28.7296C9.54179 28.7296 7.13674 26.3144 7.13674 23.3358C7.13674 20.3572 9.54179 17.9379 12.512 17.9379C15.4822 17.9379 17.8831 20.353 17.8831 23.3358C17.8831 26.3185 15.4781 28.7296 12.512 28.7296Z"
					/>
					<path
						d="M161.052 35.8496C161.052 35.8496 161.036 35.8538 161.028 35.8538C160.249 35.9499 159.506 36 158.8 36C156.157 36 154.136 35.3357 152.735 34.0071C151.335 32.6827 150.633 30.7776 150.633 28.3001V14.0241H147V8.45908H150.633V4.33964C150.633 3.04866 151.652 2 152.906 2H157.712V8.45908H162.644V14.0241H157.712V27.6692C157.712 28.5299 157.899 29.1649 158.268 29.5785C158.637 29.9879 159.254 30.1968 160.119 30.1968C160.387 30.1968 160.764 30.1592 161.251 30.0882C161.738 30.013 162.108 29.9462 162.359 29.8793L162.96 33.1005C163.2 34.4082 162.335 35.6866 161.052 35.8496Z"
					/>
					<path
						d="M130.5 36C137.404 36 143 30.4036 143 23.5C143 16.5964 137.404 11 130.5 11C123.596 11 118 16.5964 118 23.5C118 30.4036 123.596 36 130.5 36Z"
					/>
					<path
						d="M54.694 11.1188H49.9293V13.3476C48.6339 12.4217 47.1571 11.7334 45.5606 11.3482C44.6076 11.1229 43.6134 11 42.5904 11C39.3933 11 36.4808 12.184 34.2614 14.1301C31.646 16.4203 30 19.7676 30 23.5C30 27.2324 31.646 30.5797 34.2614 32.8699C36.4808 34.816 39.3933 36 42.5904 36C43.6134 36 44.6076 35.8771 45.5606 35.6518C47.1571 35.2666 48.6339 34.5783 49.9293 33.6524V35.8812H54.694C55.9687 35.8812 57 34.8569 57 33.591V13.409C57 12.1431 55.9687 11.1188 54.694 11.1188ZM42.5244 28.822C39.5542 28.822 37.1491 26.4294 37.1491 23.4836C37.1491 20.5379 39.5542 18.1452 42.5244 18.1452C45.4946 18.1452 47.8955 20.5338 47.8955 23.4836C47.8955 26.4335 45.4905 28.822 42.5244 28.822Z"
					/>
				</svg>
			</a>
		</div>

		<nav class="hidden sm:flex page-header-blur">
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">Home</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/about">About</a>
				</li>
                <li aria-current={$page.url.pathname.startsWith('/work') ? 'page' : undefined}>
                    <a href="/work">Our Work</a>
                </li>
				<li
					class="dropdown-wrapper"
					data-target="service_links"
					aria-current={$page.url.pathname.startsWith('/services') ? 'page' : undefined}
				>
					<a href="#">Services</a>
				</li>
			</ul>
		</nav>

		<div class="corner last">
			<div class="flex justify-end">
				<a href="/contact" class="cursor-pointer">
					<button
						class="contact-button {$page.url.pathname.startsWith(
							'/contact'
						)
							? 'active'
							: ''}"
					>
                        <div class="icon text-black">
                            <Phone class="w-5 h-5 fill-gray-500" />
                        </div>
                        <div class="text">
                            <span>Contact us</span>
                        </div>
					</button>
				</a>
			</div>
		</div>
	</header>
	<div class="dropdowns relative">
		<div
			id="service_links"
			class="bg-dark text-white outline-2 outline-dark-lead/20 rounded-xl shadow-lg p-6 w-full max-w-2xl dropdown absolute"
		>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each service_links as { name, color, url, icon }}
					<a href={url} class="link">
						<div class="flex items-center space-x-3">
							<div class="bg-dark text-{color} p-2 rounded-lg">
								<svelte:component this={icon} />
							</div>
							<span class="">{name}</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
<div class="opacity-0 bg-blue bg-yellow text-blue text-yellow dropdown show">
	<element class="link"> </element>
</div>

<div
	class="sm-header content-grid fixed bottom-8 left-0 right-0 sm:hidden z-[102]"
	bind:this={smHeader}
>
	<header class="flex justify-between">
		<div class="corner">
			<a href="/" aria-labelledby="dakdot">
				<svg
					bind:this={brand_logo}
					class="brand_logo fill-white h-6 transition-all duration-500 ease-in-out"
					viewBox="0 0 163 36"
				>
					<path
						d="M86 36H77.6025L70.175 25.0017L68.137 27.3336V33.6765C68.137 34.9609 67.1098 36 65.8453 36H61V2.32768C61 1.0433 62.0272 0 63.2917 0H68.137V19.3779H68.5421L76.5631 9.80533C76.9969 9.28576 77.6353 8.98649 78.3064 8.98649H85.5007L75.5564 20.7205L86 36Z"
					/>
					<path
						d="M110.116 0C108.841 0 107.805 1.03982 107.805 2.31991V13.0039C107.562 12.8299 107.315 12.6642 107.059 12.5151C105.169 11.3717 102.958 10.7171 100.59 10.7171C95.9577 10.7171 91.9108 13.2276 89.7285 16.9685C88.627 18.841 88 21.0283 88 23.3565C88 27.1305 89.646 30.5192 92.2614 32.835C94.4808 34.8028 97.3933 36 100.59 36C101.613 36 102.608 35.8757 103.561 35.6479C105.157 35.2585 106.634 34.5625 107.929 33.6262V35.8799H112.694C113.969 35.8799 115 34.8442 115 33.5641V0H110.116ZM100.512 28.7296C97.5418 28.7296 95.1367 26.3144 95.1367 23.3358C95.1367 20.3572 97.5418 17.9379 100.512 17.9379C103.482 17.9379 105.883 20.353 105.883 23.3358C105.883 26.3185 103.478 28.7296 100.512 28.7296Z"
					/>
					<path
						d="M22.1157 0C20.8409 0 19.8055 1.03982 19.8055 2.31991V13.0039C19.5621 12.8299 19.3146 12.6642 19.0588 12.5151C17.1694 11.3717 14.9583 10.7171 12.5904 10.7171C7.95767 10.7171 3.91077 13.2276 1.72849 16.9685C0.627038 18.841 0 21.0283 0 23.3565C0 27.1305 1.64599 30.5192 4.26142 32.835C6.48083 34.8028 9.39327 36 12.5904 36C13.6134 36 14.6076 35.8757 15.5606 35.6479C17.1571 35.2585 18.6339 34.5625 19.9293 33.6262V35.8799H24.694C25.9687 35.8799 27 34.8442 27 33.5641V0H22.1157ZM12.512 28.7296C9.54179 28.7296 7.13674 26.3144 7.13674 23.3358C7.13674 20.3572 9.54179 17.9379 12.512 17.9379C15.4822 17.9379 17.8831 20.353 17.8831 23.3358C17.8831 26.3185 15.4781 28.7296 12.512 28.7296Z"
					/>
					<path
						d="M161.052 35.8496C161.052 35.8496 161.036 35.8538 161.028 35.8538C160.249 35.9499 159.506 36 158.8 36C156.157 36 154.136 35.3357 152.735 34.0071C151.335 32.6827 150.633 30.7776 150.633 28.3001V14.0241H147V8.45908H150.633V4.33964C150.633 3.04866 151.652 2 152.906 2H157.712V8.45908H162.644V14.0241H157.712V27.6692C157.712 28.5299 157.899 29.1649 158.268 29.5785C158.637 29.9879 159.254 30.1968 160.119 30.1968C160.387 30.1968 160.764 30.1592 161.251 30.0882C161.738 30.013 162.108 29.9462 162.359 29.8793L162.96 33.1005C163.2 34.4082 162.335 35.6866 161.052 35.8496Z"
					/>
					<path
						d="M130.5 36C137.404 36 143 30.4036 143 23.5C143 16.5964 137.404 11 130.5 11C123.596 11 118 16.5964 118 23.5C118 30.4036 123.596 36 130.5 36Z"
					/>
					<path
						d="M54.694 11.1188H49.9293V13.3476C48.6339 12.4217 47.1571 11.7334 45.5606 11.3482C44.6076 11.1229 43.6134 11 42.5904 11C39.3933 11 36.4808 12.184 34.2614 14.1301C31.646 16.4203 30 19.7676 30 23.5C30 27.2324 31.646 30.5797 34.2614 32.8699C36.4808 34.816 39.3933 36 42.5904 36C43.6134 36 44.6076 35.8771 45.5606 35.6518C47.1571 35.2666 48.6339 34.5783 49.9293 33.6524V35.8812H54.694C55.9687 35.8812 57 34.8569 57 33.591V13.409C57 12.1431 55.9687 11.1188 54.694 11.1188ZM42.5244 28.822C39.5542 28.822 37.1491 26.4294 37.1491 23.4836C37.1491 20.5379 39.5542 18.1452 42.5244 18.1452C45.4946 18.1452 47.8955 20.5338 47.8955 23.4836C47.8955 26.4335 45.4905 28.822 42.5244 28.822Z"
					/>
				</svg>
			</a>
		</div>
        <div></div>
		<button
			class="hamburger-btn grid grid-flow-col md:hidden"
			bind:this={hamburgerButton}
			onclick={() => (navOpen = !navOpen)}
			title="Menu button"
			aria-label="menu"
		>
			<svg class="hamburger w-10" fill="none" viewbox="-10 -10 120 120">
				<path class="line" d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
				></path>
			</svg>
		</button>
	</header>
</div>
<div class="sm-nav z-[100]" class:open={navOpen}>
	<ul class="text-black gap-y-3">
		<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<a href="/">Home</a>
		</li>
		<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
			<a href="/about">About</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith('/work') ? 'page' : undefined}>
			<a href="/work">Our Work</a>
		</li>
		<li
			class="dropdown-wrapper"
			data-target="service_links"
			aria-current={$page.url.pathname.startsWith('/services') ? 'page' : undefined}
		>
			<a href="#">Services</a>
		</li>
		<div class="grid grid-cols-2 gap-x-3 text-base">
			{#each service_links as { name, color, url, icon }}
				<a href={url} class="link py-1.5">
					<div class="flex items-center space-x-3">
						<span class="">{name}</span>
					</div>
				</a>
			{/each}
		</div>
		<li aria-current={$page.url.pathname.startsWith('/contact') ? 'page' : undefined}>
			<a href="/contact">Contact</a>
		</li>
	</ul>
</div>

<style>
	@reference "tailwindcss/theme";

	.dropdown {
		translate: -50% -2rem;
		left: 50%;
		transform-origin: top;
		pointer-events: none;
		scale: 0.75;
		/* clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%); */
		transition: all 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		/* transition: clip-path 0.25s ease-in-out; */
		opacity: 0;

		& .link {
			translate: 0 1rem;
			transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		&.show {
			pointer-events: all;
			scale: 1;
			translate: -50% 0.1rem;
			opacity: 1;
			/* clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); */

			& .link {
				translate: 0 0;
			}
		}
	}

	header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
	}

	.corner {
		display: grid;
		align-items: center;
	}

	nav {
		--background: theme(--color-black);
		justify-content: center;
		border-radius: 2rem;
		border: 2px solid var(--color-dark-lead);
		padding: 0 1.5rem;
		backdrop-filter: blur(5px);
		background-color: #0c0c0c8e;
		position: relative;
		transition: padding 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			padding: 0 2rem;
		}

        ul {
            position: relative;
            padding: 0;
            margin: 0;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            list-style: none;
            
            li {
                position: relative;
                height: 100%;
                
                &[aria-current='page'] {
                    font-weight: 900;

                    &::before {
                        --size: 6px;
                        content: '';
                        width: 0;
                        height: 0;
                        position: absolute;
                        top: 0;
                        left: calc(50% - var(--size));
                        border: var(--size) solid transparent;
                        border-top: var(--size) solid var(--color-red);
                    }
                }

                a {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    padding: 0 0.5rem;
                    color: var(--color-white);
                    font-weight: 500;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    text-decoration: none;
                    transition: color 0.2s linear;
                }
            }
        }
	}

	path {
		fill: var(--background);
	}

    .contact-button {
        @apply bg-white text-black rounded-full grid h-12 w-12 p-1 cursor-pointer;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        grid-template-columns: auto 0fr;
        transform-origin: left;

        & .icon {
            @apply grid place-content-center aspect-square rounded-full;
        }

        & .text {
            @apply grid place-content-center font-semibold;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
        }
        
        &:hover, &:focus, &.active {
            @apply pr-6;
            grid-template-columns: auto auto;
            column-gap: .75rem;
            width: auto;


            & .icon {
                background-color: var(--color-red);
            }
            
            & .text {
                width: max-content;
            }
        }
    }

	a:hover {
		color: var(--color-red);
	}

	.hamburger-btn {
		@apply bg-white overflow-hidden rounded-full ml-auto;
		cursor: pointer;
        width: fit-content;

		& svg {
			@apply stroke-[10];
			stroke: var(--color-black);
			stroke-linecap: round;
			stroke-linejoin: round;
			transition:
				translate 0.5s,
				rotate 0.5s;
		}
		& .line {
			stroke-dasharray: 60 31 60 300;
			transition: 0.5s;
		}

		&.open .hamburger {
			translate: 2px -3px;
			rotate: 0.125turn;
		}

		&.open .line {
			stroke-dasharray: 60 105 60 300;
			stroke-dashoffset: -90;
		}
	}

	.sm-nav {
		position: fixed;
		inset: 0;
		background-color: var(--color-white);
		pointer-events: none;
		clip-path: circle(0% at 94% 92%);
		transition: clip-path 500ms ease-in;
        padding: 0 1rem;

		&.open {
			pointer-events: auto;
			clip-path: circle(135% at 94% 92%);
		}

		& ul {
			height: 80svh;
			color: var(--color-black);
			display: grid;
			align-content: flex-end;
			row-gap: 0.75rem;
			font-size: 1.25rem;

			& li {
				padding: 0.375rem 0;

				&[aria-current='page'] {
					font-weight: 900;

					&::before {
						--size: 6px;
						content: '';
						width: 0;
						height: 0;
						position: absolute;
						top: 1em;
						left: -1rem;
						transform: translateY(-50%) rotate(-90deg);
						border: var(--size) solid transparent;
						border-top: var(--size) solid var(--color-red);
					}
				}
			}
		}
	}
</style>
