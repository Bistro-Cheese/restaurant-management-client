'use client';

import { usePathname } from 'next/navigation';
import { Settings, User, UserCircle, LogOutIcon } from 'lucide-react';

// Components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';

import { useDispatchLogout } from '@/hooks/use-dispatch-auth';
import { cn } from '@/lib/utils';

export const HeaderContent = () => {
    const pathname = usePathname();
    const isSearchPage =
        pathname.includes('foods') ||
        pathname.includes('employees') ||
        pathname.includes('orders');

    const { isLogoutLoading, dispatchLogout } = useDispatchLogout();

    const handleLogout = () => {
        dispatchLogout();
    };
    return (
        <div
            className={cn(
                'ml-auto inline-block rounded-full p-2',
                isSearchPage && 'bg-white'
            )}
        >
            <div className='flex gap-x-2'>
                {isSearchPage && (
                    <div className='hidden md:block'>
                        <SearchInput />
                    </div>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='link'>
                            <UserCircle className='h-8 w-8 text-tertiary' />
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

                            {/* settings */}
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOutIcon className='mr-2 h-4 w-4' />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
