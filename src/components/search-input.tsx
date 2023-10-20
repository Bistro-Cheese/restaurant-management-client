'use client'

import { useEffect, useState } from "react";

import qs from "query-string";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


import { useRouter, usePathname } from "next/navigation";

import { useDebounce } from "@/hooks/use-debounced";
import { useGetParams } from "@/hooks/use-get-params";

export const SearchInput = () => {

    const [value, setValue] = useState('')
    const debouncedValue = useDebounce(value);


    const router = useRouter();
    const pathname = usePathname();

    const isFoodMenu = pathname.includes("/foods/menu")

    const {
        category,
        sortCase,
        isAscSort,
        minPrice,
        maxPrice
    } = useGetParams()

    // useEffect(() => {
    //     setValue("")
    // }, [pathname])

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: isFoodMenu ? {
                category: category,
                searchKey: debouncedValue,
                sortCase: sortCase,
                isAscSort: isAscSort,
                minPrice: minPrice,
                maxPrice: maxPrice
            } : {
                employee: debouncedValue
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, pathname, isFoodMenu, router, category, sortCase, isAscSort, minPrice, maxPrice])

    return (
        <div className="relative">
            <Search
                className="h-4 w-4 absolute top-3 left-3 text-slate-600"
            />
            <Input
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                value={value}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for a course"
            />
        </div>
    )
}