<script lang="ts">
	/**
	 * Compact animated illustration of a service, drawn in paper on ink with the
	 * service's colour as a single accent. `active` plays the motion (hover/focus);
	 * at rest it shows a settled composition. Decorative only.
	 */
	import type { LineId } from '$lib/data/network';

	let { id, active = false }: { id: LineId; active?: boolean } = $props();
</script>

<div class="art anim {id}" class:active aria-hidden="true">
	{#if id === 'web'}
		<div class="win">
			<div class="bar"><i></i><i></i><i></i></div>
			<div class="chart">
				{#each [0.4, 0.65, 0.5, 0.9, 0.6] as h, i}<span style="--h:{h}; --i:{i}"></span>{/each}
			</div>
		</div>
		<span class="tag">&lt;App /&gt;</span>
		<svg class="cursor" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" /></svg>
	{:else if id === 'brand'}
		<svg class="mark" viewBox="0 0 120 120">
			<circle class="guide" cx="60" cy="60" r="46" />
			<line class="guide" x1="6" y1="60" x2="114" y2="60" />
			<line class="guide" x1="60" y1="6" x2="60" y2="114" />
			<circle class="solid" cx="60" cy="60" r="26" />
			<circle class="dot" cx="86" cy="34" r="8" />
		</svg>
		<span class="aa">Aa</span>
		<span class="sw"><i></i><i></i><i></i></span>
	{:else}
		<span class="ball"></span>
		<span class="floor"></span>
		<div class="track">
			<i style="left:12%"></i><i style="left:46%"></i><i style="left:80%"></i>
			<span class="head"></span>
		</div>
		<svg class="play" viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" /></svg>
	{/if}
</div>

<style>
	.art {
		--acc: var(--color-paper);
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		border-radius: 16px;
		background: var(--color-ink);
		border: 1px solid var(--color-rule);
		overflow: hidden;
		color: var(--color-paper);
	}
	.web {
		--acc: var(--color-field-dev);
	}
	.motion {
		--acc: var(--color-field-motion);
	}
	.brand {
		--acc: var(--color-field-design);
	}
	.art > * {
		position: absolute;
	}

	/* ---------- Web ---------- */
	.win {
		left: 12%;
		top: 16%;
		width: 62%;
		height: 66%;
		border: 1.5px solid var(--color-rule-strong);
		border-radius: 10px;
		display: grid;
		grid-template-rows: auto 1fr;
		transition: translate 0.6s var(--ease-out);
	}
	.bar {
		display: flex;
		gap: 4px;
		padding: 6px 8px;
		border-bottom: 1px solid var(--color-rule-strong);
	}
	.bar i {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--color-rule-strong);
	}
	.chart {
		display: flex;
		align-items: end;
		gap: 5px;
		padding: 8px 10px;
	}
	.chart span {
		flex: 1;
		height: calc(var(--h) * 55%);
		border-radius: 3px 3px 1px 1px;
		background: var(--color-rule-strong);
		transition:
			height 0.6s var(--ease-out),
			background 0.4s var(--ease-out);
		transition-delay: calc(var(--i) * 50ms);
	}
	.active .chart span {
		height: calc(var(--h) * 100%);
	}
	.active .chart span:nth-child(4) {
		background: var(--acc);
	}
	.tag {
		right: 9%;
		top: 18%;
		padding: 4px 9px;
		border-radius: 999px;
		background: var(--color-paper);
		color: var(--color-ink);
		font-size: 11px;
		font-weight: 700;
		scale: 0.6;
		opacity: 0;
		rotate: 8deg;
		transition:
			scale 0.5s var(--ease-out),
			opacity 0.3s var(--ease-out),
			rotate 0.5s var(--ease-out);
	}
	.active .tag {
		scale: 1;
		opacity: 1;
		rotate: -4deg;
	}
	.cursor {
		right: 18%;
		bottom: 10%;
		width: 20px;
		height: 20px;
		fill: var(--color-paper);
		stroke: var(--color-ink);
		stroke-width: 1.2;
		transition: translate 0.7s var(--ease-out);
	}
	.active .cursor {
		translate: -42px -26px;
	}

	/* ---------- Brand ---------- */
	.mark {
		left: 10%;
		top: 10%;
		height: 80%;
		overflow: visible;
	}
	.guide {
		fill: none;
		stroke: var(--color-rule-strong);
		stroke-width: 1;
		stroke-dasharray: 3 4;
		transform-origin: 60px 60px;
		transition: rotate 1.2s var(--ease-out);
	}
	.active .guide {
		rotate: 90deg;
	}
	.solid {
		fill: var(--color-paper);
		transform-origin: 60px 60px;
		transition: scale 0.6s var(--ease-out);
	}
	.active .solid {
		scale: 1.12;
	}
	.dot {
		fill: var(--acc);
		stroke: var(--color-paper);
		stroke-width: 3;
		translate: 18px -18px;
		opacity: 0;
		transition:
			translate 0.6s var(--ease-out),
			opacity 0.3s var(--ease-out);
	}
	.active .dot {
		translate: 0 0;
		opacity: 1;
	}
	.aa {
		right: 12%;
		top: 18%;
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		line-height: 1;
		letter-spacing: -0.04em;
		font-weight: 400;
		transition: font-weight 0.8s var(--ease-out);
	}
	.active .aa {
		font-weight: 900;
	}
	.sw {
		right: 12%;
		bottom: 16%;
		display: flex;
		gap: 5px;
	}
	.sw i {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: var(--color-paper);
		scale: 0.4;
		opacity: 0.4;
		transition:
			scale 0.4s var(--ease-out),
			opacity 0.4s var(--ease-out);
	}
	.sw i:nth-child(2) {
		background: var(--acc);
		transition-delay: 60ms;
	}
	.sw i:nth-child(3) {
		background: #5b616b;
		transition-delay: 120ms;
	}
	.active .sw i {
		scale: 1;
		opacity: 1;
	}

	/* ---------- Motion ---------- */
	.ball {
		left: 18%;
		top: 14%;
		width: 16%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color-paper);
		transform-origin: 50% 100%;
	}
	.active .ball {
		animation: bounce 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	}
	.floor {
		left: 10%;
		width: 40%;
		top: 64%;
		height: 2px;
		background: var(--color-rule-strong);
	}
	.track {
		left: 10%;
		right: 10%;
		bottom: 12%;
		height: 14px;
		border-radius: 5px;
		background: var(--color-ink-3);
	}
	.track i {
		position: absolute;
		top: 50%;
		width: 8px;
		height: 8px;
		margin: -4px 0 0 -4px;
		rotate: 45deg;
		border-radius: 1.5px;
		background: var(--acc);
	}
	.head {
		position: absolute;
		top: -5px;
		bottom: -5px;
		left: 4%;
		width: 2px;
		background: var(--color-paper);
		transition: left 1.4s linear;
	}
	.active .head {
		left: 94%;
	}
	.play {
		right: 12%;
		top: 16%;
		width: 34px;
		height: 34px;
		padding: 8px;
		border-radius: 50%;
		background: var(--color-paper);
		fill: var(--color-ink);
		transition: scale 0.4s var(--ease-out);
	}
	.active .play {
		scale: 1.15;
	}
	@keyframes bounce {
		0%,
		100% {
			top: 6%;
			scale: 0.94 1.06;
		}
		45% {
			top: 40%;
			scale: 0.9 1.12;
		}
		50% {
			top: 46%;
			scale: 1.3 0.7;
		}
		56% {
			top: 40%;
			scale: 0.9 1.12;
		}
	}
</style>
