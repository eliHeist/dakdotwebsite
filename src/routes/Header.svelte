<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.svg';
    import dakdot from '$lib/images/dakdot.svg'
	import github from '$lib/images/github.svg';
    import { Menu, Phone } from "lucide-svelte";
</script>

<div class="content-grid">
    <header class="breakout">
        <div class="corner">
            <a href="https://svelte.dev/docs/kit">
                <img src={dakdot} alt="SvelteKit" class="w-full" />
            </a>
        </div>
    
        <nav class="hidden sm:flex">
            <svg viewBox="0 0 2 3" aria-hidden="true">
                <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
            </svg>
            <ul>
                <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
                    <a href="/">Home</a>
                </li>
                <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
                    <a href="/about">About</a>
                </li>
                <li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
                    <a href="/sverdle">Services</a>
                </li>
                <li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
                    <a href="/sverdle">Contact</a>
                </li>
            </ul>
            <svg viewBox="0 0 2 3" aria-hidden="true">
                <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
            </svg>
        </nav>
    
        <div class="corner">
            <div class="flex justify-end">
                <button class="text-black bg-white aspect-square rounded-full grid place-content-center h-10">
                    <Phone/>
                </button>
            </div>
        </div>
    </header>
</div>

<style>
    @reference "tailwindcss/theme";

	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 6rem;
		/* width: 9rem; */
        display: grid;
        align-items: center;
	}

	nav {
		justify-content: center;
		--background: theme(--color-white);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
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

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 500;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-red);
	}
</style>
