import { join } from 'path';

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		fontFamily: {
			nunito: ['"nunito sans"', 'sans-serif']
		},
		extend: {
			colors: {
				text: {
					50: '#f1f4f4',
					60: '#e2e9e9',
					70: '#c5d3d3',
					80: '#a9bcbc',
					90: '#8ca6a6',
					100: '#6f9090',
					200: '#597373',
					250: '#435656',
					300: '#2c3a3a',
					350: '#161d1d',
					400: '#0b0e0e'
				},
				background: {
					0: '#ffffff',
					50: '#f1f3f3',
					60: '#e3e8e8',
					70: '#c7d1d1',
					80: '#acb9b9',
					90: '#90a2a2',
					100: '#748b8b',
					200: '#5d6f6f',
					250: '#465353',
					300: '#2e3838',
					350: '#171c1c',
					400: '#0c0e0e'
				},
				primary: {
					50: '#f0f5f5',
					60: '#e0ebea',
					70: '#c1d7d5',
					80: '#a2c3c0',
					90: '#84aeac',
					100: '#659a97',
					200: '#517b79',
					250: '#3c5d5a',
					300: '#283e3c',
					350: '#141f1e',
					400: '#0a0f0f'
				},
				secondary: {
					50: '#eff5f5',
					60: '#dfeceb',
					70: '#bfd9d7',
					80: '#9fc6c2',
					90: '#80b3ae',
					100: '#609f9a',
					200: '#4d807b',
					250: '#39605c',
					300: '#26403e',
					350: '#13201f',
					400: '#0a60f'
				},
				accent: {
					50: '#eff6f5',
					60: '#deedeb',
					70: '#bedad8',
					80: '#9dc8c4',
					90: '#7cb6b1',
					100: '#5ca39d',
					200: '#49837e',
					250: '#37625e',
					300: '#25413f',
					350: '#12211f',
					400: '#091010'
				}
			}
		}
	},

	plugins: [forms, typography]
};