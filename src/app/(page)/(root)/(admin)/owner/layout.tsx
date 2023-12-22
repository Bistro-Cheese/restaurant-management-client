import { UnauthenticateLayout } from '@/hoc/unauthenticate-layout';
import { Sidebar } from '../_components/sidebar';
import { Header } from '@/components/header';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <UnauthenticateLayout>
            <div className='h-full'>
                <div className='fixed z-50 h-[80px] w-full'>
                    <Header>
                        <></>
                    </Header>
                </div>

                <div className='fixed z-50 hidden h-full  w-56 flex-col pt-[80px] md:flex'>
                    <Sidebar />
                </div>

                <main className='h-full pt-[80px] md:pl-56'>
                    {children}
                </main>
            </div>
        </UnauthenticateLayout>
    );
};

export default RootLayout;
