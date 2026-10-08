import { ui } from '../i18n/ui';

// Pages live under src/pages/[...lang]/, so `lang` is empty for English or a locale code.
// Any other value is not a real route.
export function badLang(lang: string | undefined) {
	return lang !== undefined && !Object.hasOwn(ui, lang);
}
