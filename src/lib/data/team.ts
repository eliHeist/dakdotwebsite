export type Person = {
	id: 'oscar' | 'martin' | 'bruce' | 'elijah';
	name: string;
	role: string;
	image: string;
	bio: string;
	linkedin?: string;
};

export const TEAM: Record<Person['id'], Person> = {
	elijah: {
		id: 'elijah',
		name: 'Elijah Triumph Angengeun',
		role: 'Chief Technology Officer',
		image: '/images/team/elijah-dd.webp',
		bio: 'The Architect: transforms ideas into high-performance digital systems.',
		linkedin: 'https://www.linkedin.com/in/elijahtriumph/'
	},
	martin: {
		id: 'martin',
		name: 'Allan Martin Ssebaggala',
		role: 'Art Director',
		image: '/images/team/martin-dd.webp',
		bio: 'The Stylist: crafting the visual soul of every project through design and intentional aesthetic direction.',
		linkedin: 'https://www.linkedin.com/in/a-martin-ssebaggala-a99a8a286/'
	},
	oscar: {
		id: 'oscar',
		name: 'Oscar Kayima',
		role: 'CGI Director',
		image: '/images/team/oscar-dd.webp',
		bio: 'The Visionary: turning concepts into photorealistic 3D assets and environments.',
		linkedin: 'https://www.linkedin.com/in/kayima-oscar-0aa78023a/'
	},
	bruce: {
		id: 'bruce',
		name: 'Acuty Bruce Byereta',
		role: 'Content Lead',
		image: '/images/team/bruce-dd.webp',
		bio: 'The Storyteller: weaving compelling narratives that connect with audiences and bring our projects to life.'
	}
};

export const TEAM_ORDER: Person['id'][] = ['oscar', 'martin', 'bruce', 'elijah'];
