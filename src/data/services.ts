export interface Service {
	name: string;
	slug: string;
	summary: string;
	body: string;
	bullets: string[];
	image: string;
}

// Placeholder sample data.
export const services: Service[] = [
	{ name: 'Consulting', slug: 'consulting', summary: 'Expert advice tailored to your situation.', body: 'We assess your needs and recommend practical, cost-effective options.', bullets: ['Needs assessment', 'Recommendations and planning', 'Ongoing advice'], image: '' },
	{ name: 'Installation', slug: 'installation', summary: 'Professional setup by experienced technicians.', body: 'Our team installs and commissions your purchase so it works from day one.', bullets: ['On-site installation', 'Testing and commissioning', 'Handover and training'], image: '' },
	{ name: 'Maintenance and Support', slug: 'maintenance-and-support', summary: 'Keep everything running smoothly.', body: 'Scheduled maintenance plans and responsive support when you need it.', bullets: ['Scheduled maintenance', 'Repairs', 'Helpdesk support'], image: '' },
];
