'use clients';

import { useSearchParams } from 'next/navigation';

export const useGetParams = () => {
    const searchParams = useSearchParams();

    const category = searchParams.get('category');
    const name = searchParams.get('name');
    const sortCase = searchParams.get('sortCase');
    const isAscSort = searchParams.get('isAscSort');
    const fromPrice = searchParams.get('fromPrice');
    const toPrice = searchParams.get('toPrice');

    return {
        searchParams,
        category,
        name,
        sortCase,
        isAscSort,
        fromPrice,
        toPrice
    };
};
