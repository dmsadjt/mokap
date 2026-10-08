import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { articles } from '../data/articles';
import { products } from '../data/products';
import { services } from '../data/services';
import { certificates } from '../data/certificates';

export type Kind = 'articles' | 'products' | 'services' | 'certificates';

mkdirSync('data', { recursive: true });
export const db = new DatabaseSync('data/app.db');

db.exec(`
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS items_kind ON items(kind);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, email TEXT, phone TEXT, message TEXT,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
`);

export function hashPassword(pw: string) {
	const salt = randomBytes(16).toString('hex');
	return `${salt}:${scryptSync(pw, salt, 32).toString('hex')}`;
}
export function verifyPassword(pw: string, stored: string) {
	const [salt, hash] = stored.split(':');
	const a = Buffer.from(hash, 'hex');
	const b = scryptSync(pw, salt, 32);
	return a.length === b.length && timingSafeEqual(a, b);
}

// ---- seed on first run ----
function seed(kind: Kind, rows: unknown[]) {
	const n = (db.prepare('SELECT COUNT(*) c FROM items WHERE kind=?').get(kind) as { c: number }).c;
	if (n > 0) return;
	const ins = db.prepare('INSERT INTO items (kind, json) VALUES (?, ?)');
	db.exec('BEGIN');
	for (const r of rows) ins.run(kind, JSON.stringify(r));
	db.exec('COMMIT');
}
seed('articles', articles);
seed('products', products);
seed('services', services);
seed('certificates', certificates);

if (!(db.prepare('SELECT COUNT(*) c FROM users').get() as { c: number }).c) {
	// Mockup-only default credentials.
	db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('admin', hashPassword('admin123'));
}
if (!(db.prepare('SELECT COUNT(*) c FROM messages').get() as { c: number }).c) {
	db.prepare('INSERT INTO messages (name,email,phone,message) VALUES (?,?,?,?)').run(
		'Budi Santoso', 'budi@example.com', '+62 812 0000 0000',
		'Hello, could you send me a quotation for the Professional Package? Thank you.',
	);
}

// ---- generic item access ----
export type Row<T> = T & { _id: number };

export function listItems<T = any>(kind: Kind): Row<T>[] {
	const rows = db.prepare('SELECT id, json FROM items WHERE kind=? ORDER BY id').all(kind) as { id: number; json: string }[];
	return rows.map((r) => ({ ...JSON.parse(r.json), _id: r.id }));
}
export function getItem<T = any>(kind: Kind, id: number): Row<T> | undefined {
	const r = db.prepare('SELECT id, json FROM items WHERE kind=? AND id=?').get(kind, id) as { id: number; json: string } | undefined;
	return r ? { ...JSON.parse(r.json), _id: r.id } : undefined;
}
export function saveItem(kind: Kind, id: number | null, data: object): number {
	const { _id, ...clean } = data as any;
	if (id) {
		db.prepare('UPDATE items SET json=? WHERE kind=? AND id=?').run(JSON.stringify(clean), kind, id);
		return id;
	}
	const res = db.prepare('INSERT INTO items (kind, json) VALUES (?, ?)').run(kind, JSON.stringify(clean));
	return Number(res.lastInsertRowid);
}
export function deleteItem(kind: Kind, id: number) {
	db.prepare('DELETE FROM items WHERE kind=? AND id=?').run(kind, id);
}
