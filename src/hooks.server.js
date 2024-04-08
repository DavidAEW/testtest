import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import { SECRET_KEY } from '$env/static/private';
// Wie man .env in Svelte hochlädt

export async function handle({ event, resolve }) {
	const openPaths = ['/', '/Register'];
	const token = event.cookies.get('jwt');

	// Prüfen, ob die Anfrage nicht für die Startseite/Login-Seite ist
	if (!openPaths.includes(event.url.pathname)) {
		// Wenn kein Token -> redirect to URL
		if (!token) {
			throw redirect(302, 'http://localhost:5173/noToken');
		}

		try {
			let user = jwt.verify(token, SECRET_KEY);
			event.locals.user = user; // Benutzerdaten für nachfolgende Anfragen speichern
		} catch (error) {
			console.log(error);
			throw redirect(302, 'http://localhost:5173/wrongToken');
		}
	}

	// Führe andere Routen wie üblich aus
	return await resolve(event);
}
