import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { FILE_RE, MIME_BY_EXT, UPLOAD_DIR } from '../../lib/uploads';

export const GET: APIRoute = ({ params }) => {
	const name = params.file ?? '';
	const p = join(UPLOAD_DIR, name);
	if (!FILE_RE.test(name) || !existsSync(p)) return new Response(null, { status: 404 });
	return new Response(readFileSync(p), {
		headers: {
			'Content-Type': MIME_BY_EXT[name.split('.').pop()!],
			'Cache-Control': 'public, max-age=31536000, immutable',
			'X-Content-Type-Options': 'nosniff',
		},
	});
};
