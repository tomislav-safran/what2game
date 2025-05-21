'use client';

import {useSearchParams, usePathname, useRouter} from 'next/navigation';

export default function LoadMore() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        const currentPage = params.get('page');

        if (currentPage) {
            params.set('page', (parseInt(currentPage) + 1).toString());
        } else {
            params.set('page', "2");
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full flex justify-center mt-6">
            <button
                onClick={handleClick}
                className={"px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg shadow active:scale-95"}
            >
                Load more
            </button>
        </div>
    );
}