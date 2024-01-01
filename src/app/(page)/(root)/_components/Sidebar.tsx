import Image from 'next/image';
import Link from 'next/link';
import { AnimationControls, motion } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import useWindowDimensions from '@/hooks/use-window-dimensions';

interface SideBarProps {
    children: React.ReactNode;
    isSidebarOpen?: boolean;
    handleOpenSidebar?: () => void;
    handleCloseSidebar?: () => void;
}

export const Sidebar: React.FC<SideBarProps> = (props) => {
    const { height, width } = useWindowDimensions();

    return (
        <motion.div
            className={cn(
                'group fixed left-0 top-0 flex h-screen min-h-screen w-[210px] max-w-[210px] -translate-x-full flex-col transition-all duration-300 ease-in-out lg:translate-x-0',
                props.isSidebarOpen
                    ? 'w-[210px] max-w-[210px]'
                    : 'w-[74px] max-w-[74px]'
            )}
        >
            <motion.button
                onClick={
                    props.isSidebarOpen
                        ? props.handleCloseSidebar
                        : props.handleOpenSidebar
                }
                className={cn(
                    'absolute right-0 top-[88px] z-10 inline-flex h-6 w-6 -translate-y-[50%] translate-x-[50%] items-center justify-center rounded-lg bg-white text-sm text-tertiary drop-shadow-lg transition-all duration-300 ease-in-out',
                    !props.isSidebarOpen
                        ? 'visible rotate-180 opacity-100'
                        : 'invisible opacity-0 group-hover:visible group-hover:opacity-100',
                    width <= 959 && 'hidden'
                )}
            >
                <FaChevronLeft />
            </motion.button>
            <div className='flex min-h-full flex-col items-center overflow-y-auto bg-white shadow-xl'>
                <div className='flex h-[100px] w-full pl-4'>
                    <Link href='#' className='flex items-center'>
                        <div className='relative h-10 w-10 shrink-0'>
                            <Image
                                src='/cheese-logo.png'
                                alt='cheese-logo'
                                fill
                                className=' object-cover object-center'
                            />
                        </div>
                        <motion.span
                            // animate={props.controlText}
                            className={cn(
                                'ml-2 inline-block font-primary text-xl  font-bold text-tertiary transition-all ease-in-out',
                                props.isSidebarOpen
                                    ? 'visible opacity-100 delay-300 duration-300'
                                    : 'invisible opacity-0 duration-0'
                            )}
                        >
                            Cheese Bistro
                        </motion.span>
                    </Link>
                </div>

                {/* <div className='h-px w-full bg-gray-200' /> */}
                <div className='flex w-full flex-col'>{props.children}</div>
            </div>
        </motion.div>
    );
};
