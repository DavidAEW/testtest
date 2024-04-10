export async function load({ params, fetch }) {
    const { deckId, cardStatus } = params;
    async function getCards() {
		const url = `http://localhost:3001/Card/${cardStatus}/deckId/${deckId}`;
		try {
			const response = await fetch(url, {
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