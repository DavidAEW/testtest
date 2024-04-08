import { error } from '@sveltejs/kit';

export function load() {
	throw error(406, 'AMERICA');
}
