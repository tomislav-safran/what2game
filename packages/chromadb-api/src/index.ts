import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import {ChromaClient, IncludeEnum} from "chromadb";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const pageSize = 6;

app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chroma = new ChromaClient({ path: process.env.CHROMA_URL || 'http://localhost:8000' });

app.get('/search', async (req: express.Request, res: express.Response): Promise<any> => {
    const query = req.query.query as string;
    const page = parseInt(req.query.page as string) || 1;

    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const embeddingRes = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: query,
        });

        const embedding = embeddingRes.data[0].embedding;

        const collection = await chroma.getOrCreateCollection({ name: 'games' });
        const results = await collection.query({
            queryEmbeddings: [embedding],
            nResults: pageSize * page,
            include: [IncludeEnum.Metadatas],
        });

        const games = results.metadatas[0] || [];
        res.json(games)
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to perform search' });
    }
});

app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});
