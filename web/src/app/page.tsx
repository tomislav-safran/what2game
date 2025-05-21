import Search_rename from "@/app/ui/Search_rename";
import {Suspense} from "react";
import GameGrid from "@/app/components/GameGrid";
import GameGridSkeleton from "@/app/components/GameGridSkeleton";
import LoadMore from "@/app/ui/LoadMore";
import GameGridAnimatedWrapper from "@/app/components/GameGridAnimatedWrapper";

export default async function Home(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

    return (
        <div
            className="w-full min-h-screen flex flex-col items-center justify-center px-24 grow-1 transition-all duration-200 ease-in-out">
            <h1 className="text-4xl mb-6">What2Game</h1>
            <div className="flex w-full justify-center items-center gap-2 mb-8">
                <Search_rename placeholder="Search_rename games..."/>
            </div>
            <GameGridAnimatedWrapper query={query} page={page}>
                <Suspense key={`${query}-${page}`} fallback={<GameGridSkeleton page={page}/>}>
                    <GameGrid query={query} page={page}/>
                </Suspense>
                <LoadMore/>
            </GameGridAnimatedWrapper>
        </div>
    );
}
