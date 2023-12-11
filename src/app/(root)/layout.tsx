'use client';

import { Suspense } from 'react';
import Footer from './_components/Footer';
import Header from './_components/Header';
import Loading from '../(page)/(root)/(admin)/owner/foods/menu/loading';

export default function LandingPageLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='w-full'>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
