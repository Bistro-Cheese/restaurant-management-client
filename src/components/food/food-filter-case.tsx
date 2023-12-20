'use client';

import qs from 'query-string';
import { IconType } from 'react-icons';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useGetParams } from '@/hooks/use-get-params';

export interface FilterItemProps {
    nameSortCase: string;
    icon?: IconType;
}

export const FoodFilterCase = ({
    nameSortCase,
    icon: Icon
}: FilterItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const { category, sortCase, name, isAscSort, fromPrice, toPrice } =
        useGetParams();

    const isSelected = sortCase === nameSortCase;

    const handleClick = () => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    category,
                    name,
                    fromPrice,
                    toPrice,
                    isAscSort: isAscSort,
                    sortCase: isSelected ? null : nameSortCase
                }
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                'flex items-center gap-x-1 rounded-lg border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700',
                isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800'
            )}
        >
            {Icon && <Icon size={20} />}
            <div className='truncate'>{nameSortCase}</div>
        </button>
    );
};
