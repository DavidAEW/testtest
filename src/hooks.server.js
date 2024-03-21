import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import { SECRET_KEY } from '$env/static/private';

// Load environment variables from .env file

export async function handle({ event, resolve }) {
	const openPath = '/'; // Der Pfad der Startseite, der von der Authentifizierungsprüfung ausgeschlossen ist

	const token = event.cookies.get('jwt');

	// Prüfen, ob die Anfrage nicht für die Startseite/Login-Seite ist
	if (event.url.pathname !== openPath) {
		// Wenn kein Token vorhanden ist, leite auf die Login-Seite weiter
		if (!token) {
			throw redirect(302, 'http://localhost:5173/test');
		}

		try {
			let user = jwt.verify(token, SECRET_KEY);
			event.locals.user = user; // Benutzerdaten für nachfolgende Anfragen speichern
		} catch (error) {
			console.log(error);
			// Wenn der Token nicht verifiziert werden kann, leite zur Login-Seite weiter
			throw redirect(302, 'http://localhost:5173/test2');
		}
	}

	// Führe andere Routen wie üblich aus
	return await resolve(event);
}
