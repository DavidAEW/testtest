// --> hook from Svelte

import { parse } from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = parse(event.request.headers.get('cookie') || '');

	// Prüfe, ob das JWT-Cookie vorhanden ist
	const jwt = cookies.jwt;
	if (!jwt && event.url.pathname !== '/') {
		// Wenn nicht, leite auf die Login-Seite weiter
		return Response.redirect('http://localhost:5173/?needLogin=true', 302);
	}

	return await resolve(event);
}
