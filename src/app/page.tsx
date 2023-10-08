"use client"

import { useGetProfile } from "@/hooks/use-get-profile";
import { redirect } from "next/navigation";

const PageStart = () => {

    const { data } = useGetProfile()


    if (data) {
        return redirect("/owner")
    }

    return <div>
        Loading...
    </div>
}

export default PageStart;