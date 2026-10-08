export interface Product {
	name: string;
	slug: string;
	summary: string;
	description: string;
	price: string;
	features: string[];
	image: string;
}

// Placeholder sample data.
export const products: Product[] = [
	{ name: 'Starter Package', slug: 'starter-package', summary: 'Everything you need to get going.', description: 'A balanced entry-level option with the essentials included and full support.', price: 'From $99', features: ['Standard specification', '12-month warranty', 'Email support'], image: '' },
	{ name: 'Professional Package', slug: 'professional-package', summary: 'More capacity and options for growing needs.', description: 'Our most popular option, with extended capabilities and priority support.', price: 'From $249', features: ['Extended specification', '24-month warranty', 'Priority support', 'Free delivery'], image: '' },
	{ name: 'Enterprise Package', slug: 'enterprise-package', summary: 'Custom solutions for large operations.', description: 'Tailored to your requirements, with dedicated account management.', price: 'Contact us', features: ['Custom specification', 'Dedicated account manager', 'On-site support'], image: '' },
];
