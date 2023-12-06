'use client';

import { Header } from '@/components/header';
import Navbar from './_components/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <div className='h-screen '>
                <div className='fixed z-50 h-[80px] w-full'>
                    <Header>
                        <Navbar />
                    </Header>
                </div>
                <main className='pt-[80px]'>{children}</main>
            </div>
        </Provider>
    );
};

export default StaffLayout;
