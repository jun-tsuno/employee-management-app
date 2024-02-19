/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/features/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#005E86',
				secondary: '#40A2D8',
				text: {
					primary: '#313131',
					secondary: '#919191',
					gray: '#616161',
					placeholder: '#F5F5F7',
				},
				background: '#dee2e6',
				green: '#80C636',
				error: '#F24C3D',
			},
			fontFamily: {
				exo: ['Exo', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
