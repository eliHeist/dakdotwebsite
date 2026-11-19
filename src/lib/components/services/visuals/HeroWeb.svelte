<script lang="ts">
	import { parallax } from '$lib/actions/motion';
</script>

<!-- Illustrative UI only: no real product, data or metrics. -->
<div class="scene anim" use:parallax aria-hidden="true">
	<div class="win" data-depth="10">
		<div class="bar"><i></i><i></i><i></i><span class="url">yourbusiness.app</span></div>
		<div class="body">
			<ul class="side">
				<li>Dashboard</li>
				<li class="on">Bookings</li>
				<li>Clients</li>
				<li>Invoices</li>
			</ul>
			<div class="main">
				<p class="h">Bookings this week</p>
				<div class="chart">
					{#each [['M', 0.45], ['T', 0.7], ['W', 0.55], ['T', 0.85], ['F', 0.6], ['S', 0.95], ['S', 0.75]] as [d, h], i}
						<span class="col"><span class="b" style="--h:{h}; --i:{i}"></span><em>{d}</em></span>
					{/each}
				</div>
				<ul class="rows">
					<li><b>Room 2</b><span>09:00</span><i class="ok">Confirmed</i></li>
					<li><b>Room 5</b><span>11:30</span><i>Pending</i></li>
				</ul>
			</div>
		</div>
	</div>

	<div class="card toggle" data-depth="22">
		<span class="lbl">Auto-reminders</span>
		<span class="sw"><i></i></span>
	</div>

	<div class="card field" data-depth="16">
		<span class="lbl">Email</span>
		<span class="input"
			><span class="typed">hello@yourbusiness.app</span><span class="caret"></span></span
		>
		<span class="btn">Save</span>
	</div>

	<div class="card code" data-depth="28">
		<code>
			<span style="--i:0"><b>&lt;Booking</b> client="new" /&gt;</span>
			<span style="--i:1"><b>&lt;Invoice</b> auto /&gt;</span>
			<span style="--i:2"><b>&lt;Report</b> weekly /&gt;</span>
		</code>
	</div>

	<svg class="pointer" viewBox="0 0 24 24"
		><path d="M4 2l16 9-7 2-3 7z" /><circle class="click" cx="4" cy="2" r="4" /></svg
	>
</div>

<style>
	.scene {
		--ink: var(--color-ink);
		--soft: #1c1f25;
		--line: #2d323a;
		position: relative;
		width: 100%;
		aspect-ratio: 1.05;
		color: var(--color-paper);
	}
	.scene > * {
		position: absolute;
	}

	.win {
		left: 0;
		top: 10%;
		width: 62%;
		background: var(--ink);
		border-radius: 18px;
		overflow: hidden;
		animation: float 7s ease-in-out infinite;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 12px 14px;
		border-bottom: 1px solid var(--line);
	}
	.bar i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--line);
	}
	.url {
		margin-left: 10px;
		padding: 3px 10px;
		border-radius: 999px;
		background: var(--soft);
		font-size: 11px;
		color: #9aa1ab;
	}
	.body {
		display: grid;
		grid-template-columns: 27% 1fr;
		min-height: 15rem;
	}
	.side {
		list-style: none;
		margin: 0;
		display: grid;
		align-content: start;
		gap: 4px;
		padding: 12px 8px;
		border-right: 1px solid var(--line);
		font-size: 11px;
		color: #9aa1ab;
	}
	.side li {
		padding: 5px 8px;
		border-radius: 6px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.side li.on {
		background: var(--soft);
		color: var(--color-paper);
		font-weight: 600;
	}
	.main {
		padding: 14px 16px 16px;
		display: grid;
		gap: 12px;
		align-content: start;
		min-width: 0;
	}
	.h {
		font-size: 13px;
		font-weight: 700;
	}
	.chart {
		height: 7.5rem;
		display: flex;
		align-items: stretch;
		gap: 8px;
		padding-bottom: 4px;
		border-bottom: 1px solid var(--line);
	}
	.col {
		flex: 1;
		display: grid;
		grid-template-rows: 1fr auto;
		gap: 4px;
		align-items: end;
	}
	.b {
		height: calc(var(--h) * 100%);
		border-radius: 6px 6px 2px 2px;
		background: var(--soft);
		transform-origin: bottom;
		animation: grow 3.6s var(--ease-out) infinite;
		animation-delay: calc(var(--i) * 90ms);
	}
	.col:nth-child(6) .b {
		background: var(--color-field-dev);
	}
	.col em {
		font-style: normal;
		font-size: 10px;
		text-align: center;
		color: #9aa1ab;
	}
	.rows {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 6px;
		font-size: 11.5px;
	}
	.rows li {
		display: grid;
		grid-template-columns: 1fr auto auto;
		align-items: center;
		gap: 10px;
		padding: 6px 8px;
		border-radius: 8px;
		background: var(--soft);
	}
	.rows span {
		color: #9aa1ab;
	}
	.rows i {
		font-style: normal;
		font-size: 10.5px;
		padding: 2px 8px;
		border-radius: 999px;
		border: 1px solid var(--line);
		color: #c9ced6;
	}
	.rows i.ok {
		background: var(--color-paper);
		border-color: var(--color-paper);
		color: var(--ink);
	}

	.card {
		background: var(--ink);
		border-radius: 16px;
		padding: 14px 16px;
		font-size: 13px;
	}
	.lbl {
		color: #9aa1ab;
	}
	.toggle {
		right: 0;
		top: 2%;
		width: auto;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		animation: float 6s ease-in-out infinite reverse;
	}
	.sw {
		width: 38px;
		height: 22px;
		border-radius: 999px;
		background: var(--line);
		position: relative;
		animation: sw-bg 4s steps(1) infinite;
	}
	.sw i {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-paper);
		animation: sw-knob 4s var(--ease-out) infinite;
	}

	.field {
		right: 0;
		top: 63%;
		width: 46%;
		display: grid;
		gap: 8px;
		animation: float 8s ease-in-out infinite;
	}
	.input {
		display: flex;
		align-items: center;
		height: 34px;
		padding: 0 10px;
		border-radius: 8px;
		background: var(--soft);
		overflow: hidden;
		white-space: nowrap;
	}
	.typed {
		display: inline-block;
		overflow: hidden;
		max-width: 100%;
		animation: type 5s steps(22) infinite;
	}
	.caret {
		width: 2px;
		height: 16px;
		background: var(--color-field-dev);
		animation: blink 0.9s steps(1) infinite;
	}
	.btn {
		justify-self: end;
		padding: 6px 14px;
		border-radius: 999px;
		background: var(--color-paper);
		color: var(--ink);
		font-weight: 600;
		animation: press 5s ease infinite;
	}

	.code {
		left: 4%;
		bottom: 0;
		width: 46%;
		animation: float 9s ease-in-out infinite reverse;
	}
	.code code {
		display: grid;
		gap: 6px;
		font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
		font-size: 12.5px;
		color: #9aa1ab;
	}
	.code span {
		white-space: nowrap;
		animation: line 6s var(--ease-out) infinite;
		animation-delay: calc(var(--i) * 0.5s);
	}
	.code b {
		color: var(--color-paper);
		font-weight: 600;
	}

	.pointer {
		/* Rests on the Save button. */
		left: 89%;
		top: 80%;
		width: 26px;
		height: 26px;
		fill: var(--color-paper);
		stroke: var(--ink);
		stroke-width: 1.2;
		filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.35));
		animation: tour 8s var(--ease-out) infinite;
	}
	.click {
		fill: none;
		stroke: var(--color-paper);
		stroke-width: 1.5;
		opacity: 0;
		transform-origin: 4px 2px;
		animation: ping 8s ease-out infinite;
	}

	@keyframes float {
		50% {
			transform: translateY(-10px);
		}
	}
	@keyframes grow {
		0% {
			scale: 1 0.15;
		}
		35%,
		85% {
			scale: 1 1;
		}
		100% {
			scale: 1 0.15;
		}
	}
	@keyframes sw-knob {
		0%,
		45% {
			translate: 0 0;
		}
		50%,
		95% {
			translate: 16px 0;
		}
		100% {
			translate: 0 0;
		}
	}
	@keyframes sw-bg {
		0% {
			background: var(--line);
		}
		50% {
			background: var(--color-field-dev);
		}
	}
	@keyframes type {
		0% {
			width: 0;
		}
		60%,
		90% {
			width: 100%;
		}
		100% {
			width: 0;
		}
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
	@keyframes press {
		0%,
		64%,
		72%,
		100% {
			scale: 1;
		}
		68% {
			scale: 0.9;
		}
	}
	@keyframes line {
		0% {
			opacity: 0;
			translate: -6px 0;
		}
		12%,
		88% {
			opacity: 1;
			translate: 0 0;
		}
		100% {
			opacity: 0;
		}
	}
	/* The pointer visits the toggle, the save button, then the chart. */
	@keyframes tour {
		0%,
		8% {
			translate: 0 0;
		}
		22%,
		30% {
			translate: 12vmin -28vmin;
		}
		46%,
		54% {
			translate: 18vmin 10vmin;
		}
		72%,
		80% {
			translate: -22vmin -6vmin;
		}
		100% {
			translate: 0 0;
		}
	}
	@keyframes ping {
		0%,
		26% {
			opacity: 0;
			scale: 0.4;
		}
		28% {
			opacity: 1;
			scale: 0.6;
		}
		34% {
			opacity: 0;
			scale: 2.2;
		}
		50% {
			opacity: 0;
			scale: 0.4;
		}
		52% {
			opacity: 1;
			scale: 0.6;
		}
		58%,
		100% {
			opacity: 0;
			scale: 2.2;
		}
	}

	/* Phones: fewer panels, each whole. The dashboard leads, the field sits below it. */
	@media (max-width: 600px) {
		.scene {
			aspect-ratio: 0.82;
		}
		.win {
			left: 0;
			right: 0;
			top: 15%;
			width: auto;
		}
		.body {
			grid-template-columns: 1fr;
			min-height: 0;
		}
		.side,
		.code,
		.field,
		.pointer {
			display: none;
		}
		.chart {
			height: 5.5rem;
		}
	}
</style>
