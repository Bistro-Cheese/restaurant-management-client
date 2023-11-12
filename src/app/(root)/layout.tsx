'use client';

import Header from './_components/Header';

export default function LandingPageLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='w-full'>
            <Header />
            {children}
        </div>
    );
}
