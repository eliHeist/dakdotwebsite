<script lang="ts">
	import { CONTACT, whatsappHref } from '$lib/data/contact';

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

<section id="book" class="wrap" aria-labelledby="book-h">
	<div class="terminus" aria-hidden="true">
		<span class="l web"></span><span class="l brand"></span><span class="l motion"></span>
		<span class="stop"></span>
	</div>

	<div class="intro">
		<h2 id="book-h">Let's talk about what you're building.</h2>
		<p>
			Tell us a little about the project and we'll set up a call. Prefer to chat? Message us on
			WhatsApp and we'll get back to you.
		</p>
		<ul class="facts">
			<li>
				We agree a timeline with you before we start. A focused website usually takes 1–3 weeks.
			</li>
			<li>
				Hosting comes as part of our web development work: we set it up and manage it for you.
			</li>
			<li>After launch we keep things running: updates, security patches, support and training.</li>
		</ul>
		<div class="direct">
			<a class="wa" href={whatsappHref} target="_blank" rel="noopener" data-cursor="Chat">
				<svg viewBox="0 0 24 24" aria-hidden="true"
					><path
						d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17.2c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 1 1 12 19.7Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z"
					/></svg
				>
				WhatsApp us
			</a>
			<a class="plain" href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
			<a class="plain" href="mailto:{CONTACT.email}">{CONTACT.email}</a>
		</div>
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
		>
			<div class="field">
				<label for="bc-name">Full name</label>
				<input
					id="bc-name"
					name="name"
					autocomplete="name"
					aria-invalid={!!errors.name}
					aria-describedby={errors.name ? 'bc-name-e' : undefined}
				/>
				{#if errors.name}<p class="err" id="bc-name-e">{errors.name}</p>{/if}
			</div>
			<div class="field">
				<label for="bc-email">Company email</label>
				<input
					id="bc-email"
					name="email"
					type="email"
					autocomplete="email"
					aria-invalid={!!errors.email}
					aria-describedby={errors.email ? 'bc-email-e' : undefined}
				/>
				{#if errors.email}<p class="err" id="bc-email-e">{errors.email}</p>{/if}
			</div>
			<div class="field">
				<label for="bc-phone">Phone <span>(optional)</span></label>
				<input id="bc-phone" name="phone" type="tel" autocomplete="tel" />
			</div>
			<div class="field">
				<label for="bc-site">Your website <span>(optional)</span></label>
				<input id="bc-site" name="website" type="url" autocomplete="url" placeholder="https://" />
			</div>
			<div class="field wide">
				<label for="bc-goals">What are you looking to build?</label>
				<textarea
					id="bc-goals"
					name="goals"
					rows="4"
					aria-invalid={!!errors.goals}
					aria-describedby={errors.goals ? 'bc-goals-e' : undefined}
				></textarea>
				{#if errors.goals}<p class="err" id="bc-goals-e">{errors.goals}</p>{/if}
			</div>
			{#if status === 'error'}
				<p class="err wide" id="form-error" role="alert">
					{message} Try again, or reach us on WhatsApp.
				</p>
			{/if}
			<div class="wide actions">
				<button class="primary" type="submit" disabled={status === 'sending'} data-cursor="Send">
					{status === 'sending' ? 'Sending…' : 'Book a call'}
					<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
				</button>
			</div>
		</form>
	{/if}
</section>

<style>
	.wrap {
		position: relative;
		max-width: 88rem;
		margin: 0 auto;
		padding: 6rem 1.5rem 7rem;
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		gap: 4rem;
	}
	.terminus {
		position: absolute;
		left: 1.5rem;
		right: 1.5rem;
		top: 0;
		height: 2rem;
	}
	.terminus .l {
		position: absolute;
		left: 0;
		height: 4px;
		border-radius: 2px;
	}
	.l.web {
		top: 0;
		right: 18%;
		background: var(--color-line-web);
	}
	.l.brand {
		top: 10px;
		right: 18%;
		background: var(--color-line-brand);
	}
	.l.motion {
		top: 20px;
		right: 18%;
		background: var(--color-line-motion);
	}
	.terminus .stop {
		position: absolute;
		right: calc(18% - 14px);
		top: -6px;
		width: 14px;
		height: 36px;
		border-radius: 8px;
		background: var(--color-ink);
		border: 3px solid var(--color-paper);
	}

	h2 {
		font-size: clamp(2.25rem, 4.6vw, 3.75rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.02;
		text-wrap: balance;
	}
	.intro p {
		margin-top: 1.25rem;
		color: var(--color-mute);
		font-size: 1.1rem;
		line-height: 1.55;
		max-width: 44ch;
	}
	.facts {
		margin-top: 1.75rem;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.6rem;
		max-width: 46ch;
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--color-mute);
	}
	.facts li {
		position: relative;
		padding-left: 1.4rem;
	}
	.facts li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5em;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		border: 2.5px solid var(--color-paper);
	}
	.direct {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.85rem;
	}
	.wa {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.85rem 1.3rem;
		border-radius: 999px;
		border: 1px solid var(--color-rule);
		color: var(--color-paper);
		text-decoration: none;
		font-weight: 600;
		transition:
			border-color 0.3s var(--ease-out),
			background 0.3s var(--ease-out);
	}
	.wa:hover {
		border-color: #25d366;
		background: rgb(37 211 102 / 0.08);
	}
	.wa svg {
		width: 1.2rem;
		height: 1.2rem;
		fill: #25d366;
	}
	.plain {
		color: var(--color-mute);
		text-decoration: none;
	}
	.plain:hover {
		color: var(--color-paper);
		text-decoration: underline;
	}

	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem 1.25rem;
		align-content: start;
	}
	.wide {
		grid-column: 1 / -1;
	}
	label {
		display: block;
		font-size: 0.9rem;
		font-weight: 500;
		margin-bottom: 0.45rem;
	}
	label span {
		color: var(--color-mute);
		font-weight: 400;
	}
	input,
	textarea {
		width: 100%;
		background: var(--color-ink-2);
		border: 1px solid var(--color-rule);
		border-radius: 8px;
		padding: 0.8rem 0.9rem;
		color: var(--color-paper);
		font: inherit;
		caret-color: var(--color-line-web);
		transition:
			border-color 0.2s var(--ease-out),
			background 0.2s var(--ease-out);
	}
	input::placeholder {
		color: #7d8590;
	}
	input:hover,
	textarea:hover {
		border-color: #3a404a;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-paper);
		background: var(--color-ink-3);
	}
	[aria-invalid='true'] {
		border-color: var(--color-web-text);
	}
	textarea {
		resize: vertical;
		min-height: 7.5rem;
	}
	.err {
		margin-top: 0.4rem;
		font-size: 0.85rem;
		color: var(--color-web-text);
	}
	.actions {
		display: flex;
		justify-content: flex-start;
	}
	.primary {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.95rem 1.6rem;
		border-radius: 999px;
		/* Brand red one step deeper so white text clears 4.5:1. */
		background: var(--color-signal);
		color: #fff;
		font-weight: 600;
		font-size: 1rem;
		border: 0;
		cursor: pointer;
		transition:
			background 0.25s var(--ease-out),
			transform 0.25s var(--ease-out);
	}
	.primary svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		transition: transform 0.3s var(--ease-out);
	}
	.primary:hover {
		background: var(--color-signal-hover);
	}
	.primary:hover svg {
		transform: translateX(4px);
	}
	.primary:active {
		transform: scale(0.98);
	}
	.primary:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	.done {
		align-self: start;
		padding: 2rem;
		border: 1px solid var(--color-rule);
		border-radius: 12px;
		background: var(--color-ink-2);
	}
	.done-h {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.done p + p {
		margin-top: 0.5rem;
		color: var(--color-mute);
	}
	.again {
		margin-top: 1.25rem;
		background: none;
		border: 0;
		padding: 0;
		color: var(--color-paper);
		text-decoration: underline;
		cursor: pointer;
		font: inherit;
	}

	@media (max-width: 860px) {
		.wrap {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
	}
	@media (max-width: 520px) {
		form {
			grid-template-columns: 1fr;
		}
	}
</style>
