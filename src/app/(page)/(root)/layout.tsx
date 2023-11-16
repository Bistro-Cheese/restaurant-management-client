import { Header } from '@/components/header';
import { Sidebar } from './(admin)/_components/sidebar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>

            <div className='h-[80px] z-50 w-full fixed'>
                <Header />
            </div>

            <div className='fixed z-50 hidden h-full  w-56 flex-col md:flex pt-[80px]'>
                <Sidebar />
            </div>

            <main className='h-full pt-[80px] md:pl-56'>{children}</main>
        </div>
    );
};

export default RootLayout;
