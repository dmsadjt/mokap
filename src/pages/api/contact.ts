import type { APIRoute } from 'astro';
import { db } from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
	let body: Record<string, string> = {};
	try {
		body = await request.json();
	} catch {
		return Response.json({ success: false, message: 'Invalid request' }, { status: 400 });
	}
	const { name, email, phone = '', message, botcheck } = body;
	if (botcheck) return Response.json({ success: true }); // honeypot
	if (!name?.trim() || !email?.trim() || !message?.trim()) {
		return Response.json({ success: false, message: 'Missing fields' }, { status: 400 });
	}
	db.prepare('INSERT INTO messages (name,email,phone,message) VALUES (?,?,?,?)').run(
		name.trim().slice(0, 200),
		email.trim().slice(0, 200),
		String(phone).slice(0, 50),
		message.trim().slice(0, 5000),
	);
	return Response.json({ success: true });
};
