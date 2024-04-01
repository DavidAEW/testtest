import { error } from '@sveltejs/kit';

export function load() {
	throw error(418, 'I am a Teapot, short and stout, here is my handle, here is my spout. When I get all steamed up, hear me shout, tip me over and pour me out.');
}
