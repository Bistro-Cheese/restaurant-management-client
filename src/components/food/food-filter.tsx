import qs from "query-string";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const FoodFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    return (<div>
        Food Filter
    </div>)
}