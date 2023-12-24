import { Header } from '@/app/(page)/(root)/_components/Header';
import Navbar from './_components/Navbar';
import { UnauthenticateLayout } from '@/hoc/unauthenticate-layout';

const StaffLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <UnauthenticateLayout>
            <div className='flex h-full w-full flex-col'>
                <Header>
                    <Navbar />
                </Header>
                <main className='min-h-screen w-full px-3'>{children}</main>
                {/* <div className='absolute -left-6 -top-6 -z-10 h-[40rem] w-[15rem] rounded-full bg-primary blur-[10rem]'></div> */}
            </div>
        </UnauthenticateLayout>
    );
};

export default StaffLayout;
