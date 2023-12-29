'use client';
import { Header } from '@/app/(page)/(root)/_components/Header';

import { SidebarRoutes } from '../_components/SidebarRoutes';
import { Sidebar } from '../../_components/Sidebar';
import { usePathname } from 'next/navigation';
import { UnauthenticateLayout } from '@/hoc/unauthenticate-layout';
import Layout from '../../_components/Layout';

const ManagerLayout: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    return (
        <UnauthenticateLayout>
            <Layout>{children}</Layout>
        </UnauthenticateLayout>
    );
};

export default ManagerLayout;
