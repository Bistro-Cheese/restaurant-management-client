'use client';

import { useEffect, useState } from 'react';

import qs from 'query-string';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

import { useRouter, usePathname } from 'next/navigation';

import { useDebounce } from '@/hooks/use-debounced';
import { useGetParams } from '@/hooks/use-get-params';

export const SearchInput = () => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 1000);

    const router = useRouter();
    const pathname = usePathname();

    const isFoodMenu = pathname.includes('/foods/menu');

    const { category, sortCase, isAscSort, fromPrice, toPrice } =
        useGetParams();

    // useEffect(() => {
    //     setValue("")
    // }, [pathname])

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: isFoodMenu
                    ? {
                          category: category,
                          name: debouncedValue,
                          sortCase: sortCase,
                          isAscSort: isAscSort,
                          fromPrice: fromPrice,
                          toPrice: toPrice
                      }
                    : {
                          employee: debouncedValue
                      }
            },
            { skipEmptyString: true, skipNull: true }
        );

        router.push(url);
    }, [
        debouncedValue,
        pathname,
        isFoodMenu,
        router,
        category,
        sortCase,
        isAscSort,
        fromPrice,
        toPrice
    ]);

    return (
        <div className='relative'>
            <Search className='absolute left-3 top-3 h-4 w-4 text-slate-600' />
            <Input
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                value={value}
                className='w-full rounded-full bg-white pl-9 focus-visible:ring-slate-200 md:w-[300px]'
                placeholder='Search...'
            />
        </div>
    );
};
