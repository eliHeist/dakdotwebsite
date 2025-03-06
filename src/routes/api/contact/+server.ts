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
    }
}

// API endpoint
export async function POST({ request }): Promise<Response> {
    const { name, email, phone, budget_currency, budget_amount, details } = await request.json();

    if (!name || !email || !phone || !budget_currency || !budget_amount || !details) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const to = 'dakdotagency@gmail.com';
    const subject = 'New Contact Form Submission';
    const text = `Name: \t${name}\nEmail: \t${email}\nPhone: \t${phone}\nBudget Currency: \t${budget_currency}\nBudget Amount: \t${budget_amount}\n\nDetails: \n${details}
    `;
    const html = emailTemplate(name, email, phone, budget_currency, budget_amount, details);

    await sendEmail({ to, subject, text, html });

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


const emailTemplate = (name:string, email:string, phone:string, budget_currency:string, budget_amount:string, details:string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif;background-color: #0C0C0C; color: #FDFEFD }
        .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
        .header { color: #FDFEFD; padding: 12px; text-align: center;font-size:1.35rem;font-weight:700; }
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
            <h1>New Contact Form Submission</h1>
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

