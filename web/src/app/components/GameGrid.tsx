import {ChromaClient, IncludeEnum} from "chromadb";
import {OpenAI} from "openai";
import GameItem from "@/app/ui/GameItem";


export default async function GameGrid({ query }: { query: string }) {
    let games = [];
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

async function handleSearch(query: string) {
    let games: any[] = [];

    if (query) {
        const chroma = new ChromaClient({ path: process.env.CHROMA_URL || 'http://localhost:8000' });
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const embeddingRes = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: query,
        });

        const embedding = embeddingRes.data[0].embedding;

        const collection = await chroma.getOrCreateCollection({ name: 'games' });
        const results = await collection.query({
            queryEmbeddings: [embedding],
            nResults: 6,
            include: [IncludeEnum.Metadatas],
        });

        games = results.metadatas[0] || [];
        return games;
    }
}