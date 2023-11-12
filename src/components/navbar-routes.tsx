"use client"

import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import {
    Settings,
    User,
    UserCircle
} from "lucide-react"
import { SearchInput } from "./search-input"
import Link from "next/link"

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const isSearchPage = pathname === "/owner/foods/menu" || pathname === "/owner/employees";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                <Button value="outline">
                    Logout
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="link">
                            <UserCircle className="h-8 w-8" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-2">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>

                            {/* profile */}
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>

                            {/* settings */}
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>


                        </DropdownMenuGroup>
                    </DropdownMenuContent>

                </DropdownMenu>
            </div>
        </>


    )
}