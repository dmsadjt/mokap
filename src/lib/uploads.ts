import { mkdirSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';

export const UPLOAD_DIR = join('data', 'uploads');
export const MAX_BYTES = 5 * 1024 * 1024;

// SVG is intentionally excluded: it can carry scripts.
export const TYPES: Record<string, string> = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/webp': 'webp',
	'image/gif': 'gif',
};
export const MIME_BY_EXT: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' };
export const FILE_RE = /^[a-f0-9-]{36}\.(png|jpg|webp|gif)$/;

export async function saveUpload(file: File): Promise<{ path?: string; error?: string }> {
	const ext = TYPES[file.type];
	if (!ext) return { error: 'Image must be PNG, JPG, WebP or GIF.' };
	if (file.size > MAX_BYTES) return { error: 'Image must be 5 MB or smaller.' };
	mkdirSync(UPLOAD_DIR, { recursive: true });
	const name = `${randomUUID()}.${ext}`;
	writeFileSync(join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
	return { path: `/uploads/${name}` };
}

export function deleteUpload(path: unknown) {
	if (typeof path !== 'string' || !path.startsWith('/uploads/')) return;
	const name = path.slice('/uploads/'.length);
	if (!FILE_RE.test(name)) return;
	const p = join(UPLOAD_DIR, name);
	if (existsSync(p)) unlinkSync(p);
}
