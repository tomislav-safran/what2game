import {OpenAI} from 'openai';
import {ChromaClient} from 'chromadb';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import path from "node:path";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const chroma = new ChromaClient({path: process.env.CHROMA_URL || 'http://localhost:8000'});

const dbPath = path.resolve('./data/dev.db');
const db = new Database(dbPath);

async function ingestGames() {
    const collection = await chroma.getOrCreateCollection({name: 'games'})

    const batchSize = 200;
    const { count: total } = db.prepare(`SELECT COUNT(*) as count FROM Game WHERE type = 'game'`).get() as { count: number };

    for (let offset = 0; offset < total; offset += batchSize) {
        const games = db.prepare(`
            SELECT appid, name, genres, categories, shortDesc, aboutTheGame, developers, publishers, price, isFree, reviewScore, reviewCount
            FROM Game
            WHERE type = 'game' AND reviewCount >= 10
            LIMIT ? OFFSET ?
        `).all(batchSize, offset) as Game[];

        for (const game of games) {
            try {
                const gameText = buildGameDetailsString(game);
                const embedding = await getEmbedding(gameText);

                await collection.add({
                    ids: [game.appid.toString()],
                    documents: [gameText],
                    embeddings: [embedding],
                    metadatas: [{
                        appId: game.appid,
                        name: game.name || '',
                        genres: game.genres || '',
                        categories: game.categories || '',
                        developers: game.developers || '',
                        publishers: game.publishers || '',
                        isFree: game.isFree,
                        reviewCount: game.reviewCount || 0,
                        reviewScore: game.reviewScore || 0,
                    }]
                });

                console.log(`Inserted: ${game.name}`);
            } catch (error) {
                console.error(`Failed inserting: ${game.name}`, error);
            }
        }
    }

    console.log('All games inserted.')
    db.close();
}

function buildGameDetailsString(game: Game): string {
    return [
        `Name: ${game.name}`,
        `Genres: ${game.genres}`,
        `Categories: ${game.categories}`,
        `Short Description: ${game.shortDesc}`,
        `About the game: ${game.aboutTheGame}`,
        `Developers: ${game.developers}`,
        `Publishers: ${game.publishers}`,
    ].join("\n")
}

async function getEmbedding(text: string): Promise<number[]> {
    const res = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    })
    return res.data[0].embedding
}

ingestGames();

interface Game {
    appid: number;
    name: string;
    type: string;
    shortDesc: string;
    detailedDesc: string;
    aboutTheGame: string;
    developers: string;
    publishers: string;
    platforms: string;
    genres: string;
    categories: string;
    price: string;
    metacriticScore: string;
    isFree: boolean;
    releaseDate: string;
    reviewCount: number;
    reviewScore: number;
}
