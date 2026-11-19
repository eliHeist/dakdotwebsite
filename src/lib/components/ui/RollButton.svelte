<script lang="ts">
	import type { Snippet } from 'svelte';
	import { magnetic } from '$lib/actions/motion';

	type Props = {
		label: string;
		href?: string;
		variant?: 'primary' | 'light' | 'ghost' | 'ink';
		size?: 'md' | 'lg';
		external?: boolean;
		cursor?: string;
		type?: 'button' | 'submit';
		disabled?: boolean;
		expanded?: boolean;
		controls?: string;
		onclick?: (e: MouseEvent) => void;
		icon?: Snippet;
	};
	let {
		label,
		href,
		variant = 'primary',
		size = 'md',
		external = false,
		cursor,
		type = 'button',
		disabled = false,
		expanded,
		controls,
		onclick,
		icon
	}: Props = $props();
</script>

{#snippet inner()}
	{#if icon}<span class="ic">{@render icon()}</span>{/if}
	<span class="roll" aria-hidden="true">
		<span>{label}</span>
		<span>{label}</span>
	</span>
	<span class="sr">{label}</span>
	<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
{/snippet}

{#if href}
	<a
		{href}
		class="btn {variant} {size}"
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener' : undefined}
		data-cursor={cursor}
		use:magnetic
		{onclick}>{@render inner()}</a
	>
{:else}
	<button
		{type}
		class="btn {variant} {size}"
		{disabled}
		aria-expanded={expanded}
		aria-controls={controls}
		data-cursor={cursor}
		use:magnetic
		{onclick}>{@render inner()}</button
	>
{/if}

<style>
	.btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		border-radius: 999px;
		font: inherit;
		font-weight: 600;
		text-decoration: none;
		border: 1px solid transparent;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.3s var(--ease-out),
			color 0.3s var(--ease-out),
			border-color 0.3s var(--ease-out),
			scale 0.2s var(--ease-out);
	}
	.md {
		padding: 0.9rem 1.45rem;
		font-size: 1rem;
	}
	.lg {
		padding: 1.25rem 2rem;
		font-size: 1.2rem;
	}
	.btn:active {
		scale: 0.97;
	}
	.btn:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	.primary {
		background: var(--color-signal);
		color: #fff;
	}
	.primary:hover {
		background: var(--color-signal-hover);
	}
	.light {
		background: var(--color-paper);
		color: var(--color-ink);
	}
	.light:hover {
		background: #fff;
	}
	.ghost {
		border-color: #3a404a;
		color: var(--color-paper);
	}
	.ghost:hover {
		border-color: var(--color-paper);
	}
	.ink {
		background: var(--color-ink);
		color: var(--color-paper);
	}

	/* Rolling label: the word rolls up and a copy rolls in from below. */
	.roll {
		position: relative;
		display: inline-grid;
		overflow: hidden;
		height: 1.25em;
		line-height: 1.25em;
	}
	.roll > span {
		grid-area: 1 / 1;
		transition: translate 0.5s var(--ease-out);
	}
	.roll > span + span {
		translate: 0 100%;
	}
	.btn:hover .roll > span,
	.btn:focus-visible .roll > span {
		translate: 0 -100%;
	}
	.btn:hover .roll > span + span,
	.btn:focus-visible .roll > span + span {
		translate: 0 0;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.arr {
		width: 1em;
		height: 1em;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		transition: rotate 0.4s var(--ease-out);
	}
	.btn:hover .arr {
		rotate: -45deg;
	}
	.ic {
		display: inline-flex;
	}
	.ic :global(svg) {
		width: 1.15em;
		height: 1.15em;
	}
	@media (prefers-reduced-motion: reduce) {
		.roll > span,
		.arr {
			transition: none;
		}
	}
</style>
