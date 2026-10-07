import type { APIRoute } from 'astro';
import { logout } from '../../lib/auth';

export const POST: APIRoute = ({ cookies, redirect }) => {
	logout(cookies);
	return redirect('/admin/login');
};
