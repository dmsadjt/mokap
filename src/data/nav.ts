import type { UiKey } from '../i18n/ui';

export interface NavItem {
	labelKey: UiKey;
	href: string;
	children?: { labelKey: UiKey; href: string }[];
}

export const navItems: NavItem[] = [
	{ labelKey: 'nav.home', href: '/' },
	{ labelKey: 'nav.about', href: '/about' },
	{ labelKey: 'nav.products', href: '/products' },
	{ labelKey: 'nav.services', href: '/services' },
	{ labelKey: 'nav.articles', href: '/articles' },
	{ labelKey: 'nav.certificates', href: '/certificates' },
	{ labelKey: 'nav.contact', href: '/contact' },
];
