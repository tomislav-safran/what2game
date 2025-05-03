import Search from "@/app/ui/search";
import {Suspense} from "react";
import GameGrid from "@/app/components/GameGrid";
import GameGridSkeleton from "@/app/components/GameGridSkeleton";

export default async function Home(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    return (
        <div
            className="w-full min-h-screen flex flex-col items-center justify-center px-24 grow-1 transition-all duration-200 ease-in-out">
            <h1 className="text-4xl mb-6">What2Game</h1>
            <div className="flex w-full justify-center items-center gap-2 mb-8">
                <Search placeholder="Search games..."/>
            </div>
            <div className={`h-[168px] ${query ? 'animate-grow' : 'animate-shrink'} max-w-[800px] w-full`}>
                <Suspense key={query} fallback={<GameGridSkeleton/>}>
                    <GameGrid query={query}/>
                </Suspense>
            </div>
        </div>
    );
}
