import type { AppSession, AppUser } from '$lib/api/types';

declare global {
	namespace App {
		interface Locals {
			session: AppSession | null;
			user: AppUser | null;
		}
	}
}

export {};
