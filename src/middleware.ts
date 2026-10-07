import { defineMiddleware } from 'astro:middleware';
import { currentUser } from './lib/auth';

export const onRequest = defineMiddleware(async (ctx, next) => {
	const p = ctx.url.pathname;
	if (p.startsWith('/admin') && p !== '/admin/login') {
		const user = currentUser(ctx.cookies);
		if (!user) return ctx.redirect('/admin/login');
		ctx.locals.user = user;
	}
	return next();
});
