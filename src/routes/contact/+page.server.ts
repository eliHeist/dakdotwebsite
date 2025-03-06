import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';


export const actions = {
    sendMessage: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const company = data.get('company');
        const email = data.get('email');
        const phone = data.get('phone');
        const subject = data.get('subject');
        const category = data.get('category');
        const message = data.get('message');

        // TODO: send email using nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'your_email_here',
                pass: 'your_password_here',
            },
        });
    
        const mailOptions = {
            from: email,
            to: 'recipient_email_here',
            subject: `Contact Form: ${subject}`,
            html: `
                <p>Name: ${name}</p>
                <p>Company: ${company}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Category: ${category}</p>
                <p>Message: ${message}</p>
            `,
        };
    
        try {
            await transporter.sendMail(mailOptions);
            return {
                status: 200,
                body: { success: true },
            };
        } catch (error) {
            return {
                status: 500,
                body: { success: false, message: error.message },
            };
        }
    }
}

