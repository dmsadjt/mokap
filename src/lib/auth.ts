import type { AstroCookies } from 'astro';
import { randomBytes } from 'node:crypto';
import { db, verifyPassword } from './db';

const COOKIE = 'admin_session';
const TTL = 60 * 60 * 8;

export function login(cookies: AstroCookies, username: string, password: string): boolean {
	const u = db.prepare('SELECT id, password_hash FROM users WHERE username=?').get(username) as
		| { id: number; password_hash: string }
		| undefined;
	if (!u || !verifyPassword(password, u.password_hash)) return false;
	const token = randomBytes(32).toString('hex');
	db.prepare('INSERT INTO sessions (token,user_id,expires_at) VALUES (?,?,?)').run(
		token, u.id, Math.floor(Date.now() / 1000) + TTL,
	);
	cookies.set(COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: TTL });
	return true;
}

export function currentUser(cookies: AstroCookies): string | null {
	const token = cookies.get(COOKIE)?.value;
	if (!token) return null;
	const r = db
		.prepare('SELECT u.username, s.expires_at FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=?')
		.get(token) as { username: string; expires_at: number } | undefined;
	if (!r || r.expires_at < Date.now() / 1000) return null;
	return r.username;
}

export function logout(cookies: AstroCookies) {
	const token = cookies.get(COOKIE)?.value;
	if (token) db.prepare('DELETE FROM sessions WHERE token=?').run(token);
	cookies.delete(COOKIE, { path: '/' });
}
