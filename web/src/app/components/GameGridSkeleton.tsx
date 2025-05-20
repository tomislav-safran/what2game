'use client'

import GameItem from "@/app/ui/GameItem";

export default function GameGridSkeleton({page}: { page: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: page * 6 }).map((_, idx) => (
                <GameItem key={idx} loading={true} />
            ))}
        </div>
    )
}