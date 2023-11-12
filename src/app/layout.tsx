import { ReduxProvider } from '@/redux/redux-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cheese Bistro | Restaurant Management',
    description: 'A Restaurant Management System for Cheese Bistro'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className='scroll-smooth'>
            <head>
                <link rel='icon' href='/cheese-logo.png' />
            </head>
            <body className={inter.className}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
