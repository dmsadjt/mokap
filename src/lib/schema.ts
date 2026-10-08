import type { Kind } from './db';

export type FieldType = 'text' | 'textarea' | 'lines' | 'json' | 'date' | 'image';
export interface Field {
	name: string;
	label: string;
	type: FieldType;
	required?: boolean;
	help?: string;
}
export interface KindConfig {
	kind: Kind;
	label: string;
	singular: string;
	titleField: string;
	columns: string[];
	fields: Field[];
}

const slugField: Field = { name: 'slug', label: 'Slug (URL)', type: 'text', required: true };

export const kinds: Record<Kind, KindConfig> = {
	articles: {
		kind: 'articles',
		label: 'Articles',
		singular: 'Article',
		titleField: 'title',
		columns: ['title', 'category', 'author', 'date'],
		fields: [
			{ name: 'title', label: 'Title', type: 'text', required: true },
			slugField,
			{ name: 'category', label: 'Category', type: 'text' },
			{ name: 'author', label: 'Author', type: 'text' },
			{ name: 'date', label: 'Date', type: 'date' },
			{ name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
			{ name: 'body', label: 'Body', type: 'textarea', help: 'Separate paragraphs with a blank line' },
			{ name: 'image', label: 'Cover image', type: 'image' },
		],
	},
	products: {
		kind: 'products',
		label: 'Products',
		singular: 'Product',
		titleField: 'name',
		columns: ['name', 'slug', 'price'],
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true },
			slugField,
			{ name: 'summary', label: 'Summary', type: 'textarea', required: true },
			{ name: 'description', label: 'Description', type: 'textarea' },
			{ name: 'price', label: 'Price', type: 'text', help: 'Free text, e.g. "From $99" or "Contact us"' },
			{ name: 'features', label: 'Features', type: 'lines', help: 'One per line' },
			{ name: 'image', label: 'Image', type: 'image' },
		],
	},
	services: {
		kind: 'services',
		label: 'Services',
		singular: 'Service',
		titleField: 'name',
		columns: ['name', 'slug', 'summary'],
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true },
			slugField,
			{ name: 'summary', label: 'Summary', type: 'textarea', required: true },
			{ name: 'body', label: 'Body', type: 'textarea' },
			{ name: 'bullets', label: 'Bullets', type: 'lines', help: 'One per line' },
			{ name: 'image', label: 'Image', type: 'image' },
		],
	},
	certificates: {
		kind: 'certificates',
		label: 'Certificates',
		singular: 'Certificate',
		titleField: 'name',
		columns: ['name', 'issuer', 'issuedDate', 'expiryDate'],
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true },
			{ name: 'issuer', label: 'Issued by', type: 'text' },
			{ name: 'credentialId', label: 'Certificate / credential ID', type: 'text' },
			{ name: 'issuedDate', label: 'Issued date', type: 'date' },
			{ name: 'expiryDate', label: 'Expiry date', type: 'date', help: 'Leave empty if it does not expire' },
			{ name: 'description', label: 'Description', type: 'textarea' },
			{ name: 'image', label: 'Certificate image', type: 'image' },
		],
	},
};

export function parseForm(cfg: KindConfig, form: FormData): { data: Record<string, unknown>; errors: string[] } {
	const data: Record<string, unknown> = {};
	const errors: string[] = [];
	for (const f of cfg.fields) {
		const raw = String(form.get(f.name) ?? '').trim();
		if (f.required && !raw) errors.push(`${f.label} is required`);
		if (!raw) continue;
		if (f.type === 'lines') {
			data[f.name] = raw
				.split(/\r?\n/)
				.map((s) => s.trim())
				.filter(Boolean);
		} else if (f.type === 'json') {
			try {
				data[f.name] = JSON.parse(raw);
			} catch {
				errors.push(`${f.label}: invalid JSON`);
			}
		} else data[f.name] = raw;
	}
	return { data, errors };
}

export function fieldValue(f: Field, v: unknown): string {
	if (v == null) return '';
	if (f.type === 'lines') return Array.isArray(v) ? v.join('\n') : String(v);
	if (f.type === 'json') return typeof v === 'string' ? v : JSON.stringify(v, null, 2);
	return String(v);
}
