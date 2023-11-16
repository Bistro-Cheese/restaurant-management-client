import { SidebarItemProps } from '@/app/(page)/(root)/(admin)/_components/sidebar-items';
import { FilterItemProps } from '@/components/food/food-filter-case';
import {
    Layout,
    Pizza,
    Users,
    Contact,
    CreditCard,
    Store,
    Box
} from 'lucide-react';

export const ownerRoutes: SidebarItemProps[] = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/owner'
    },
    {
        icon: Pizza,
        label: 'Food Menu',
        href: '/owner/foods/menu'
    },
    {
        icon: Store,
        label: 'Inventory',
        href: '/owner/inventory'
    },
    {
        icon: Users,
        label: 'Employee',
        href: '/owner/employees'
    },
    {
        icon: Contact,
        label: 'Customers',
        href: '/owner/customers'
    },
    {
        icon: CreditCard,
        label: 'Payments',
        href: '/owner/payments'
    }
];

export const managerRoutes: SidebarItemProps[] = [
    {
        icon: Users,
        label: 'Staffs',
        href: '/manager'
    },
    {
        icon: Store,
        label: 'Inventory',
        href: '/manager/inventory'
    },
    {
        icon: Box,
        label: 'Orders',
        href: '/manager/employees'
    },
    {
        icon: Contact,
        label: 'Customers',
        href: '/owner/customers'
    }
];

export const filterByFields: FilterItemProps[] = [
    {
        name: 'Best seller'
    },
    {
        name: 'The Newest'
    }
];
