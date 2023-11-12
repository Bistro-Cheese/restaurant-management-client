"use client"
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const SidebarItem = ({
    icon: Icon,
    label,
    href,
}: SidebarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        (pathname === "/owner" && href === "/onwer") ||
        pathname === href ||
        pathname?.startsWith(`${href}/onwer`);

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex transition duration-500 ease-linear items-center gap-x-2 text-slate-600 text-sm font-[500] pl-6 transition-all hover:text-sky-700 hover:bg-yellow-300",
                isActive && "text-sky-700 bg-yellow-400 hover:bg-sky-200/20 hover:text-sky-700"
            )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-600",
                        isActive && "text-sky-700"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    )
}