'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Settings, User, UserCircle } from 'lucide-react';
import { SearchInput } from './search-input';
import { useDispatchLogout } from '@/hooks/use-dispatch-auth';

export const HeaderContent = () => {
    const pathname = usePathname();
    const isSearchPage =
        pathname === '/owner/foods/menu' || pathname === '/owner/employees';

    const { isLogoutLoading, dispatchLogout } = useDispatchLogout();

    const handleLogout = () => {
        dispatchLogout();
    };
    return (
        <>

            <div className='ml-auto flex gap-x-2'>
                {isSearchPage && (
                    <div className='hidden md:block'>
                        <SearchInput />
                    </div>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='link'>
                            <UserCircle className='h-8 w-8' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mr-2 w-56'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {/* profile */}
                            <DropdownMenuItem>
                                <User className='mr-2 h-4 w-4' />
                                <span>Profile</span>
                            </DropdownMenuItem>

                            {/* settings */}
                            <DropdownMenuItem>
                                <Settings className='mr-2 h-4 w-4' />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};
