import SidebarItemType from '@/types/SidebarItemType';
import { Layout, Pizza, Users, CreditCard, Store } from 'lucide-react';

export const ownerRoutes: SidebarItemType[] = [
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
        icon: Users,
        label: 'Employee',
        href: '/owner/employees'
    },
    {
        icon: CreditCard,
        label: 'Payments',
        href: '/owner/payments'
    }
];

export const managerRoutes: SidebarItemType[] = [
    {
        icon: Users,
        label: 'Staffs',
        href: '/manager/timekeeping'
    },
    {
        icon: Store,
        label: 'Inventory',
        href: '/manager/inventory'
    }
];
