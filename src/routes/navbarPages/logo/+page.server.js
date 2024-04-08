import { error } from '@sveltejs/kit';

export function load() {
	throw error(407, 'SURPRISE!');
}
