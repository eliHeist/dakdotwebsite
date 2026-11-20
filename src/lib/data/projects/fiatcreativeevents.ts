import { frames } from '../frames';
import { INDUSTRIES, TAGS } from '../projects';

export default {
	title: 'FIAT Creative Events',
	slug: 'fiatcreativeevents',
	client: 'FIAT Creative Events Company Limited',
	tags: [TAGS.website],
	industry: INDUSTRIES.events,
	link: { label: 'fiatcreativeevents.com', url: 'https://www.fiatcreativeevents.com' },
	summary: 'A warm, editorial website for a Kampala event production and brand activation agency.',
	thumb: { type: 'image', src: '/projects/fiatcreativeevents/cover.jpg' },
	splash: { type: 'image', fill: true, src: '/projects/fiatcreativeevents/hero.jpg' },
	mediaPath: '/projects/fiatcreativeevents/',
	overview: `FIAT Creative Events started in environmental branding and grew into full event production: corporate conferences, product launches, galas, set design and brand activations. Their line is “Branding is culture, we bring it to life”, so the site had to feel like one of their events: big stage imagery, a confident serif-and-sans headline, and a calm cream canvas that lets the photography carry the energy.`,
	sections: [
		{
			type: 'list',
			title: 'What we built',
			list_items: [
				`<strong>A stage-set hero.</strong> A rounded, full-width image of a finished conference set with the brand line laid over it and two clear next steps.`,
				`<strong>Four disciplines, one house.</strong> Corporate events, executive business gatherings, end-to-end production and specialised or hybrid formats, each a large image card that leads into the full services list.`,
				`<strong>Personality in the copy.</strong> “Fun to work with. Painfully reliable.” runs through a set of principles, from punctuality to hospitality, that set FIAT apart from a typical events vendor.`,
				`<strong>A short path to a conversation.</strong> “Talk to us” is always in the header, and the contact page puts phone, email, studio and hours beside the form.`
			]
		},
		{ type: 'images', cols: 1, images: frames('d-home', 7) },
		{ type: 'images', cols: 3, images: frames('m-home', 6) },
		{
			type: 'images',
			cols: 1,
			images: [...frames('d-services', 4), ...frames('d-about', 4), ...frames('d-contact', 2)]
		},
		{
			type: 'images',
			cols: 3,
			images: [...frames('m-services', 2), ...frames('m-about', 2), 'm-contact-01.jpg']
		}
	]
};
