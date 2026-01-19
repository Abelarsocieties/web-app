
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/admin" | "/admin/admins" | "/admin/comments" | "/admin/dashboard" | "/admin/forgot" | "/admin/home" | "/admin/login" | "/admin/programs" | "/admin/reset" | "/admin/settings" | "/admin/submissions" | "/admin/works" | "/app" | "/app/drafted" | "/app/home" | "/app/liked" | "/app/profile" | "/app/submitted" | "/app/submit" | "/app/submit/success" | "/auth" | "/auth/callback" | "/auth/forgot" | "/auth/otp" | "/auth/reset" | "/auth/sign-in" | "/auth/sign-up" | "/opportunities" | "/programs" | "/support" | "/works" | "/works/[slug]" | "/writing-guide";
		RouteParams(): {
			"/works/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/admins": Record<string, never>;
			"/admin/comments": Record<string, never>;
			"/admin/dashboard": Record<string, never>;
			"/admin/forgot": Record<string, never>;
			"/admin/home": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/programs": Record<string, never>;
			"/admin/reset": Record<string, never>;
			"/admin/settings": Record<string, never>;
			"/admin/submissions": Record<string, never>;
			"/admin/works": Record<string, never>;
			"/app": Record<string, never>;
			"/app/drafted": Record<string, never>;
			"/app/home": Record<string, never>;
			"/app/liked": Record<string, never>;
			"/app/profile": Record<string, never>;
			"/app/submitted": Record<string, never>;
			"/app/submit": Record<string, never>;
			"/app/submit/success": Record<string, never>;
			"/auth": Record<string, never>;
			"/auth/callback": Record<string, never>;
			"/auth/forgot": Record<string, never>;
			"/auth/otp": Record<string, never>;
			"/auth/reset": Record<string, never>;
			"/auth/sign-in": Record<string, never>;
			"/auth/sign-up": Record<string, never>;
			"/opportunities": Record<string, never>;
			"/programs": Record<string, never>;
			"/support": Record<string, never>;
			"/works": { slug?: string };
			"/works/[slug]": { slug: string };
			"/writing-guide": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/about/" | "/admin" | "/admin/" | "/admin/admins" | "/admin/admins/" | "/admin/comments" | "/admin/comments/" | "/admin/dashboard" | "/admin/dashboard/" | "/admin/forgot" | "/admin/forgot/" | "/admin/home" | "/admin/home/" | "/admin/login" | "/admin/login/" | "/admin/programs" | "/admin/programs/" | "/admin/reset" | "/admin/reset/" | "/admin/settings" | "/admin/settings/" | "/admin/submissions" | "/admin/submissions/" | "/admin/works" | "/admin/works/" | "/app" | "/app/" | "/app/drafted" | "/app/drafted/" | "/app/home" | "/app/home/" | "/app/liked" | "/app/liked/" | "/app/profile" | "/app/profile/" | "/app/submitted" | "/app/submitted/" | "/app/submit" | "/app/submit/" | "/app/submit/success" | "/app/submit/success/" | "/auth" | "/auth/" | "/auth/callback" | "/auth/callback/" | "/auth/forgot" | "/auth/forgot/" | "/auth/otp" | "/auth/otp/" | "/auth/reset" | "/auth/reset/" | "/auth/sign-in" | "/auth/sign-in/" | "/auth/sign-up" | "/auth/sign-up/" | "/opportunities" | "/opportunities/" | "/programs" | "/programs/" | "/support" | "/support/" | "/works" | "/works/" | `/works/${string}` & {} | `/works/${string}/` & {} | "/writing-guide" | "/writing-guide/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/auth-bg.png" | "/footer-icon.png" | "/hero-bg.jpg" | "/icon-background.png" | "/left-vector.png" | "/logo-white.png" | "/main-icon.png" | "/right-vector.png" | "/upload.png" | "/user-icon.png" | "/vector-5.png" | "/vector-6.png" | string & {};
	}
}