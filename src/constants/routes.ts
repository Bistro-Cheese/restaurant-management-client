import SidebarItemType from '@/types/SidebarItemType';
import { Layout, Pizza, Users, CreditCard, Store } from 'lucide-react';
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from 'react-icons/md';
import { BiSolidFoodMenu, BiFoodMenu } from 'react-icons/bi';
import { RiGroupFill, RiGroupLine } from 'react-icons/ri';
import { BsCreditCard2Front, BsCreditCard2FrontFill } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { MdOutlineInventory2, MdInventory2 } from 'react-icons/md';
import { IRoute } from '@/types/navigation';

export const paths = {
    owner: {
        dashboard: '/owner',
        foodMenu: '/owner/foods/menu',
        employees: '/owner/employees',
        payments: '/owner/payments'
    },
    manager: {
        timekeeping: '/manager/timekeeping',
        inventory: '/manager/inventory'
    },
    staff: {
        orders: '/staff/orders',
        tables: '/staff/tables'
    }
};

export const ownerRoutes: IRoute[] = [
    {
        icon: MdOutlineSpaceDashboard,
        iconActive: MdSpaceDashboard,
        name: 'Dashboard',
        path: '/owner'
    },
    {
        icon: BiFoodMenu,
        iconActive: BiSolidFoodMenu,
        name: 'Food Menu',
        path: '/owner/foods/menu'
    },
    {
        icon: RiGroupLine,
        iconActive: RiGroupFill,
        name: 'Employee',
        path: '/owner/employees'
    },
    {
        icon: BsCreditCard2Front,
        iconActive: BsCreditCard2FrontFill,
        name: 'Payments',
        path: '/owner/payments'
    }
];

export const managerRoutes: IRoute[] = [
    {
        icon: RiGroupLine,
        iconActive: RiGroupFill,
        name: 'Staffs',
        path: '/manager/timekeeping'
    },
    {
        icon: MdOutlineInventory2,
        iconActive: MdInventory2,
        name: 'Inventory',
        path: '/manager/inventory'
    }
];
