import { error } from '@sveltejs/kit';

export function load() {
	throw error(420, 'You found a secret Page, relax and take a smoke here');
}
