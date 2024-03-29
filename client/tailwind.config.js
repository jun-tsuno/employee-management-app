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
				'primary-tint': '#4d8eaa',
				secondary: '#40A2D8',
				text: {
					primary: '#313131',
					secondary: '#919191',
					gray: '#616161',
					placeholder: '#F5F5F7',
				},
				background: '#dee2e6',
				green: '#52b788',
				error: '#F24C3D',
				danger: '#D04848',
				pink: '#FFEEF4',
			},
			fontFamily: {
				exo: ['Exo', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
