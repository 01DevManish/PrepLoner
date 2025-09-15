// pages/api/cards.js

// This is a secure backend API route.
// The Supercell API key is used here and is never exposed to the user's browser.

export default async function handler(req, res) {
    // IMPORTANT: Replace this with your actual Supercell API Key
    // It's best to store this in an environment variable (.env.local) for security
    const SUPERCELL_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjEwOWJjNDUzLTg5MGQtNDRkMS1iMzhiLWYzMTUxNGVlZTM4YSIsImlhdCI6MTc1NzkxOTk3Niwic3ViIjoiZGV2ZWxvcGVyLzFiM2U0MGUyLWE5ZmUtZTNmMC05YzkyLThhMDA5ODFjNDRjZiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI2NC4yOS4xNy4xIl0sInR5cGUiOiJjbGllbnQifV19.XaF6DoRcyArP868nnxeEvpVjYCDIMobOnw39F_RYmPs-h78V_uId_FQuJJfneZv_8EdY3qm6rxe949gcBNfqzw';
    const SUPERCELL_API_URL = 'https://api.clashroyale.com/v1/cards';

    try {
        const response = await fetch(SUPERCELL_API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${SUPERCELL_API_KEY}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            // If the API returns an error, forward the error message
            const errorData = await response.json();
            console.error('Supercell API Error:', errorData);
            return res.status(response.status).json({ message: errorData.reason || 'Failed to fetch card data from Supercell API.' });
        }

        const data = await response.json();
        
        // We only need the items array from the response
        const cards = data.items.map(card => ({
             id: card.id,
             name: card.name,
             icon: card.iconUrls.medium,
             maxLevel: card.maxLevel,
             elixir: card.elixirCost,
             rarity: card.rarity
             // NOTE: Health and Damage stats vary by level.
             // A real app would need a complex calculation based on the API data
             // which is beyond a simple fetch. We'll use mock data for these on the frontend for now.
        }));

        res.status(200).json({ cards });

    } catch (error) {
        console.error('Server-side Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
