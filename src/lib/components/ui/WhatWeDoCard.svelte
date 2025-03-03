<script lang="ts">
	export let title = 'Web Development';
	export let description =
		'We build high-performance websites and applications tailored to your business needs.';
	export let icon = '/icons/web-dev.svg';

	let card:HTMLElement;
	let x = 50,
		y = 50;

	function updateMousePosition(event:MouseEvent) {
		if (!card) return;
		const { left, top, width, height } = card.getBoundingClientRect();
		x = ((event.clientX - left) / width) * 100;
		y = ((event.clientY - top) / height) * 100;
	}
</script>

<div
	bind:this={card}
	class="card-2 relative overflow-hidden transition-all duration-300 border border-dark-lead"
	on:mousemove={updateMousePosition}
	style="--x: {x}%; --y: {y}%;"
	aria-roledescription="card"
	role="group"
>
	<div class="relative flex items-center gap-4">
		<!-- <img src={icon} alt={title} class="w-12 h-12 object-contain" /> -->
		<h3>{title}</h3>
	</div>
	<p>{description}</p>

	<div
		class="absolute inset-0 rounded-2xl border-[2px] border-transparent transition-all duration-300 pointer-events-none opacity-40"
		style="background: radial-gradient(circle at var(--x) var(--y), rgba(255, 255, 255, 0.15), transparent 60%);"
	></div>
</div>

<style>
    .card-2 {
        padding: 2rem;
        border-radius: 1.5rem;
        display: grid;
        align-items: flex-start;
        align-content: flex-start;
        min-height: 15rem;
        outline: 2px solid var(--color-dark);

        h3 {
            font-size: 1.5rem;
            padding-bottom: 1.5rem;
        }

        p{
            color: var(--color-lead);
        }
    }
</style>
