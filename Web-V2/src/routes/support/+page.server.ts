import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	support: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const email = formData.get('email') as string;
		const message = formData.get('message') as string;
		if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
			return fail(400, { success: false });
		}
		return { success: true };
	}
};
