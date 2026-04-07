export type AppUser = {
	id: string;
	name: string | null;
	first_name?: string | null;
	last_name?: string | null;
	avatar_url: string | null;
	role: 'user' | 'editor' | 'admin';
	email?: string | null;
};

export type AppSession = {
	access_token: string;
	user: {
		id: string;
		email?: string | null;
	};
};
