'use client';

export default function GameItem({game, loading}: {
    game?: { appId: number, name: string, genres: string, reviewScore: number },
    loading?: boolean
}) {

    const reviewScore = game?.reviewScore || 0;
    const stars = Math.floor(reviewScore);

    if (loading) {
        return (
            <div className="p-4 w-full h-[110px] bg-gray-700 rounded shadow animate-pulse overflow-hidden">
                <div className="h-6 bg-gray-600 rounded mb-2"/>
                <div className="h-4 bg-gray-600 rounded w-2/3"/>
            </div>
        );
    }

    return (
        <a
            href={`https://store.steampowered.com/app/${game?.appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 w-full bg-gray-700 rounded shadow block hover:bg-gray-600 transition overflow-hidden"
        >
            <h2 className="font-bold">{game?.name}</h2>
            <p className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">{game?.genres}</p>
            {Array.from({ length: stars }).map((_, index) => (
                <span key={index}>&#9733;</span>
            ))}
        </a>
    );
}

