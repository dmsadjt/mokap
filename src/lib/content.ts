import { listItems } from './db';
import type { Article } from '../data/articles';
import type { Product } from '../data/products';
import type { Service } from '../data/services';
import type { Certificate } from '../data/certificates';

// Public pages read through these so admin edits show up immediately.
// Articles come back newest first; everything else in the order it was added.
export const getArticles = () => listItems<Article>('articles').sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
export const getProducts = () => listItems<Product>('products');
export const getServices = () => listItems<Service>('services');
export const getCertificates = () => listItems<Certificate>('certificates');

// Case-insensitive match of a search term against any field of a record.
export const matches = (item: object, q: string) => !q || JSON.stringify(Object.values(item)).toLowerCase().includes(q.toLowerCase());
