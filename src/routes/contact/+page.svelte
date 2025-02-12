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
			<h1 class="text-3xl md:text-5xl font-semibold">
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
                    <select>
                        <option value="" disabled selected>Select a Category *</option
                        >
                        <option value="software">Software Solutions</option>
                        <option value="design">Design & Graphics</option>
                        <option value="motion">Motion Design</option>
                    </select>
					<!-- <label for="name">Subject (Optional)</label> -->
				</div>

				<div class="inputGroup">
                    <textarea name="message" id="message" maxlength="200"></textarea>
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

<section class="content-grid bg-black py-24">
	<div class="breakout">
		<h1 class="text-4xl lg:text-6xl font-bold text-white mb-12">Contact Us</h1>
		<div class="grid lg:flex lg:justify-between gap-y-12">
			<div class="lg:w-1/2">
				<h2 class="text-2xl lg:text-4xl font-medium text-white mb-6">Get in Touch</h2>
				<p class="text-lg text-white mb-4">
					<a href="tel:+256769345389">+256 769 345 389</a>
				</p>
				<p class="text-lg text-white mb-4">
					<a href="mailto:connect@dakdot.com">connect@dakdot.com</a>
				</p>
				<div class="flex gap-x-4">
					<a href="#" class="text-white"><Linkedin /></a>
					<a href="#" class="text-white"><Instagram /></a>
				</div>
			</div>
			<div class="lg:w-1/2">
				<form on:submit={handleSubmit} class="grid gap-y-6">
					<div>
						<label for="name" class="block text-white">Name</label>
						<input type="text" id="name" bind:value={name} class="w-full p-2 rounded" required />
					</div>
					<div>
						<label for="company" class="block text-white">Company (optional)</label>
						<input type="text" id="company" bind:value={company} class="w-full p-2 rounded" />
					</div>
					<div>
						<label for="email" class="block text-white">Email</label>
						<input type="email" id="email" bind:value={email} class="w-full p-2 rounded" required />
					</div>
					<div>
						<label for="phone" class="block text-white">Phone</label>
						<input type="tel" id="phone" bind:value={phone} class="w-full p-2 rounded" required />
					</div>
					<div>
						<label for="subject" class="block text-white">Subject (optional)</label>
						<input type="text" id="subject" bind:value={subject} class="w-full p-2 rounded" />
					</div>
					<div>
						<label for="category" class="block text-white">Category</label>
						<select id="category" bind:value={category} class="w-full p-2 rounded">
							<option value="software solutions">Software Solutions</option>
							<option value="design and graphics">Design and Graphics</option>
							<option value="motion design">Motion Design</option>
						</select>
					</div>
					<div>
						<label for="message" class="block text-white">Message (max 200 characters)</label>
						<textarea
							id="message"
							bind:value={message}
							class="w-full p-2 rounded"
							maxlength="200"
							required
						></textarea>
					</div>
					<button
						type="submit"
						class="px-6 py-3 text-lg font-medium text-white bg-transparent outline-2 outline-white rounded-lg"
						>Submit</button
					>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
    @reference "tailwindcss/theme";
	/* From Uiverse.io by Maximinodotpy */
	.inputGroup {
		margin: 1em 0 1em 0;
		position: relative;
	}

	.inputGroup input, .inputGroup select {
		padding: 0.75em;
		outline: 1px solid rgb(74, 73, 73);
		background-color: transparent;
		border-radius: 0.375rem;
		width: 100%;
	}

	.inputGroup label {
		position: absolute;
		left: 0;
		padding: 0.75em;
		pointer-events: none;
		transition: all 0.3s ease;
		color: rgb(100, 100, 100);
	}

	.inputGroup :is(input:focus, input:valid) ~ label {
		transform: translateY(-50%) scale(0.9);
		margin: 0em;
		margin-left: 1.3em;
		padding: 0.4em;
		background-color: var(--color-black);
	}

	.inputGroup :is(input:focus, input:valid) {
		outline-color: var(--color-lead);
	}
	.inputGroup :not(input:valid) {
		outline-color: var(--color-red);
	}
</style>
