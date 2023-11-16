'use client';

import { useGetProfile } from "@/hooks/use-dispatch-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const AuthScreen = () => {
    const { data, isLoading } = useGetProfile();

    const router = useRouter();

    useEffect(() => {
        if (data && !isLoading) {
            console.log("ROLE:::", data?.data?.role);
            if (data?.data?.role === 'staff') router.push(`/${data.data.role}/tables`);
            router.push(`/${data.data.role}`);
        }
    }, [data, isLoading, router]);

    if (isLoading) return <div>Loading...</div>;
};

export default AuthScreen;
