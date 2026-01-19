export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37')
];

export const server_loads = [0,2,3];

export const dictionary = {
		"/": [5],
		"/about": [6],
		"/admin": [7,[2]],
		"/admin/admins": [8,[2]],
		"/admin/comments": [~9,[2]],
		"/admin/dashboard": [~10,[2]],
		"/admin/forgot": [11,[2]],
		"/admin/home": [12,[2]],
		"/admin/login": [~13,[2]],
		"/admin/programs": [14,[2]],
		"/admin/reset": [15,[2]],
		"/admin/settings": [16,[2]],
		"/admin/submissions": [17,[2]],
		"/admin/works": [18,[2]],
		"/app/drafted": [19,[3]],
		"/app/home": [20,[3]],
		"/app/liked": [21,[3]],
		"/app/profile": [22,[3]],
		"/app/submitted": [25,[3]],
		"/app/submit": [~23,[3]],
		"/app/submit/success": [~24,[3]],
		"/auth/callback": [26,[4]],
		"/auth/forgot": [27,[4]],
		"/auth/otp": [28,[4]],
		"/auth/reset": [29,[4]],
		"/auth/sign-in": [~30,[4]],
		"/auth/sign-up": [31,[4]],
		"/opportunities": [32],
		"/programs": [33],
		"/support": [34],
		"/works": [35],
		"/works/[slug]": [36],
		"/writing-guide": [37]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.svelte';