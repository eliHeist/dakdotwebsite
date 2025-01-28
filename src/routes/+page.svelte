<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Dakdot homepage, landing page" />
</svelte:head>

<section class="h-[91vh] grid items-center">
	<div class="hero-text">
        <div class="one">DIGITAL</div>
        <div class="two">SOLUTIONS</div>
        <div class="three">AGENCY</div>
    </div>
</section>

<style>
    
    .hero-text {
        font-size: 8rem;
        font-weight: 900;

        & .two{
            text-align: center;
            color: var(--color-red);
        }

        & .three{
            text-align: right;
        }
    }
</style>
