# What2Game - Steam Game Search Engine

A similarity search engine for the Steam game database. Uses a vector database (ChromaDB) to store game data and provide relevant search results.
[What2Game]((https://what2game.tomislavsafran.com/))

## Project Structure

This project is a monorepo consisting of multiple packages:
- **Database (ChromaDB)**: Vector database used for storing vectorized game data.
- **Vectorization**: Code responsible for processing and vectorizing game data using OpenAi vector embedding model.
- **Backend (Node.js + Express)**: Handles the API for game data and search logic.
- **Frontend (Next.js)**: Provides the user interface for browsing and discovering games.
