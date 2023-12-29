import { MdOutlineSpaceDashboard, MdSpaceDashboard } from 'react-icons/md';
import { BsCreditCard2Front, BsCreditCard2FrontFill } from 'react-icons/bs';
import { IRoute } from '@/types/navigation';
import { BiCheese, BiSolidCheese } from 'react-icons/bi';
import { HiOutlineUserGroup, HiUserGroup } from 'react-icons/hi2';
import { MdOutlineWarehouse, MdWarehouse } from 'react-icons/md';

export const paths = {
    owner: {
        dashboard: '/owner/dashboard',
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
        path: '/owner/dashboard'
    },
    {
        icon: BiCheese,
        iconActive: BiSolidCheese,
        name: 'Food Menu',
        path: '/owner/foods/menu'
    },
    {
        icon: HiOutlineUserGroup,
        iconActive: HiUserGroup,
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
        icon: HiOutlineUserGroup,
        iconActive: HiUserGroup,
        name: 'Staffs',
        path: '/manager/timekeeping'
    },
    {
        icon: MdOutlineWarehouse,
        iconActive: MdWarehouse,
        name: 'Inventory',
        path: '/manager/inventory'
    }
];
