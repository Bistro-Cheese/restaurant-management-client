'use client';

import qs from 'query-string';
import { IconType } from 'react-icons';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useGetParams } from '@/hooks/use-get-params';

interface CategoryItemProps {
    label: string;
    value?: string;
    icon?: IconType;
}

export const CategoryItem = ({
    label,
    value,
    icon: Icon
}: CategoryItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const { category, name, sortCase, isAscSort, fromPrice, toPrice } =
        useGetParams();

    const isSelected = category === value;

    const handleClick = () => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    name: name,
                    sortCase: sortCase,
                    isAscSort: isAscSort,
                    fromPrice: fromPrice,
                    toPrice: toPrice,
                    category: isSelected ? null : value
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
                'flex items-center gap-x-1 rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700',
                isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800'
            )}
            type='button'
        >
            {Icon && <Icon size={20} />}
            <div className='truncate'>{label}</div>
        </button>
    );
};
