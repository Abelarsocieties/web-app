import { PUBLIC_ABELAR_API_URL } from '$env/static/public';

export function getApiBaseUrl(): string {
	const raw = PUBLIC_ABELAR_API_URL?.trim();
	if (!raw) {
		throw new Error(
			'Missing PUBLIC_ABELAR_API_URL. Set it in .env to your Abelar PHP API base (see https://abelar-africa.docs.buildwithfern.com/abelar/).'
		);
	}
	return raw.replace(/\/$/, '');
}
