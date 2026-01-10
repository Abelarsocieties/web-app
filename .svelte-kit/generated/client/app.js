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
	() => import('./nodes/25')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/admin/admins": [4],
		"/admin/dashboard": [5],
		"/admin/home": [6],
		"/admin/programs": [7],
		"/admin/settings": [8],
		"/admin/submissions": [9],
		"/admin/works": [10],
		"/app/drafted": [11],
		"/app/home": [12],
		"/app/liked": [13],
		"/app/profile": [14],
		"/app/submitted": [16],
		"/app/submit": [15],
		"/auth/forgot": [17],
		"/auth/otp": [18],
		"/auth/reset": [19],
		"/auth/sign-in": [20],
		"/auth/sign-up": [21],
		"/programs": [22],
		"/support": [23],
		"/works": [24],
		"/works/[slug]": [25]
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