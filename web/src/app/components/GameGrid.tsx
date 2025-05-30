import GameItem from "@/app/ui/GameItem";
import dotenv from 'dotenv';
dotenv.config();

const chromaApiRoot = process.env.CHROMA_API_ROOT_PATH;

export default async function GameGrid({ query, page }: { query: string, page: number }) {
    let games: Game[] = [];
    if (query) {
        games = await handleSearch(query, page) || [];
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {games.map((game, idx) => (
                <GameItem key={idx} game={game} />
            ))}
        </div>
    )
}

async function handleSearch(query: string, page: number): Promise<Game[]> {
    console.log(`[handleSearch] query: ${query}, page: ${page}`);
    if (!query) return [];

    try {
        const res = await fetch(`${chromaApiRoot}/search?query=${encodeURIComponent(query)}&page=${page}`, {
            cache: 'no-store',
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
    reviewScore: number;
    reviewCount: number;
}