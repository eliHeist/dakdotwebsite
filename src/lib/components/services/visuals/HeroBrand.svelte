<script lang="ts">
	import { parallax } from '$lib/actions/motion';
</script>

<!-- White on Brand blue: an identity being built as a system. Illustrative only. -->
<div class="scene anim" use:parallax aria-hidden="true">
	<!-- Construction grid -->
	<svg class="grid" viewBox="0 0 400 400" data-depth="4">
		{#each [50, 100, 150, 200, 250, 300, 350] as v, i}
			<line x1={v} y1="0" x2={v} y2="400" style="--i:{i}" />
			<line x1="0" y1={v} x2="400" y2={v} style="--i:{i}" />
		{/each}
	</svg>

	<!-- Mark under construction: circle, guides, compass sweep -->
	<svg class="mark" viewBox="0 0 200 200" data-depth="14">
		<circle class="guide" cx="100" cy="100" r="78" />
		<circle class="guide" cx="100" cy="100" r="46" />
		<line class="guide" x1="10" y1="100" x2="190" y2="100" />
		<line class="guide" x1="100" y1="10" x2="100" y2="190" />
		<g class="sweep"
			><line x1="100" y1="100" x2="178" y2="100" /><circle cx="178" cy="100" r="4" /></g
		>
		<circle class="solid" cx="100" cy="100" r="46" />
		<circle class="dot" cx="142" cy="58" r="12" />
	</svg>

	<!-- Type specimen breathing through the weight axis -->
	<div class="spec" data-depth="22">
		<span class="aa">Aa</span>
		<span class="meta">Schibsted Grotesk<br /><b class="tnum">400 – 900</b></span>
	</div>

	<!-- Swatches stepping into place -->
	<div class="swatches" data-depth="30">
		<span style="--c: var(--color-ink); --i:0"></span>
		<span style="--c: var(--color-field-design); --i:1"></span>
		<span style="--c: var(--color-mute); --i:2"></span>
		<span style="--c: #ffffff; --i:3" class="ring"></span>
	</div>

	<!-- Clear-space rule -->
	<div class="rule" data-depth="18">
		<span class="box"></span>
		<span class="txt">Clear space = 1×</span>
	</div>
</div>

<style>
	.scene {
		position: relative;
		width: 100%;
		aspect-ratio: 1.05;
		color: #ffffff;
	}
	.scene > * {
		position: absolute;
	}

	.grid {
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.grid line {
		stroke: #ffffff;
		stroke-opacity: 0.12;
		stroke-width: 1;
		stroke-dasharray: 400;
		stroke-dashoffset: 0;
		animation: draw-grid 9s var(--ease-out) infinite;
		animation-delay: calc(var(--i) * 70ms);
	}

	.mark {
		left: 6%;
		top: 8%;
		width: 58%;
		overflow: visible;
	}
	.guide {
		fill: none;
		stroke: #ffffff;
		stroke-opacity: 0.35;
		stroke-width: 1;
		stroke-dasharray: 4 5;
	}
	.sweep {
		transform-origin: 100px 100px;
		animation: sweep 6s var(--ease-out) infinite;
	}
	.sweep line {
		stroke: #ffffff;
		stroke-width: 1.5;
	}
	.sweep circle {
		fill: #ffffff;
	}
	.solid {
		fill: #ffffff;
		transform-origin: 100px 100px;
		animation: solid 6s var(--ease-out) infinite;
	}
	.dot {
		fill: var(--color-ink);
		stroke: #ffffff;
		stroke-width: 3;
		animation: dot-in 6s var(--ease-out) infinite;
	}

	.spec {
		color: var(--color-ink);
		right: 2%;
		top: 4%;
		width: 40%;
		padding: 18px 20px;
		border-radius: 18px;
		background: #fff;
		border: 1px solid rgb(11 13 16 / 0.14);
		display: grid;
		gap: 6px;
		animation: float 7s ease-in-out infinite;
	}
	.aa {
		font-size: clamp(3.5rem, 7vw, 6.5rem);
		line-height: 0.9;
		letter-spacing: -0.04em;
		font-weight: 400;
		animation: weight 4s ease-in-out infinite alternate;
	}
	.meta {
		font-size: 12px;
		line-height: 1.4;
		color: #5b616b;
	}
	.meta b {
		color: var(--color-ink);
	}

	.swatches {
		right: 8%;
		bottom: 12%;
		display: flex;
		gap: 10px;
		padding: 14px;
		border-radius: 999px;
		background: #fff;
		border: 1px solid rgb(11 13 16 / 0.14);
		animation: float 8s ease-in-out infinite reverse;
	}
	.swatches span {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--c);
		animation: pop 6s var(--ease-out) infinite;
		animation-delay: calc(var(--i) * 120ms);
	}
	.swatches .ring {
		box-shadow: inset 0 0 0 1.5px var(--color-ink);
	}

	.rule {
		left: 10%;
		bottom: 4%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 16px 10px 10px;
		border-radius: 14px;
		background: var(--color-ink);
		color: var(--color-paper);
		font-size: 13px;
		font-weight: 600;
		animation: float 9s ease-in-out infinite;
	}
	.box {
		width: 26px;
		height: 26px;
		border: 1.5px dashed var(--color-paper);
		border-radius: 6px;
		animation: breathe 3s ease-in-out infinite;
	}

	@keyframes float {
		50% {
			transform: translateY(-10px);
		}
	}
	@keyframes draw-grid {
		0% {
			stroke-dashoffset: 400;
		}
		20%,
		100% {
			stroke-dashoffset: 0;
		}
	}
	@keyframes sweep {
		0% {
			rotate: 0deg;
		}
		45%,
		100% {
			rotate: 360deg;
		}
	}
	@keyframes solid {
		0%,
		40% {
			scale: 0;
		}
		55%,
		92% {
			scale: 1;
		}
		100% {
			scale: 0;
		}
	}
	@keyframes dot-in {
		0%,
		52% {
			translate: 40px -40px;
			opacity: 0;
		}
		66%,
		92% {
			translate: 0 0;
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes weight {
		from {
			font-weight: 400;
		}
		to {
			font-weight: 900;
		}
	}
	@keyframes pop {
		0% {
			scale: 0.4;
			opacity: 0;
		}
		14%,
		90% {
			scale: 1;
			opacity: 1;
		}
		100% {
			scale: 0.4;
			opacity: 0;
		}
	}
	@keyframes breathe {
		50% {
			scale: 1.25;
		}
	}

	@media (max-width: 600px) {
		.scene {
			aspect-ratio: 0.9;
		}
		.rule {
			display: none;
		}
	}
</style>
