<script lang="ts">
	/**
	 * Contextual cursor: a small disc that grows into a labelled badge over
	 * elements carrying `data-cursor="Label"`. Fine pointers only; the native
	 * cursor stays visible, so nothing is lost if this never runs.
	 */
	let el: HTMLDivElement | undefined = $state();
	let label = $state('');
	let visible = $state(false);
	let enabled = $state(false);

	$effect(() => {
		const fine = matchMedia('(hover: hover) and (pointer: fine)');
		const still = matchMedia('(prefers-reduced-motion: reduce)');
		enabled = fine.matches && !new URLSearchParams(location.search).has('still');
		if (!enabled) return;

		let x = 0,
			y = 0,
			cx = 0,
			cy = 0,
			raf = 0;

		const loop = () => {
			const k = still.matches ? 1 : 0.22;
			cx += (x - cx) * k;
			cy += (y - cy) * k;
			if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
			raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
		};

		const move = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			const t = (e.target as Element | null)?.closest?.('[data-cursor]');
			const next = t?.getAttribute('data-cursor') ?? '';
			if (next !== label) label = next;
			visible = !!next;
			if (!raf) raf = requestAnimationFrame(loop);
		};
		const out = (e: PointerEvent) => {
			if (!e.relatedTarget) visible = false;
		};

		window.addEventListener('pointermove', move, { passive: true });
		document.addEventListener('pointerout', out);
		return () => {
			window.removeEventListener('pointermove', move);
			document.removeEventListener('pointerout', out);
			cancelAnimationFrame(raf);
		};
	});
</script>

{#if enabled}
	<div class="cursor" bind:this={el} aria-hidden="true">
		<span class:show={visible}>{label}</span>
	</div>
{/if}

<style>
	.cursor {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 200;
		pointer-events: none;
	}
	span {
		position: absolute;
		left: 14px;
		top: 14px;
		display: grid;
		place-items: center;
		min-width: 4.25rem;
		height: 4.25rem;
		padding: 0 0.9rem;
		border-radius: 999px;
		background: var(--color-paper);
		color: var(--color-ink);
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		transform: scale(0);
		opacity: 0;
		transition:
			transform 0.35s var(--ease-out),
			opacity 0.2s var(--ease-out);
	}
	span.show {
		transform: scale(1);
		opacity: 1;
	}
</style>
