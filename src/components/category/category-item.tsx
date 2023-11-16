"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import {
    usePathname,
    useRouter,
} from "next/navigation";

import { cn } from "@/lib/utils";
import { useGetParams } from "@/hooks/use-get-params";

interface CategoryItemProps {
    label: string;
    value?: string;
    icon?: IconType;
};

export const CategoryItem = ({
    label,
    value,
    icon: Icon,
}: CategoryItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const {
        category,
        searchKey,
        sortCase,
        isAscSort,
        minPrice,
        maxPrice
    } = useGetParams()

    const isSelected = category === value;

    const handleClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                search_key: searchKey,
                sort_case: sortCase,
                is_asc_sort: isAscSort,
                min_price: minPrice,
                max_price: maxPrice,
                category: isSelected ? null : value,

            }
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
                isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
            type="button"
        >
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}