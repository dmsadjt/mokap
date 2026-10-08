export interface Article {
	title: string;
	slug: string;
	excerpt: string;
	body: string;
	author: string;
	date: string;
	category: string;
	image: string;
}

// Placeholder sample data. Separate paragraphs in `body` with a blank line.
export const articles: Article[] = [
	{ title: 'Welcome to our new website', slug: 'welcome-to-our-new-website', excerpt: 'A quick tour of what you can find here: products, services, certifications and company news.', body: 'We are happy to launch our new website.\n\nBrowse our products and services, check our certifications, and follow this page for company news and tips.', author: 'Editorial Team', date: '2025-01-10', category: 'News', image: '' },
	{ title: 'How to choose the right product for your needs', slug: 'how-to-choose-the-right-product', excerpt: 'Three questions to ask before you buy.', body: 'Choosing well starts with knowing your requirements.\n\nFirst, define the problem you want to solve. Second, compare the specifications that matter to you. Third, check the warranty and support that come with it.', author: 'Sample Author', date: '2025-02-03', category: 'Guides', image: '' },
	{ title: 'We are now ISO certified', slug: 'we-are-now-iso-certified', excerpt: 'Our quality management system has been independently certified.', body: 'We are proud to announce that our quality management system has been certified.\n\nThis reflects our ongoing commitment to consistent quality and continuous improvement.', author: 'Editorial Team', date: '2025-03-21', category: 'News', image: '' },
	{ title: 'Maintenance tips to extend product life', slug: 'maintenance-tips', excerpt: 'Simple habits that keep your equipment running longer.', body: 'Regular care makes a big difference.\n\nClean your equipment on a schedule, store it properly, and have it inspected at least once a year.', author: 'Sample Author', date: '2025-04-14', category: 'Guides', image: '' },
];
