/** Response shapes are not in the published OpenAPI; normalize common patterns. */
export function normalizeArticlesList(json: unknown): Record<string, unknown>[] {
	if (Array.isArray(json)) return json as Record<string, unknown>[];
	if (json && typeof json === 'object') {
		const o = json as Record<string, unknown>;
		if (Array.isArray(o.data)) return o.data as Record<string, unknown>[];
		if (Array.isArray(o.articles)) return o.articles as Record<string, unknown>[];
		if (Array.isArray(o.items)) return o.items as Record<string, unknown>[];
	}
	return [];
}

export function articleTitle(a: Record<string, unknown>): string {
	const t = a.title ?? a.name;
	return typeof t === 'string' ? t : 'Untitled';
}

export function articleSlug(a: Record<string, unknown>): string {
	const s = a.slug ?? a.article_slug;
	return typeof s === 'string' ? s : String(a.id ?? '');
}
