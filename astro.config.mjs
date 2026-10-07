// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	i18n: {
		locales: ['en', 'id'],
		defaultLocale: 'en',
		routing: { prefixDefaultLocale: false },
	},
	build: { inlineStylesheets: 'always' },
});
