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
                throw new Error('Fehler beim Laden der Karten');
            }
		} catch (error) {
            throw new Error('Fehler beim Laden der Karten');
		}
	}
    return {
        cardData: getCards()
    };
};