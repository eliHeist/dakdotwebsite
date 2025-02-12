<script lang="ts">
	import { Linkedin, Instagram } from 'lucide-svelte';

	let name = '';
	let company = '';
	let email = '';
	let phone = '';
	let subject = '';
	let category = 'software solutions';
	let message = '';

	function handleSubmit(event: Event) {
		event.preventDefault();
		// Handle form submission logic here
	}
</script>

<svelte:head>
	<title>Contact Us</title>
	<meta name="description" content="Get in touch with us" />
</svelte:head>

<section class="min-h-screen content-grid items-center">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
		<!-- Left Column - Contact Info -->
		<div class="space-y-6">
			<p class="text-red uppercase text-sm tracking-wide">Connect With Us</p>
			<h1 class="text-3xl md:text-5xl lg:text-7xl font-semibold">
				Together, we can <span class="text-red">do extraordinary things.</span>
			</h1>
			<a
				href="mailto:connect@dakdot.com"
				class="inline-flex items-center text-red underline text-lg"
			>
				connect@dakdot.com <span class="ml-2 text-xl">↗</span>
			</a>
		</div>

		<!-- Right Column - Contact Form -->
		<div class="w-full bg-black/50 p-6 rounded-xl">
			<form class="space-y-4">
				<!-- From Uiverse.io by Maximinodotpy -->
				<div class="inputGroup">
					<input type="text" required autocomplete="off" />
					<label for="name">Your Full Name *</label>
				</div>

				<div class="inputGroup">
					<input type="text" autocomplete="off" />
					<label for="name">Company (Optional)</label>
				</div>

				<div class="inputGroup">
					<input type="email" required autocomplete="off" />
					<label for="name">Your Email *</label>
				</div>

				<div class="inputGroup">
					<input type="tel" required autocomplete="off" />
					<label for="name">Your Phone *</label>
				</div>

				<div class="inputGroup">
					<input type="text" required autocomplete="off" />
					<label for="name">Subject (Optional)</label>
				</div>

				<div class="inputGroup">
                    <select required>
                        <option value="" disabled selected></option
                        >
                        <option value="general">General</option>
                        <option value="software">Software Solutions</option>
                        <option value="design">Design & Graphics</option>
                        <option value="motion">Motion Design</option>
                    </select>
                    <label for="name">Category *</label>
					<!-- <label for="name">Subject (Optional)</label> -->
				</div>

				<div class="inputGroup">
                    <textarea name="message" id="message" maxlength="200" required></textarea>
					<label for="name">Write your message (max 200 characters) *</label>
				</div>

				<div class="mt-4 flex items-center space-x-2">
					<input type="checkbox" class="text-red" />
					<span class="text-gray-400 text-sm">
						I understand that DakDot will securely hold my data in accordance with their
						<a href="#" class="text-red underline">privacy policy</a>.
					</span>
				</div>

				<button
					class="w-full bg-white text-black py-3 rounded-full mt-6 flex justify-center items-center space-x-2 font-semibold"
				>
					<span>Submit Form</span> <span class="ml-2">↗</span>
				</button>
			</form>
		</div>
	</div>
</section>

<div class="hidden">
    <select name="" id="" on:selectionchange></select>
</div>

<style>
    @reference "tailwindcss/theme";
	/* From Uiverse.io by Maximinodotpy */
	.inputGroup {
		margin: 1em 0 1em 0;
		position: relative;
	}

	.inputGroup input, .inputGroup select, .inputGroup textarea {
		padding: 0.5rem 0.75rem;
		outline: 1px solid rgb(74, 73, 73);
		background-color: transparent;
		border-radius: 0.375rem;
		width: 100%;
	}

    select {
        & option {
            padding: 0.5rem 0.5rem;
            background: var(--color-dark);
            color: var(--color-lead);
        }
    }

	.inputGroup label {
		position: absolute;
		left: 0;
        top: 50%;
        transform: translateY(-50%);
		padding: 0 0.75rem;
		pointer-events: none;
		transition: all 0.3s ease;
		color: var(--color-dark-lead);
        transform-origin: left;
	}

	.inputGroup textarea ~ label {
		position: absolute;
		left: 0;
        top: 1.25rem;
        transform: translateY(-50%);
		padding: 0 0.75rem;
		pointer-events: none;
		transition: all 0.3s ease;
		color: var(--color-dark-lead);
        transform-origin: left;
	}

	.inputGroup :is(input:focus, input:valid) ~ label,
    .inputGroup :is(select:focus, select:valid) ~ label,
    .inputGroup :is(textarea:focus, textarea:valid) ~ label{
		transform: translateY(-50%) scale(0.75);
        top: 0;
		margin: 0em;
		margin-left: .5rem;
		padding: 0.4em;
		background-color: var(--color-black);
	}

</style>
