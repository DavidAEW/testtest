import { error } from '@sveltejs/kit';

export function load() {
	throw error(408, 'This is Art!');
}
