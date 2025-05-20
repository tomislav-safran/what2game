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
        <div className="relative w-full max-w-xl">
            <button
                onClick={handleClick}
            >
                Load more
            </button>
        </div>
    );
}