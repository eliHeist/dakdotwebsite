/** Studio contact details, used by the header, booking section and footer. */
export const CONTACT = {
	phoneDisplay: '+256 769 345 389',
	phoneHref: 'tel:+256769345389',
	email: 'connect@dakdot.com',
	/**
	 * WhatsApp number in international format, digits only.
	 * TODO(client): confirm this is the WhatsApp line; it currently reuses the studio phone.
	 */
	whatsapp: '256769345389',
	whatsappMessage: "Hi Dakdot, I'd like to talk about a project."
};

export const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
	CONTACT.whatsappMessage
)}`;

export const SOCIALS = [
	{ name: 'LinkedIn', href: 'https://www.linkedin.com/company/dakdotcreations/' },
	{ name: 'Instagram', href: 'https://www.instagram.com/dakdotcreations/' },
	{ name: 'X', href: 'https://x.com/dakdotcreations' }
];
