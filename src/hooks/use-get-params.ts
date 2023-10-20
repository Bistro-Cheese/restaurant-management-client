'use clients';

import { useSearchParams } from 'next/navigation';

export const useGetParams = () => {
    const searchParams = useSearchParams();

    const category = searchParams.get('category');
    const searchKey = searchParams.get('keySearch');
    const sortCase = searchParams.get('sortCase');
    const isAscSort = searchParams.get('isAscSort');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    return {
        category,
        searchKey,
        sortCase,
        isAscSort,
        minPrice,
        maxPrice
    };
};
