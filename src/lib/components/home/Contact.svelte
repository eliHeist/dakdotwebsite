<script lang="ts">
	import RollButton from '$lib/components/ui/RollButton.svelte';
	import WhatsAppIcon from '$lib/components/ui/WhatsAppIcon.svelte';
	import { CONTACT, whatsappHref } from '$lib/data/contact';
	import { reveal, splitWords } from '$lib/actions/motion';

	let { heading = 'Got a project in mind?', level = 2 }: { heading?: string; level?: 1 | 2 } =
		$props();

	type Status = 'idle' | 'sending' | 'sent' | 'error';
	let status = $state<Status>('idle');
	let message = $state('');
	let errors = $state<Record<string, string>>({});

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

		const next: Record<string, string> = {};
		if (!data.name?.trim()) next.name = 'Tell us your name.';
		if (!data.email?.trim()) next.email = 'We need an email to reply to.';
		else if (!EMAIL_RE.test(data.email.trim()))
			next.email = 'That email address does not look right.';
		if (!data.goals?.trim()) next.goals = 'A sentence or two about the project is enough.';
		errors = next;
		if (Object.keys(next).length) {
			(form.querySelector(`[name="${Object.keys(next)[0]}"]`) as HTMLElement | null)?.focus();
			return;
		}

		status = 'sending';
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: 'call', ...data })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(body.message || 'Something went wrong.');
			status = 'sent';
			form.reset();
		} catch (err) {
			status = 'error';
			message = err instanceof Error ? err.message : 'Something went wrong.';
		}
	}
</script>

