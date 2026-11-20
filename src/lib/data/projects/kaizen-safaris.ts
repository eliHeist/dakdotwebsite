import { frames } from '../frames';
import { INDUSTRIES, TAGS } from '../projects';

export default {
	title: 'Kaizen Safaris',
	slug: 'kaizen-safaris',
	client: 'Kaizen Safaris',
	tags: [TAGS.website, TAGS.webapp],
	industry: INDUSTRIES.travel,
	link: { label: 'kaizen-safaris.com', url: 'https://kaizen-safaris.com' },
	summary:
		'A full redesign of a Ugandan safari operator’s website, with online seat reservations and an admin panel that runs every tour, departure and enquiry.',
	thumb: { type: 'image', src: '/projects/kaizen-safaris/cover.jpg' },
	splash: { type: 'image', fill: true, src: '/projects/kaizen-safaris/hero.jpg' },
	mediaPath: '/projects/kaizen-safaris/',
	overview: `Kaizen Safaris is a Uganda-based tour operator running gorilla treks, wildlife safaris, honeymoons and tailor-made trips across Uganda, Kenya, Tanzania and Rwanda. They came to us for a full redesign: a site that sells the experience the moment it loads, lets travellers find and reserve a trip on their own, and that the team can run day to day without a developer.`,
	sections: [
		{
			type: 'list',
			title: 'What we built',
			list_items: [
				`<strong>A cinematic first impression.</strong> A full-screen “Into the Wild” video hero with a trip finder underneath: pick a destination, a trip style and flexible or scheduled dates, and go.`,
				`<strong>Tours that explain themselves.</strong> Every itinerary page has an overview, a day-by-day plan with accommodation for each night, dates and prices, what’s included and not, reviews, related reading and similar trips.`,
				`<strong>Group departures and online reservations.</strong> Fixed-date departures show live seats left, booking deadlines and a “guaranteed to run” status. Travellers reserve a seat in two minutes with no payment up front; the team confirms and sends mobile-money or bank details.`,
				`<strong>Two currencies.</strong> A USD / UGX toggle in the header switches every price on the site.`,
				`<strong>Destinations and places.</strong> Country guides for Uganda, Kenya, Tanzania and Rwanda, each with best time to visit, places to see, trips and travel guides, plus a page for every park and highlight.`,
				`<strong>Everything else a safari business needs.</strong> A tailor-made trip planner, car and camping-gear hire with its own enquiry form, a blog with categories and authors, a photo and video gallery, and WhatsApp a tap away on every page.`
			]
		},
		{ type: 'images', cols: 1, images: frames('d-home', 9) },
		{ type: 'images', cols: 3, images: [...frames('m-home', 6), 'm-menu.jpg'] },
		{
			type: 'paragraph',
			title: 'Finding and booking a trip',
			body: `Tours can be filtered by destination, trip style and itinerary type, or limited to trips with group dates, and sorted by price or length. Each tour page breaks the trip down day by day, then hands off to either a quote request or, for scheduled departures, a reservation form with the dates, seats left and an estimated total alongside.`
		},
		{
			type: 'images',
			cols: 1,
			images: [
				...frames('d-tours', 3),
				...frames('d-tour', 6),
				...frames('d-departures', 3),
				...frames('d-reserve', 2)
			]
		},
		{
			type: 'images',
			cols: 3,
			images: [
				...frames('m-tours', 2),
				...frames('m-tour', 4),
				...frames('m-departures', 2),
				...frames('m-reserve', 2)
			]
		},
		{
			type: 'paragraph',
			title: 'Destinations, planning and hire',
			body: `Destination guides link countries, places and trips together, so a traveller reading about Bwindi is one click from a gorilla itinerary. The trip planner gathers where, what, when, group size and budget in one short form, and the rentals page lists safari vehicles and camping gear with daily rates.`
		},
		{
			type: 'images',
			cols: 1,
			images: [
				...frames('d-destination', 4),
				...frames('d-place', 3),
				...frames('d-plan', 2),
				...frames('d-rentals', 3),
				...frames('d-blog', 2),
				...frames('d-post', 2),
				...frames('d-gallery', 2)
			]
		},
		{
			type: 'images',
			cols: 3,
			images: [
				...frames('m-destination', 2),
				...frames('m-plan', 2),
				...frames('m-rentals', 2),
				'm-blog-01.jpg',
				'm-post-01.jpg',
				'm-gallery-01.jpg'
			]
		},
		{
			type: 'paragraph',
			title: 'The admin panel',
			body: `Behind the site is a custom admin where the team manages the whole business: itineraries (with tabs for general details, destinations and styles, length and price, publishing, search engine settings, departures and a day-by-day editor), departures with seat counts and status, reservations and enquiries filtered by type and status, notification recipients, destinations, places and trip styles, the blog, rental items, the gallery, reviews and site-wide settings like contact details and social links.`
		},
		{
			type: 'images',
			cols: 1,
			images: [
				'a-dashboard.jpg',
				'a-itineraries.jpg',
				'a-itinerary-edit.jpg',
				'a-itinerary-edit-full.jpg'
			]
		},
		{
			type: 'images',
			cols: 2,
			images: [
				'a-departures.jpg',
				'a-departure-edit.jpg',
				'a-destination-edit.jpg',
				'a-places.jpg',
				'a-rental-items.jpg',
				'a-gallery-photos.jpg',
				'a-reviews.jpg',
				'a-enquiries.jpg',
				'a-site-settings.jpg'
			]
		},
		{ type: 'images', cols: 3, images: ['am-dashboard.jpg', 'am-itinerary-edit.jpg'] }
	]
};
