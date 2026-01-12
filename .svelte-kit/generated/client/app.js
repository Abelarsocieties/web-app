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
	() => import('./nodes/28')
];

export const server_loads = [2,3];

export const dictionary = {
		"/": [4],
		"/about": [5],
		"/admin/admins": [6,[2]],
		"/admin/dashboard": [7,[2]],
		"/admin/home": [8,[2]],
		"/admin/programs": [9,[2]],
		"/admin/settings": [10,[2]],
		"/admin/submissions": [11,[2]],
		"/admin/works": [12,[2]],
		"/app/drafted": [13,[3]],
		"/app/home": [14,[3]],
		"/app/liked": [15,[3]],
		"/app/profile": [16,[3]],
		"/app/submitted": [18,[3]],
		"/app/submit": [17,[3]],
		"/auth/forgot": [19],
		"/auth/otp": [20],
		"/auth/reset": [21],
		"/auth/sign-in": [22],
		"/auth/sign-up": [23],
		"/opportunities": [24],
		"/programs": [25],
		"/support": [26],
		"/works": [27],
		"/works/[slug]": [28]
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