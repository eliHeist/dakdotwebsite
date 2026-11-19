// src/routes/api/sendEmail/+server.ts
import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } from '$env/static/private';

interface EmailOptions {
	to: string;
	subject: string;
	text: string;
	html: string;
}

// Function to send an email
async function sendEmail(options: EmailOptions): Promise<void> {
	let transporter = nodemailer.createTransport({
		host: EMAIL_HOST,
		port: Number(EMAIL_PORT),
		secure: false, // true for 465, false for other ports
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS
		}
	});

	let mailOptions = {
		from: EMAIL_USER,
		to: options.to,
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
			to: 'dakdotagency@gmail.com',
			subject: `Call request: ${name.slice(0, 80)}`,
			text,
			html
		});
	} catch {
		return json(502, 'We could not send your request right now.');
	}
	return json(200, 'Request sent');
}

// API endpoint
export async function POST({ request }): Promise<Response> {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return json(400, 'Invalid request');
	}
	if (body.type === 'call') return handleCallBooking(body);

	const { name, email, phone, budget_currency, budget_amount, details } = body as Record<
		string,
		string
	>;

	if (!name || !email || !phone || !budget_currency || !budget_amount || !details) {
		return new Response(JSON.stringify({ message: 'Missing required fields' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const to = 'dakdotagency@gmail.com';
	const subject = 'New Contact Form Submission';
	const text = `Name: \t${name}\nEmail: \t${email}\nPhone: \t${phone}\nBudget Currency: \t${budget_currency}\nBudget Amount: \t${budget_amount}\n\nDetails: \n${details}
    `;
	const html = emailTemplate(
		escapeHtml(name),
		escapeHtml(email),
		escapeHtml(phone),
		escapeHtml(budget_currency),
		escapeHtml(budget_amount),
		escapeHtml(details)
	);

	try {
		await sendEmail({ to, subject, text, html });
	} catch {
		return json(502, 'We could not send your message right now.');
	}

	return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const emailTemplate = (
	name: string,
	email: string,
	phone: string,
	budget_currency: string,
	budget_amount: string,
	details: string
) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif;background-color: #0C0C0C; color: #FDFEFD }
        .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
        .header { color: #FDFEFD; padding: 12px; text-align: center;font-weight:700; }
        .content { padding: 20px;background-color:#1F1C1C;border-radius:0.75rem; }
        .content table {text-align:left;width:100%;}
        .content h2 { color: #FDFEFD;font-size:1.25rem;margin-bottom:.25rem; }
        .content table th { color: #B7AFB5; }
        .footer { padding: 10px; text-align: center; font-size: 12px; color: #777; }
        a{color:#EE2531}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
            <h2>Details</h2>
            <table>
              <tr><th>Name:</th> <td>${name}</td> </tr>
              <tr><th>Email:</th> <td>${email}</td> </tr>
              <tr><th>Phone:</th> <td><a href="tel:${phone}">${phone}</a></td> </tr>
              <tr><th>Budget:</th> <td>${budget_currency}. ${budget_amount}</td> </tr>
            </table>
            <h2 style="margin-top:1rem;">Message</h2>
            <p>${details}</p>
        </div>
        <div class="footer">
            <p>This email was sent from <a href="dakdot.com/contact/">dakdot.com website contact form</a>.</p>
        </div>
    </div>
</body>
</html>
`;
