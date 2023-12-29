'use client';
import { UnauthenticateLayout } from '@/hoc/unauthenticate-layout';
import { Header } from '../../_components/Header';
import { SidebarRoutes } from '../_components/SidebarRoutes';
import { Sidebar } from '../../_components/Sidebar';
import { getActiveRoute } from '@/utils/navigation';
import { managerRoutes, ownerRoutes } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import Layout from '../../_components/Layout';

const OwnerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <UnauthenticateLayout>
            <Layout>{children}</Layout>
        </UnauthenticateLayout>
    );
};

export default OwnerLayout;
