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
	() => import('./nodes/35')
];

export const server_loads = [0,2,3];

export const dictionary = {
		"/": [5],
		"/about": [6],
		"/admin": [7,[2]],
		"/admin/admins": [8,[2]],
		"/admin/dashboard": [9,[2]],
		"/admin/forgot": [10,[2]],
		"/admin/home": [11,[2]],
		"/admin/login": [12,[2]],
		"/admin/programs": [13,[2]],
		"/admin/reset": [14,[2]],
		"/admin/settings": [15,[2]],
		"/admin/submissions": [16,[2]],
		"/admin/works": [17,[2]],
		"/app/drafted": [18,[3]],
		"/app/home": [19,[3]],
		"/app/liked": [20,[3]],
		"/app/profile": [21,[3]],
		"/app/submitted": [23,[3]],
		"/app/submit": [22,[3]],
		"/auth/callback": [24,[4]],
		"/auth/forgot": [25,[4]],
		"/auth/otp": [26,[4]],
		"/auth/reset": [27,[4]],
		"/auth/sign-in": [28,[4]],
		"/auth/sign-up": [29,[4]],
		"/opportunities": [30],
		"/programs": [31],
		"/support": [32],
		"/works": [33],
		"/works/[slug]": [34],
		"/writing-guide": [35]
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