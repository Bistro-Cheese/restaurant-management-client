import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { ReduxProvider } from '@/redux/redux-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cheese Bistro | Restaurant Management',
    description: 'A Restaurant Management System for Cheese Bistro',
    icons: '/images/cheese-logo.png'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className='scroll-smooth'>
            <head>
                <link rel='icon' href='/images/cheese-logo.png' />
            </head>
            <body className={inter.className}>
                <ReduxProvider>
                    {children}
                    <Toaster />
                </ReduxProvider>
            </body>
        </html>
    );
}
