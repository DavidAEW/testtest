export async function load({ params, fetch }) {
    const { deckId, cardStatus } = params;
    async function getCards() {
		const url = `https://cardhubserver.azurewebsites.net/Card/${cardStatus}/deckId/${deckId}`;
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