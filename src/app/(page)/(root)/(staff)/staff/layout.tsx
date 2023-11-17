import { Header } from '@/components/header';
import Navbar from './_components/Navbar';

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <div className='fixed inset-y-0 z-50 h-[80px] w-full'>
                <Header>
                    <Navbar />
                </Header>
            </div>
            <main className='h-full pt-[80px]'>{children}</main>
        </div>
    );
};

export default StaffLayout;
