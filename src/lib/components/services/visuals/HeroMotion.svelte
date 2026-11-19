<script lang="ts">
	import { parallax } from '$lib/actions/motion';
</script>

<!-- Ink on yellow: the principles of animation, animated. Illustrative only. -->
<div class="scene anim" use:parallax aria-hidden="true">
	<!-- Bouncing ball with squash and stretch, plus onion-skin ghosts -->
	<div class="stage" data-depth="12">
		<span class="ghost" style="--x:8%; --y:12%; --o:0.18"></span>
		<span class="ghost" style="--x:20%; --y:46%; --o:0.28"></span>
		<span class="ghost" style="--x:32%; --y:78%; --o:0.4"></span>
		<span class="ball"></span>
		<span class="floor"></span>
	</div>

	<!-- Easing curve with a dot riding it -->
	<div class="curve card" data-depth="24">
		<svg viewBox="0 0 120 80">
			<path class="axis" d="M8 72H112M8 72V8" />
			<path class="ease" d="M8 72C52 72 60 8 112 8" />
			<circle class="rider" r="4" />
		</svg>
		<span class="lbl">ease-out</span>
	</div>

	<!-- Timeline with keyframes and a sweeping playhead -->
	<div class="timeline card" data-depth="18">
		<div class="tl-top">
			<span class="lbl">Timeline</span>
			<span class="tc tnum"><span class="sec">00:00:</span><span class="frames"></span></span>
		</div>
		{#each [['Position', [6, 34, 70]], ['Scale', [20, 48, 88]], ['Rotation', [12, 60]]] as [name, keys]}
			<div class="track">
				<span class="tname">{name}</span>
				<span class="lane">
					{#each keys as k}<i style="left:{k}%"></i>{/each}
				</span>
			</div>
		{/each}
		<span class="head"></span>
	</div>

	<!-- Film frames -->
	<div class="frames-strip" data-depth="30">
		{#each [0, 1, 2, 3] as i}<span style="--i:{i}"></span>{/each}
	</div>
</div>

<style>
	.scene {
		position: relative;
		width: 100%;
		aspect-ratio: 1.05;
		color: var(--color-ink);
	}
	.scene > * {
		position: absolute;
	}
	.card {
		background: var(--color-ink);
		color: var(--color-paper);
		border-radius: 18px;
	}
	.lbl {
		font-size: 12px;
		color: #9aa1ab;
	}

	.stage {
		left: 0;
		top: 0;
		width: 62%;
		height: 58%;
	}
	.ball,
	.ghost {
		position: absolute;
		width: 18%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color-ink);
	}
	.ghost {
		left: var(--x);
		top: var(--y);
		opacity: var(--o);
	}
	.ball {
		left: 44%;
		top: 0;
		transform-origin: 50% 100%;
		animation: bounce 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	}
	.floor {
		position: absolute;
		left: 34%;
		right: 0;
		bottom: 0;
		height: 3px;
		border-radius: 2px;
		background: var(--color-ink);
		opacity: 0.6;
	}

	.curve {
		right: 2%;
		top: 4%;
		width: 34%;
		padding: 14px 16px 12px;
		display: grid;
		gap: 6px;
		animation: float 7s ease-in-out infinite;
	}
	.curve svg {
		width: 100%;
		overflow: visible;
	}
	.axis {
		fill: none;
		stroke: var(--color-rule-strong);
		stroke-width: 1.5;
	}
	.ease {
		fill: none;
		stroke: var(--color-field-motion);
		stroke-width: 3;
		stroke-linecap: round;
	}
	.rider {
		fill: var(--color-paper);
		offset-path: path('M8 72C52 72 60 8 112 8');
		animation: ride 2.4s var(--ease-out) infinite;
	}

	.timeline {
		left: 4%;
		bottom: 6%;
		width: 70%;
		padding: 14px 16px 16px;
		display: grid;
		gap: 10px;
		animation: float 9s ease-in-out infinite reverse;
	}
	.tl-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tc {
		font-size: 13px;
		font-weight: 600;
	}
	.frames::after {
		content: '00';
		animation: count 2s steps(1) infinite;
	}
	.track {
		display: grid;
		grid-template-columns: 26% 1fr;
		align-items: center;
		gap: 10px;
		font-size: 12px;
	}
	.tname {
		color: #c9ced6;
	}
	.lane {
		position: relative;
		height: 22px;
		border-radius: 6px;
		background: #1c1f25;
	}
	.lane i {
		position: absolute;
		top: 50%;
		width: 10px;
		height: 10px;
		margin: -5px 0 0 -5px;
		background: var(--color-field-motion);
		rotate: 45deg;
		border-radius: 2px;
	}
	.head {
		position: absolute;
		top: 40px;
		bottom: 12px;
		left: calc(16px + (100% - 32px) * 0.26 + 10px);
		width: 2px;
		background: var(--color-paper);
		animation: play 4s linear infinite;
	}
	.head::before {
		content: '';
		position: absolute;
		top: -6px;
		left: -5px;
		width: 12px;
		height: 8px;
		border-radius: 2px;
		background: var(--color-paper);
	}

	.frames-strip {
		right: 4%;
		bottom: 40%;
		display: flex;
		gap: 6px;
		padding: 10px;
		border-radius: 12px;
		background: var(--color-ink);
		animation: float 8s ease-in-out infinite;
	}
	.frames-strip span {
		width: 34px;
		height: 26px;
		border-radius: 4px;
		background: #1c1f25;
		animation: frame 1.2s steps(1) infinite;
		animation-delay: calc(var(--i) * 0.3s);
	}

	@keyframes float {
		50% {
			transform: translateY(-10px);
		}
	}
	/* Squash on impact, stretch on the fall and the rise. */
	/* The ball is ~20% of the stage height, so it lands at top: 80%. */
	@keyframes bounce {
		0% {
			top: 0%;
			scale: 0.92 1.08;
		}
		45% {
			top: 72%;
			scale: 0.86 1.16;
		}
		50% {
			top: 80%;
			scale: 1.35 0.65;
		}
		56% {
			top: 72%;
			scale: 0.88 1.14;
		}
		100% {
			top: 0%;
			scale: 0.92 1.08;
		}
	}
	@keyframes ride {
		0% {
			offset-distance: 0%;
		}
		70%,
		100% {
			offset-distance: 100%;
		}
	}
	/* Sweeps the lanes: from the lane start (after the 26% name column) to the card's end. */
	@keyframes play {
		0% {
			left: calc(16px + (100% - 32px) * 0.26 + 10px);
		}
		100% {
			left: calc(100% - 18px);
		}
	}
	@keyframes frame {
		0% {
			background: var(--color-field-motion);
		}
		25% {
			background: #1c1f25;
		}
	}
	@keyframes count {
		0% {
			content: '00';
		}
		12% {
			content: '04';
		}
		25% {
			content: '08';
		}
		37% {
			content: '12';
		}
		50% {
			content: '16';
		}
		62% {
			content: '20';
		}
		75% {
			content: '24';
		}
		87% {
			content: '28';
		}
	}

	@media (max-width: 600px) {
		.scene {
			aspect-ratio: 0.9;
		}
		.frames-strip {
			display: none;
		}
		.stage {
			height: 50%;
		}
	}
</style>
