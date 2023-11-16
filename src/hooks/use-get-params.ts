'use clients';

import { useSearchParams } from 'next/navigation';

export const useGetParams = () => {
    const searchParams = useSearchParams();

    const category = searchParams.get('category');
    const searchKey = searchParams.get('search_key');
    const sortCase = searchParams.get('sort_case');
    const isAscSort = searchParams.get('is_asc_sort');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');

    return {
        searchParams,
        category,
        searchKey,
        sortCase,
        isAscSort,
        minPrice,
        maxPrice
    };
};
