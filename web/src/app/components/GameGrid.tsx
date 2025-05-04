import GameItem from "@/app/ui/GameItem";

export default async function GameGrid({ query }: { query: string }) {
    let games: Game[] = [];
    if (query) {
        games = await handleSearch(query) || [];
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {games.map((game, idx) => (
                <GameItem key={idx} game={game} />
            ))}
        </div>
    )
}

async function handleSearch(query: string): Promise<Game[]> {
    if (!query) return [];

    try {
        const res = await fetch(`http://localhost:4000/search?query=${encodeURIComponent(query)}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            console.error("Failed to fetch games", res.status);
            return [];
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error("Invalid data format from backend");
            return [];
        }

        return data as Game[];
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

export interface Game {
    appId: number;
    name: string;
    genres: string;
    categories: string;
    developers: string;
    publishers: string;
    price: string;
    isFree: number;
}