import { frames } from '../frames';
import { INDUSTRIES, TAGS } from '../projects';

export default {
	title: "Kamy's Delights",
	slug: 'kamysdelights',
	client: "Kamy's Delights",
	tags: [TAGS.website],
	industry: INDUSTRIES.facilitymgt,
	link: { label: 'kamysdelights.com', url: 'https://www.kamysdelights.com' },
	summary:
		'One website for three businesses: cleaning, laundry and catering in Kampala, each with its own page and a WhatsApp quote one tap away.',
	thumb: { type: 'image', src: '/projects/kamysdelights/cover.jpg' },
	splash: { type: 'image', fill: true, src: '/projects/kamysdelights/hero.jpg' },
	mediaPath: '/projects/kamysdelights/',
	overview: `Kamy's Delights keeps homes, offices and factories clean, collects and returns laundry for free, and caters weddings, parties and corporate events with cakes baked to order. The challenge was to present three quite different services as one trustworthy company, and to turn visits into WhatsApp conversations, which is how their customers actually book.`,
	sections: [
		{
			type: 'list',
			title: 'What we built',
			list_items: [
				`<strong>One promise, three services.</strong> “Clean spaces, fresh linen & delightful food.” A soft, warm hero puts all three side by side, with opening hours, both offices and free laundry pick-up right under the headline.`,
				`<strong>A page for each line of business.</strong> Cleaning (with residential, commercial, industrial and specialised sub-pages), laundry and dry cleaning, and catering and bakery, each with its own process, FAQs and call to action.`,
				`<strong>WhatsApp first.</strong> “Get a quote on WhatsApp” is the primary action everywhere, with a floating chat button and a call option as backup.`,
				`<strong>Privacy-respecting analytics.</strong> Microsoft Clarity loads only after the visitor accepts, through a consent banner that links to the privacy policy.`
			]
		},
		{ type: 'images', cols: 1, images: frames('d-home', 8) },
		{ type: 'images', cols: 3, images: [...frames('m-home', 6), 'm-menu.jpg'] },
		{
			type: 'images',
			cols: 1,
			images: [...frames('d-cleaning', 4), ...frames('d-laundry', 3), ...frames('d-catering', 3)]
		},
		{
			type: 'images',
			cols: 3,
			images: [...frames('m-cleaning', 2), ...frames('m-laundry', 2), ...frames('m-catering', 2)]
		},
		{ type: 'images', cols: 1, images: [...frames('d-about', 3), ...frames('d-contact', 2)] },
		{ type: 'images', cols: 3, images: ['m-about-01.jpg', 'm-contact-01.jpg'] }
	]
};
