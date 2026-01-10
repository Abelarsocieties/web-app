/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FF6B35', // Orange brand color
					dark: '#E55A2B'
				}
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				grotesk: ['Space Grotesk', 'sans-serif']
			},
			fontSize: {
				base: ['15px', { lineHeight: '100%', letterSpacing: '0%' }]
			}
		}
	},
	plugins: []
};

