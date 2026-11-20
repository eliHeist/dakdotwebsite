import { frames } from '../frames';
import { INDUSTRIES, TAGS } from '../projects';

export default {
	title: 'Enchen Creative Hub',
	slug: 'enchencreative',
	client: 'Enchen Creative Hub',
	tags: [TAGS.website],
	industry: INDUSTRIES.architecture,
	link: { label: 'enchencreative.com', url: 'https://enchencreative.com' },
	summary:
		'A portfolio-led website for a Kampala architectural and interior design studio, built to win commercial fit-out work.',
	thumb: { type: 'image', src: '/projects/enchencreative/cover.jpg' },
	splash: { type: 'image', fill: true, src: '/projects/enchencreative/hero.jpg' },
	mediaPath: '/projects/enchencreative/',
	overview: `Enchen Creative Hub is a Kampala-based architectural and interior design studio that takes commercial and residential spaces from first sketch to handover. Their work is the pitch, so the site leads with it: full-bleed renders of finished offices, banks and residences, framed by a dark, gallery-like layout with a single magenta accent.`,
	sections: [
		{
			type: 'list',
			title: 'What we built',
			list_items: [
				`<strong>A project slideshow as the hero.</strong> The homepage opens on full-screen renders of recent work, NITA, Wilken Telecom, Padre Pio Insurance and Finance Trust Bank, each linking straight to its project page.`,
				`<strong>A filterable portfolio.</strong> Corporate, commercial and residential projects, each with its own page of imagery.`,
				`<strong>Services in depth.</strong> Office design and branding, project management and consultancy, 3D visualisation, commercial spaces and company branding, with an FAQ to answer questions before the first call.`,
				`<strong>The studio and its process.</strong> An about page that walks through six steps, from discovery and concept to procurement, execution and handover.`
			]
		},
		{ type: 'images', cols: 1, images: frames('d-home', 9) },
		{ type: 'images', cols: 3, images: [...frames('m-home', 6), 'm-menu.jpg'] },
		{
			type: 'images',
			cols: 1,
			images: [...frames('d-portfolio', 3), ...frames('d-project', 4)]
		},
		{ type: 'images', cols: 3, images: [...frames('m-portfolio', 2), ...frames('m-project', 2)] },
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
