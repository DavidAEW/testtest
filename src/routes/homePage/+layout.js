export async function load({ fetch }) {
    async function getDecks() {
        const API_URL = 'https://cardhubserver.azurewebsites.net/Deck';
        try {
            const response = await fetch(
                API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();

            return data.map((item) => ({
                value: item.deckId,
                label: item.deckName
            }));
        } catch (error) {
            console.error('Fehler beim Laden der Daten:', error);
        }
    }
    async function getTags() {
        const API_URL = 'https://cardhubserver.azurewebsites.net/Tag';
        try {
            const response = await fetch(
                API_URL,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );
            const data = await response.json();

            return data.map((item) => ({
                value: item.tagId,
                label: item.tagName
            }));
        } catch (error) {
            console.error('Fehler beim Laden der Daten:', error);
        }
    }

    return {
        decks: getDecks(),
        tags: getTags()

    };
}