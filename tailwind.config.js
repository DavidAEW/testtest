import { join } from 'path'

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'rocket',
						enhancements: true,
					},
				],
			},
		}),
	],
	colors: {
		'text': {
		  50: '#f1f4f4',
		  100: '#e2e9e9',
		  200: '#c5d3d3',
		  300: '#a9bcbc',
		  400: '#8ca6a6',
		  500: '#6f9090',
		  600: '#597373',
		  700: '#435656',
		  800: '#2c3a3a',
		  900: '#161d1d',
		  950: '#0b0e0e',
		},
		'background': {
		  50: '#f1f4f4',
		  100: '#e3e8e8',
		  200: '#c6d2d2',
		  300: '#aabbbb',
		  400: '#8ea4a4',
		  500: '#718e8e',
		  600: '#5b7171',
		  700: '#445555',
		  800: '#2d3939',
		  900: '#171c1c',
		  950: '#0b0e0e',
		},
		'primary': {
		  50: '#f0f5f5',
		  100: '#e0ebea',
		  200: '#c1d7d5',
		  300: '#a2c3c0',
		  400: '#84aeac',
		  500: '#659a97',
		  600: '#517b79',
		  700: '#3c5d5a',
		  800: '#283e3c',
		  900: '#141f1e',
		  950: '#0a0f0f',
		},
		'secondary': {
		  50: '#eff5f5',
		  100: '#dfeceb',
		  200: '#bfd9d7',
		  300: '#9fc6c2',
		  400: '#80b3ae',
		  500: '#609f9a',
		  600: '#4d807b',
		  700: '#39605c',
		  800: '#26403e',
		  900: '#13201f',
		  950: '#0a100f',
		},
		'accent': {
		  50: '#eff6f5',
		  100: '#deedec',
		  200: '#bedad8',
		  300: '#9dc8c5',
		  400: '#7cb6b2',
		  500: '#5ca39e',
		  600: '#49837f',
		  700: '#37625f',
		  800: '#25413f',
		  900: '#122120',
		  950: '#091010',
		},
	   },
};
