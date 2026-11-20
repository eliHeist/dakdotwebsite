import { frames } from '../frames';
import { INDUSTRIES, TAGS } from '../projects';

export default {
	title: 'Mechbrif Auto',
	slug: 'mechbrifauto',
	client: 'Mechbrif Auto Ltd',
	tags: [TAGS.website],
	industry: INDUSTRIES.automotive,
	link: { label: 'mechbrifauto.com', url: 'https://www.mechbrifauto.com' },
	summary:
		'A bold, dark website for a Kampala garage that diagnoses before it repairs, with online mechanic booking.',
	thumb: { type: 'image', src: '/projects/mechbrifauto/cover.jpg' },
	splash: { type: 'image', fill: true, src: '/projects/mechbrifauto/hero.jpg' },
	mediaPath: '/projects/mechbrifauto/',
	overview: `Mechbrif Auto is a garage in Namugongo, Kampala, built on a simple frustration with garages that guess, overcharge and explain nothing. They scan every car with Autel diagnostic equipment before touching it and hand over a written report after. The site needed to carry that confidence: a black, workshop-grade look, tall condensed type, a single signal red, and a booking form that works as well at the roadside as at a desk.`,
	sections: [
		{
			type: 'list',
			title: 'What we built',
			list_items: [
				`<strong>“Your car deserves surety.”</strong> A headline over a strip of real workshop footage, with “Book a service” as the first thing you can do.`,
				`<strong>Proof up front.</strong> Vehicles serviced, years operating and digital reports for every job, followed by why diagnosis comes first.`,
				`<strong>Full-spectrum services.</strong> Computerised diagnosis, engine work, suspension and steering, general repair, road rescue and panel beating, each with what’s included and a direct booking link.`,
				`<strong>Booking without a phone call.</strong> Choose the garage or an on-site visit, the vehicle and the service (or “not sure, run a diagnosis”), and the team confirms on WhatsApp within the hour.`
			]
		},
		{ type: 'images', cols: 1, images: frames('d-home', 8) },
		{ type: 'images', cols: 3, images: [...frames('m-home', 6), 'm-menu.jpg'] },
		{
			type: 'images',
			cols: 1,
			images: [...frames('d-services', 4), ...frames('d-about', 3), ...frames('d-book', 2)]
		},
		{
			type: 'images',
			cols: 3,
			images: [...frames('m-services', 2), ...frames('m-about', 2), ...frames('m-book', 2)]
		}
	]
};
