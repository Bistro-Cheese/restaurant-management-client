import { Logo } from './logo';

interface IProps {
    children?: React.ReactNode;
}

export const Sidebar = ({ children }: IProps) => {
    return (
        <div className='fixed left-0 top-0 z-50 flex  h-screen w-[94px] -translate-x-full flex-col overflow-y-auto transition-all duration-200 ease-linear md:translate-x-0 lgl:w-56'>
            <div className='flex min-h-full flex-col items-center overflow-y-auto bg-white shadow-xl'>
                <div className='flex h-[100px] w-full pl-6'>
                    <Logo />
                </div>
                {/* <div className='h-px w-full bg-gray-200' /> */}
                <div className='flex w-full flex-col'>{children}</div>
            </div>
        </div>
    );
};
