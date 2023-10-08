"use client";

import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-items";
import { managerRoutes, ownerRoutes } from "@/utils/constants";



export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isOwner = pathname?.includes("/owner");

    // const routes = ownerRoutes;
    const routes = isOwner ? ownerRoutes : managerRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}