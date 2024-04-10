export async function load( { fetch }) {

    async function getUserInfo() {
		const API_URL = 'http://localhost:3001/User';
		try {
			const response = await fetch(API_URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			if (response.ok) {
				const userData = await response.json();
				return userData;
			} else {
				console.error('Fehler beim Abrufen der Benutzerdaten.');
			}
		} catch (error) {
			console.error('Fehler:', error);
		}
	}
    return {
        userData: getUserInfo()
    };
};