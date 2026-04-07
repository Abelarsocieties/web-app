export function extractNonce(json: unknown): string | null {
	if (!json || typeof json !== 'object') return null;
	const o = json as Record<string, unknown>;
	const keys = ['nonce_key', 'nonce', 'nonceKey'];
	for (const k of keys) {
		if (typeof o[k] === 'string') return o[k] as string;
	}
	if (o.data && typeof o.data === 'object') {
		const d = o.data as Record<string, unknown>;
		for (const k of keys) {
			if (typeof d[k] === 'string') return d[k] as string;
		}
	}
	return null;
}

export function extractAccessToken(json: unknown): string | null {
	if (!json || typeof json !== 'object') return null;
	const o = json as Record<string, unknown>;
	const keys = ['access_token', 'token', 'accessToken'];
	for (const k of keys) {
		if (typeof o[k] === 'string') return o[k] as string;
	}
	if (o.data && typeof o.data === 'object') {
		const d = o.data as Record<string, unknown>;
		for (const k of keys) {
			if (typeof d[k] === 'string') return d[k] as string;
		}
	}
	return null;
}
