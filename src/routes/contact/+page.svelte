<script lang="ts">
	import { SendHorizontal, Mail, Phone, Loader2 } from 'lucide-svelte';
    import { gsap } from "gsap";

    let buttonMessage: string|null = null;
    let buttonMessageColor: string = "#000";

    function startSend() {
        if (typeof(window) !== 'undefined') {
            const timeline1 = gsap.timeline({ paused: true });
            // Timeline 1: Text fades out, icon moves up like a rocket, and new text appears
            timeline1
                .to(".submit-btn", { rotate: -2, duration: 0.3, ease: "power2.inOut" })
                // .to(".submit-btn .icon", { className: "icon animate-spin" })
                .to(".submit-btn .text", { opacity: 1, left: "30%", duration: 0.4 }, "<")
                .to(".submit-btn .icon", { opacity: 1, left: "70%", scale: 1.25 , duration: 0.3, ease: "power2.inOut" }, "-=0.1")
                .to(".submit-btn .text", { innerText: "Sending ...", duration: 0.3, ease: "power2.inOut" }, "-=0.2")

            timeline1.play();
        }
    }
    
    function endSend() {
        if (typeof(window) !== 'undefined') {
            const timeline2 = gsap.timeline({ paused: true });
            // Timeline 2: Transition from "Sending..." to "Success"
            timeline2
                .to(".submit-btn .text", { innerText: buttonMessage })
                .to(".submit-btn .text", { innerText: buttonMessage, color: buttonMessageColor, duration: 1, ease: "power2.inOut" }, "<")
                .to(".submit-btn .icon", { top: "50%", rotate: 0, left: "50%", scale: 0.3, opacity: 0, duration: 0.3, ease: "power2.inOut" }, "<")
                .to(".submit-btn", { rotate: 0, duration: 5, ease: "power2.inOut" }, "-=0.6")
                .to(".submit-btn .text", { left: '50%', duration: 5 }, "<")
                .to(".submit-btn .text", { color: "var(--color-black)", duration: 0.5, ease: "power2.inOut" }, "+=1")
                .to(".submit-btn .text", { innerText: "Submit Form" })

            timeline2.play();
        }
    }



    let sending = $state(false);

	interface FormData {
		name: string;
		email: string;
		phone: string;
		budget_currency: string;
		budget_amount: number | null | string;
		details: string;
	}

	let formData = $state<FormData>({
		name: '',
		email: '',
		phone: '',
		budget_currency: 'UGX',
		budget_amount: null,
		details: ''
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
        buttonMessage = "Sending...";
        startSend();
        
        formData.budget_amount = Number(formData.budget_amount).toLocaleString('en-US');
		// post the formdata to /api/contact
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

        let data = await response.json();
        buttonMessage = data.message;

		if (response.ok) {
            buttonMessageColor = "#29a718";
			formData = { 
				name: '', 
				email: '', 
				phone: '', 
				budget_currency: 'UGX',
				budget_amount: null,
				details: ''
			};
		} else {
            buttonMessageColor = "#EE2531";
			console.error(data.message);
		}

        endSend();
        sending = false;
	}
</script>

<svelte:head>
	<title>Contact Us</title>
	<meta name="description" content="Get in touch with us" />
</svelte:head>

<section class="min-h-screen content-grid items-center pt-14">
	<div class="grid grid-cols-1 md:[grid-template-columns:2fr_3fr] gap-10 items-center">
		<!-- Left Column - Contact Info -->
		<div class="grid gap-y-12">
			<h1 class="text-3xl md:text-5xl lg:text-7xl font-semibold mb-12">
				Let's <span class="text-red">Talk.</span>
			</h1>

            <div class="flex gap-6 items-center">
                <div class="rounded-full h-16 w-16 grid place-content-center outline-2 outline-lead">
                    <Phone />
                </div>
                <p>
                    Talk to us directly at <br>
                    <a href="tel:+256769345389" class="inline-flex items-center text-red underline text-lg">+256 769 345 389</a>
                </p>
            </div>

            <div class="flex gap-6 items-center">
                <div class="rounded-full h-16 w-16 grid place-content-center outline-2 outline-lead">
                    <Mail />
                </div>
                <p>
                    Email us directly at <br>
                    <a href="mailto:connect@dakdot.com" class="inline-flex items-center text-red underline text-lg">
                        connect@dakdot.com
                    </a>
                </p>
            </div>
		</div>

		<!-- Right Column - Contact Form -->
		<div class="w-full bg-dark p-12 rounded-3xl">
			<form class="space-y-4" onsubmit={handleSubmit}>
				<!-- From Uiverse.io by Maximinodotpy -->
                <div class="grid gap-y-6">
                    <div class="input-field">
                        <input id="name" name="name" required type="text" bind:value={formData.name} />
                        <label for="name">Full Name <span class="text-red">*</span></label>
                    </div>
    
                    <div class="grid sm:grid-cols-2 gap-3">
                        <div class="input-field">
                            <input id="email" name="email" required type="email" bind:value={formData.email} />
                            <label for="email">Email <span class="text-red">*</span></label>
                        </div>
        
                        <div class="input-field">
                            <input id="phone" name="phone" required type="tel" bind:value={formData.phone} />
                            <label for="phone">Phone <span class="text-red">*</span></label>
                        </div>
                    </div>
    
                    <div class="grid gap-3 [grid-template-columns:2fr_1fr]">
                        <div class="input-field">
                            <input id="amount" name="amount" required type="number" bind:value={formData.budget_amount} />
                            <label for="amount">Your budget <span class="text-red">*</span></label>
                        </div>
                        <div class="input-field">
                            <select id="country" name="country" required bind:value={formData.budget_currency}>
                                <option value="UGX" selected>UGX</option>
                                <option value="USD">USD</option>
                            </select>
                            <label for="country">Currency <span class="text-red">*</span></label>
                        </div>
                    </div>
    
                    <div class="input-field">
                        <textarea id="message" name="message" required bind:value={formData.details}></textarea>
                        <label for="message">Tell us about your Project <span class="text-red">*</span></label>
                    </div>
                </div>

				<div class="mt-4 flex items-center space-x-2">
					<span class="text-lead text-sm">
						By submitting, I understand that DakDot will securely hold my data in accordance with their
						<a href="/legal/pivacy/" class="text-red underline">privacy policy</a>.
					</span>
				</div>

				<button class="submit-btn">
					<span class="text">Submit Form</span> 
                    <div class="icon">
                        <Loader2 class="animate-spin" />
                    </div>
				</button>
			</form>
		</div>
	</div>
</section>

<div class="hidden">
</div>

<style>
    @reference "tailwindcss/theme";
	/* From Uiverse.io by elijahgummer */ 
    .input-field {
        position: relative;
        border-bottom: 1px solid;
        border-color: color-mix(in oklab, var(--color-lead) /* #B7AFB5 = #b7afb5 */ 20%, transparent);
        margin: 15px 0;

        & label {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            color: var(--color-lead);
            pointer-events: none;
            transition: 0.15s ease;
        }
    
        & input, & select {
            width: 100%;
            height: 3rem;
            background: transparent;
            border: none;
            outline: none;
            color: var(--color-white);
        }
    
        & textarea {
            width: 100%;
            height: 3rem;
            background: transparent;
            border: none;
            outline: none;
            color: var(--color-white);
        }
    
        & input:focus ~ label,
        & input:valid ~ label,
        & textarea:focus ~ label,
        & textarea:valid ~ label,
        & select:focus ~ label,
        & select:valid ~ label {
            font-size: 0.8rem;
            top: 10px;
            transform: translateY(-120%);
        }
    }

    select {
        & option {
            color: var(--color-lead);
            background-color: var(--color-dark);

            &:hover {
                background-color: color-mix(in oklab, var(--color-lead) /* #B7AFB5 = #b7afb5 */ 20%, transparent);
            }
        }
    }

    .submit-btn {
        @apply w-full bg-white text-black h-12 rounded-full mt-6 flex justify-center items-center space-x-2 font-semibold cursor-pointer relative transition-all outline-2 outline-transparent outline-offset-2;
        
        &:hover {
            outline-color: var(--color-lead);
        }

        & .text{
            position: absolute;
            font-weight: 600;
            transform-origin: center;
            transform: translateX(-50%) translateY(-50%);
            left: 50%;
            top: 50%;
        }
        
        & .icon {
            @apply opacity-0 w-6 h-6 transition-all;
            position: absolute;
            transform-origin: center;
            transform: translateX(-50%) translateY(-50%) scale(0.3);
            left: 50%;
            top: 50%;
        }
    }

</style>
