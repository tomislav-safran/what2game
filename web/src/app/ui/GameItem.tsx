'use client';

import {Game} from "@/app/components/GameGrid";

export default function GameItem({game, loading}: {
    game?: Game,
    loading?: boolean
}) {

    const reviewScore = game?.metadata?.reviewScore || 0;
    const stars = Math.floor(reviewScore);

    if (loading) {
        return (
            <div className="p-4 w-full h-[110px] bg-gray-700 rounded shadow animate-pulse overflow-hidden">
                <div className="h-6 bg-gray-600 rounded mb-2"/>
                <div className="h-4 bg-gray-600 rounded w-4/5 mb-2"/>
                <div className="h-4 bg-gray-600 rounded w-2/5"/>
            </div>
        );
    }

    return (
        <a
            href={`https://store.steampowered.com/app/${game?.metadata?.appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 w-full bg-gray-700 rounded shadow block hover:bg-gray-600 transition overflow-hidden"
        >
            <h2 className="font-bold">{game?.metadata?.name}</h2>
            <p className="text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">{game?.metadata?.genres}</p>
            {Array.from({length: stars}).map((_, index) => (
                <span key={index}>&#9733;</span>
            ))}
        </a>
    );
}