{#snippet wa()}<WhatsAppIcon />{/snippet}

<section id="book" class="wrap" aria-labelledby="book-h">
	<svelte:element this={`h${level}`} id="book-h" class="big-h" use:splitWords
		>{heading}</svelte:element
	>

	<div class="grid">
		<div class="side" use:reveal>
			<p class="lede">
				Tell us a little about it and we'll set up a call. Prefer to chat? WhatsApp us and a real
				person gets back to you.
			</p>
			<div class="direct">
				<RollButton
					label="WhatsApp us"
					href={whatsappHref}
					external
					variant="ghost"
					cursor="Chat"
					icon={wa}
				/>
			</div>
			<dl class="lines">
				<div>
					<dt>Call</dt>
					<dd><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></dd>
				</div>
				<div>
					<dt>Email</dt>
					<dd><a href="mailto:{CONTACT.email}">{CONTACT.email}</a></dd>
				</div>
			</dl>
			<ul class="facts">
				<li>
					We agree a timeline with you before we start. A focused website usually takes 1–3 weeks.
				</li>
				<li>
					Hosting comes as part of our web development work: we set it up and manage it for you.
				</li>
				<li>
					After launch we keep things running: updates, security patches, support and training.
				</li>
			</ul>
		</div>

		{#if status === 'sent'}
			<div class="done" role="status">
				<p class="done-h">Request received.</p>
				<p>We'll email you to find a time for the call.</p>
				<button type="button" class="again" onclick={() => (status = 'idle')}>Send another</button>
			</div>
		{:else}
			<form
				onsubmit={submit}
				novalidate
				aria-describedby={status === 'error' ? 'form-error' : undefined}
				use:reveal={80}
			>
				<div class="f">
					<input
						id="bc-name"
						name="name"
						autocomplete="name"
						placeholder=" "
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? 'bc-name-e' : undefined}
					/>
					<label for="bc-name">Your name</label>
					{#if errors.name}<p class="err" id="bc-name-e">{errors.name}</p>{/if}
				</div>
				<div class="f">
					<input
						id="bc-email"
						name="email"
						type="email"
						autocomplete="email"
						placeholder=" "
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? 'bc-email-e' : undefined}
					/>
					<label for="bc-email">Company email</label>
					{#if errors.email}<p class="err" id="bc-email-e">{errors.email}</p>{/if}
				</div>
				<div class="f">
					<input id="bc-phone" name="phone" type="tel" autocomplete="tel" placeholder=" " />
					<label for="bc-phone">Phone <span>(optional)</span></label>
				</div>
				<div class="f">
					<input id="bc-site" name="website" type="url" autocomplete="url" placeholder=" " />
					<label for="bc-site">Your website <span>(optional)</span></label>
				</div>
				<div class="f wide">
					<textarea
						id="bc-goals"
						name="goals"
						rows="3"
						placeholder=" "
						aria-invalid={!!errors.goals}
						aria-describedby={errors.goals ? 'bc-goals-e' : undefined}
					></textarea>
					<label for="bc-goals">What are you looking to build?</label>
					{#if errors.goals}<p class="err" id="bc-goals-e">{errors.goals}</p>{/if}
				</div>
				{#if status === 'error'}
					<p class="err wide" id="form-error" role="alert">
						{message} Try again, or reach us on WhatsApp.
					</p>
				{/if}
				<div class="wide">
					<RollButton
						type="submit"
						size="lg"
						label={status === 'sending' ? 'Sending…' : 'Book a call'}
						disabled={status === 'sending'}
						cursor="Send"
					/>
				</div>
			</form>
		{/if}
	</div>
</section>

<style>
	.wrap {
		max-width: 88rem;
		margin: 0 auto;
		padding: 7rem 1.5rem 8rem;
	}
	.wrap:has(h1) {
		padding-top: clamp(8rem, 18vh, 12rem);
	}
	.big-h {
		font-size: clamp(3rem, 10vw, 9.5rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 0.92;
		text-wrap: balance;
		max-width: 12ch;
	}
	.grid {
		margin-top: 4.5rem;
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 3rem 5rem;
	}
	.lede {
		font-size: 1.15rem;
		line-height: 1.55;
		color: var(--color-mute);
		max-width: 40ch;
	}
	.direct {
		margin-top: 1.75rem;
	}
	.lines {
		margin-top: 2rem;
		display: grid;
		gap: 0.6rem;
	}
	.lines div {
		display: flex;
		gap: 1rem;
	}
	dt {
		width: 3.5rem;
		color: var(--color-mute);
	}
	dd a {
		color: var(--color-paper);
		text-decoration: none;
		background: linear-gradient(currentColor, currentColor) no-repeat 0 100% / 0% 1px;
		transition: background-size 0.4s var(--ease-out);
	}
	dd a:hover {
		background-size: 100% 1px;
	}
	.facts {
		margin-top: 2.5rem;
		padding: 1.5rem 0 0;
		border-top: 1px solid var(--color-rule);
		list-style: none;
		display: grid;
		gap: 0.7rem;
		max-width: 46ch;
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--color-mute);
	}

	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.25rem 2rem;
		align-content: start;
	}
	.wide {
		grid-column: 1 / -1;
	}
	/* Underline fields with a floating label. */
	.f {
		position: relative;
		padding-top: 1.1rem;
	}
	.f input,
	.f textarea {
		width: 100%;
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--color-rule-strong);
		border-radius: 0;
		padding: 0.6rem 0;
		color: var(--color-paper);
		font: inherit;
		font-size: 1.15rem;
		caret-color: var(--color-field-dev);
		transition: border-color 0.3s var(--ease-out);
		resize: vertical;
	}
	.f textarea {
		min-height: 5.5rem;
	}
	.f label {
		position: absolute;
		left: 0;
		top: 1.7rem;
		font-size: 1.15rem;
		color: var(--color-mute);
		pointer-events: none;
		transform-origin: left top;
		transition:
			translate 0.35s var(--ease-out),
			scale 0.35s var(--ease-out),
			color 0.35s var(--ease-out);
	}
	.f label span {
		font-size: 0.85em;
	}
	.f :is(input, textarea):focus + label,
	.f :is(input, textarea):not(:placeholder-shown) + label {
		translate: 0 -1.6rem;
		scale: 0.78;
		color: var(--color-paper);
	}
	.f :is(input, textarea):hover {
		border-color: var(--color-mute);
	}
	.f :is(input, textarea):focus {
		outline: none;
		border-color: var(--color-paper);
	}
	.f::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: var(--color-paper);
		scale: 0 1;
		transform-origin: left;
		transition: scale 0.5s var(--ease-out);
	}
	.f:focus-within::after {
		scale: 1 1;
	}
	.f.wide::after {
		bottom: 6px;
	}
	[aria-invalid='true'] {
		border-bottom-color: var(--color-web-text) !important;
	}
	.err {
		margin-top: 0.45rem;
		font-size: 0.85rem;
		color: var(--color-web-text);
	}

	.done {
		align-self: start;
		padding: 2.5rem;
		border-radius: 24px;
		background: var(--color-field-design);
		color: var(--color-on-design);
	}
	.done-h {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.03em;
	}
	.done p + p {
		margin-top: 0.5rem;
	}
	.again {
		margin-top: 1.25rem;
		background: none;
		border: 0;
		padding: 0;
		color: inherit;
		text-decoration: underline;
		cursor: pointer;
		font: inherit;
		font-weight: 600;
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 560px) {
		form {
			grid-template-columns: 1fr;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.f label,
		.f::after {
			transition: none;
		}
	}
</style>
