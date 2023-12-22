
import { Header } from '@/components/header';
import Navbar from './_components/Navbar';
import { UnauthenticateLayout } from '@/hoc/unauthenticate-layout';

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <UnauthenticateLayout>
            <div>
                <div className='h-screen '>
                    <div className='fixed z-50 h-[80px] w-full'>
                        <Header>
                            <Navbar />
                        </Header>
                    </div>
                    <main className='pt-[80px]'>{children}</main>
                </div>
            </div>

        </UnauthenticateLayout>

    );
};

export default StaffLayout;
