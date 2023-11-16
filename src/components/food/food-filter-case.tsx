"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import {
    usePathname,
    useRouter,
} from "next/navigation";

import { cn } from "@/lib/utils";
import { useGetParams } from "@/hooks/use-get-params";

export interface FilterItemProps {
    name: string;
    icon?: IconType;
};

export const FoodFilterCase = ({
    name,
    icon: Icon,
}: FilterItemProps) => {

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

    const isSelected = sortCase === name;

    const handleClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                category,
                searchKey,
                minPrice,
                maxPrice,
                is_asc_sort: isAscSort,
                sort_case: isSelected ? null : name,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url);
    };

    return (
        <button onClick={handleClick} className={cn("py-2 px-3 text-sm border border-slate-200 rounded-lg flex items-center gap-x-1 hover:border-sky-700 transition",
            isSelected && "border-sky-700 bg-sky-200/20 text-sky-800")}>
            {Icon && <Icon size={20} />}
            <div className="truncate">
                {name}
            </div>
        </button>


    )
}