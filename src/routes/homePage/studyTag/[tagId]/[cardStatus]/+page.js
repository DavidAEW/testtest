export async function load({ params, fetch }) {
    const { tagId, cardStatus } = params;
    async function getCards() {
		const API_URL = `http://localhost:3001/Card/${cardStatus}/tagId/${tagId}`;
		try {
			const response = await fetch(API_URL, {
				method: 'GET',
				headers: {
                    'Content-Type': 'application/json'
				},
                credentials: 'include'
			});

			if (response.ok) {
				const cardData = await response.json();
                return cardData;
			} else {
				console.error('Fehler beim Laden der Karten:', response);
				return null;
            }
		} catch (error) {
			console.error('Fehler beim Laden der Karten:', error);
			return null;
		}
	}
    return {
        cardData: getCards()
    };
};