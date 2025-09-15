import { useState, useEffect } from 'react';

// --- Main Card Display Page Component ---
export default function CardsPage() {
    // State for storing cards, loading status, and errors
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch card data from our API route when the page loads
    useEffect(() => {
        async function fetchCards() {
            try {
                const response = await fetch('/api/pages/cards');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Cards ko fetch karne mein asamarth.');
                }
                const data = await response.json();
                setCards(data.cards);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCards();
    }, []); // Empty array ensures this runs only once on mount

    return (
        <>
            <main className="min-h-screen w-full bg-[url('https://supercell.com/images/180104_clashroyale_bg_pattern.png')] bg-cover bg-center text-white">
                <div className="min-h-screen w-full bg-black/70 backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-8">
                        <header className="text-center mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg">Clash Royale - All Cards</h1>
                            <p className="text-gray-300 mt-2">Game all Cards Details.</p>
                        </header>

                        {isLoading && (
                            <div className="text-center">
                                <div className="loader mx-auto border-t-yellow-300" style={{width: '60px', height: '60px'}}></div>
                                <p className="mt-4 text-lg">Cards Loading ....</p>
                            </div>
                        )}

                        {error && (
                            <div className="text-center bg-red-500/80 p-4 rounded-lg max-w-md mx-auto">
                                <p className="font-bold">Ek Error Aayi</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {!isLoading && !error && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                                {cards.map((card) => (
                                    <Card key={card.id} card={card} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {/* Simple loader style, can be moved to globals.css */}
            <style jsx global>{`
                .loader {
                    border: 6px solid #4a5568;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}

// --- Card Component to display individual card details ---
const Card = ({ card }) => {
    const rarityClass = {
        'Common': 'border-gray-400 bg-gray-800/70',
        'Rare': 'border-yellow-500 bg-yellow-900/40',
        'Epic': 'border-purple-500 bg-purple-900/40',
        'Legendary': 'border-sky-400 bg-sky-900/40',
    }[card.rarity] || 'border-gray-600';

    return (
        <div className={`p-2 border-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${rarityClass}`}>
            <div className="relative">
                <img src={card.icon} alt={card.name} className="w-full h-auto rounded-md" />
                <div className="absolute -top-3 -left-3 bg-purple-600 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full border-2 border-purple-800 shadow-lg">
                    {card.elixir}
                </div>
            </div>
            <h3 className="text-center text-sm md:text-base font-semibold mt-2 truncate">{card.name}</h3>
        </div>
    );
};

