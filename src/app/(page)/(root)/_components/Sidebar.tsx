import { Logo } from './logo';

interface IProps {
    children?: React.ReactNode;
}

export const Sidebar = ({ children }: IProps) => {
    return (
        <div className='fixed z-50 flex  h-full w-56 -translate-x-56 flex-col transition-all duration-200 ease-linear md:translate-x-0'>
            <div className='flex min-h-full flex-col items-center overflow-y-auto bg-white shadow-xl'>
                <div className='flex h-[100px] items-center justify-center'>
                    <Logo />
                </div>
                {/* <div className='h-px w-full bg-gray-200' /> */}
                <div className='mt-5 flex w-full flex-col'>{children}</div>
            </div>
        </div>
    );
};
