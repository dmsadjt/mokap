import type { Kind } from './db';

export type FieldType = 'text' | 'textarea' | 'lines' | 'json' | 'date';
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
	projects: {
		kind: 'projects',
		label: 'Projects',
		singular: 'Project',
		titleField: 'title',
		columns: ['projectId', 'title', 'customer', 'type', 'date'],
		fields: [
			{ name: 'title', label: 'Title', type: 'text', required: true },
			slugField,
			{ name: 'projectId', label: 'Project ID', type: 'text' },
			{ name: 'date', label: 'Date', type: 'date' },
			{ name: 'customer', label: 'Customer', type: 'text' },
			{ name: 'type', label: 'Type (e.g. STHE, ACHE)', type: 'text' },
			{ name: 'equipmentName', label: 'Equipment name', type: 'text' },
			{ name: 'scopeOfWork', label: 'Scope of work', type: 'text' },
			{ name: 'weightKgs', label: 'Weight (kg)', type: 'text' },
			{ name: 'yearBuilt', label: 'Year built', type: 'text' },
			{ name: 'material', label: 'Material', type: 'text' },
			{ name: 'codeStd', label: 'Code / standard', type: 'text' },
			{ name: 'image', label: 'Image path', type: 'text', help: 'e.g. /placeholder.svg' },
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
			{ name: 'caseStudies', label: 'Case studies (JSON)', type: 'json' },
			{ name: 'brochures', label: 'Brochures (JSON)', type: 'json', help: '[{"label":"...","href":"..."}]' },
		],
	},
	solutions: {
		kind: 'solutions',
		label: 'Solutions',
		singular: 'Solution',
		titleField: 'name',
		columns: ['name', 'slug', 'summary'],
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true },
			slugField,
			{ name: 'summary', label: 'Summary', type: 'textarea', required: true },
			{ name: 'description', label: 'Description', type: 'textarea' },
			{ name: 'products', label: 'Products', type: 'lines', help: 'One per line' },
			{ name: 'caseStudies', label: 'Case studies (JSON)', type: 'json' },
		],
	},
	clients: {
		kind: 'clients',
		label: 'Clients',
		singular: 'Client',
		titleField: 'name',
		columns: ['name', 'logo'],
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true },
			{ name: 'logo', label: 'Logo path', type: 'text', help: 'e.g. /placeholder.svg' },
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
	// project records expect every string field to be present
	if (cfg.kind === 'projects') for (const f of cfg.fields) if (data[f.name] === undefined) data[f.name] = '';
	return { data, errors };
}

export function fieldValue(f: Field, v: unknown): string {
	if (v == null) return '';
	if (f.type === 'lines') return Array.isArray(v) ? v.join('\n') : String(v);
	if (f.type === 'json') return typeof v === 'string' ? v : JSON.stringify(v, null, 2);
	return String(v);
}
