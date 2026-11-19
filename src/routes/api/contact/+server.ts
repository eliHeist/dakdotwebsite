// Contact form endpoint. SMTP settings are read at runtime (see .envtemp), so the site
// builds without them and the host can supply them as environment variables.
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

interface EmailOptions {
	to: string;
	subject: string;
	text: string;
	html: string;
	replyTo?: string;
}

const configured = () => !!(env.EMAIL_HOST && env.EMAIL_USER && env.EMAIL_PASS);
const recipient = () => env.CONTACT_TO || 'dakdotagency@gmail.com';

async function sendEmail(options: EmailOptions): Promise<void> {
	const port = Number(env.EMAIL_PORT || 587);
	const transporter = nodemailer.createTransport({
		host: env.EMAIL_HOST,
		port,
		secure: port === 465, // implicit TLS on 465; STARTTLS on 587/25
		auth: {
			user: env.EMAIL_USER,
			pass: env.EMAIL_PASS
		}
	});

	const mailOptions = {
		from: env.EMAIL_FROM || env.EMAIL_USER,
		to: options.to,
		replyTo: options.replyTo,
		subject: options.subject,
		text: options.text,
		html: options.html
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		console.log('\n\nEmail sent: ' + info.response);
	} catch (error) {
		console.error('Error sending email: ', error);
		throw error;
	}
}

const escapeHtml = (v: unknown) =>
	String(v ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const json = (status: number, message: string) =>
	new Response(JSON.stringify({ message }), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "Book a call" requests from the homepage network
async function handleCallBooking(body: Record<string, unknown>): Promise<Response> {
	const name = String(body.name ?? '').trim();
	const email = String(body.email ?? '').trim();
	const phone = String(body.phone ?? '').trim();
	const website = String(body.website ?? '').trim();
	const goals = String(body.goals ?? '').trim();

	if (!name || !email || !goals)
		return json(400, 'Name, company email and project goals are required.');
	if (!EMAIL_RE.test(email)) return json(400, 'That email address does not look right.');
	if (
		name.length > 200 ||
		email.length > 200 ||
		phone.length > 50 ||
		website.length > 300 ||
		goals.length > 5000
	) {
		return json(400, 'One of the fields is too long.');
	}

	const rows: [string, string][] = [
		['Name', name],
		['Email', email],
		['Phone', phone || '(not given)'],
		['Website', website || '(not given)']
	];
	const text = `${rows.map(([k, v]) => `${k}: \t${v}`).join('\n')}\n\nProject goals:\n${goals}`;
	const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#0B0D10;color:#E9ECEF;padding:20px">
<h2 style="margin:0 0 12px">Call request</h2>
<table style="text-align:left">${rows
		.map(
			([k, v]) =>
				`<tr><th style="color:#9AA1AB;padding-right:12px">${k}</th><td>${escapeHtml(v)}</td></tr>`
		)
		.join('')}</table>
<h3 style="margin:16px 0 4px">Project goals</h3>
<p style="white-space:pre-wrap">${escapeHtml(goals)}</p>
</body></html>`;

	try {
		await sendEmail({
			to: recipient(),
			replyTo: email,
			subject: `Call request: ${name.slice(0, 80)}`,
			text,
			html
		});
	} catch {
		return json(502, 'We could not send your request right now.');
	}
	return json(200, 'Request sent');
}

// API endpoint: "Book a call" requests from the site's contact form.
export async function POST({ request }): Promise<Response> {
	if (!configured()) {
		console.error('[contact] EMAIL_HOST, EMAIL_USER and EMAIL_PASS must be set (see .envtemp).');
		return json(503, 'Our contact form is not available right now.');
	}
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return json(400, 'Invalid request');
	}
	return handleCallBooking(body);
}
