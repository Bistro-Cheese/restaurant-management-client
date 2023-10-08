import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounced";

export const SearchInput = () => {

    const [value, setValue] = useState("")
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const isFoodMenu = pathname.includes("/food-menu")

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        setValue("")
    }, [pathname])

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: isFoodMenu ? {
                categoryId: currentCategoryId,
                food: debouncedValue,
            } : {
                employee: debouncedValue
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname, isFoodMenu])
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