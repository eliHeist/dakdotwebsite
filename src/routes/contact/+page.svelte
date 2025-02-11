<script lang="ts">
    import { Linkedin, Instagram } from "lucide-svelte";

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
                        <textarea id="message" bind:value={message} class="w-full p-2 rounded" maxlength="200" required></textarea>
                    </div>
                    <button type="submit" class="px-6 py-3 text-lg font-medium text-white bg-transparent outline-2 outline-white rounded-lg">Submit</button>
                </form>
            </div>
        </div>
    </div>
</section>