export async function load( {params, fetch} ) {
    const { deckId } = params;
    async function getAll() {
		const API_URL = `http://localhost:3001/Card_Deck/${deckId}`;
		const response = await fetch(API_URL, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
		});
        if (!response.ok) {
            console.error('Fehler beim Laden der Daten:', response);
            return null;
        }
		const deckData = await response.json();
		return deckData;
	}
    return {
        deckData: getAll()
    };
};