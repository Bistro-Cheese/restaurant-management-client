import Image from 'next/image';
import Link from 'next/link';
import { AnimationControls, motion } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import useWindowDimensions from '@/hooks/use-window-dimensions';

interface SideBarProps {
    children: React.ReactNode;
    isCollapseSideBar?: boolean;
    controlSidebar?: AnimationControls;
    controlText?: AnimationControls;
    hanldeExpandSideBar?: () => void;
    hanldeCollapseSideBar?: () => void;
}

export const Sidebar: React.FC<SideBarProps> = (props) => {
    const { height, width } = useWindowDimensions();

    return (
        <motion.div
            animate={props.controlSidebar}
            className='group fixed left-0 top-0 flex h-screen min-h-screen w-[210px] max-w-[210px] -translate-x-full  flex-col transition-all duration-200 ease-linear lg:translate-x-0'
        >
            <motion.button
                onClick={
                    props.isCollapseSideBar
                        ? props.hanldeExpandSideBar
                        : props.hanldeCollapseSideBar
                }
                className={cn(
                    'absolute right-0 top-[88px] z-10 inline-flex h-6 w-6 -translate-y-[50%] translate-x-[50%] items-center justify-center rounded-lg bg-white text-sm text-tertiary drop-shadow-lg transition-all duration-150 ease-linear',
                    props.isCollapseSideBar
                        ? 'visible rotate-180 opacity-100'
                        : 'invisible opacity-0 group-hover:visible group-hover:opacity-100',
                    width <= 959 && 'hidden'
                )}
            >
                <FaChevronLeft />
            </motion.button>
            <div className='flex min-h-full flex-col items-center overflow-y-auto bg-white shadow-xl'>
                <div className='flex h-[100px] w-full pl-4'>
                    <Link
                        href='#'
                        className='flex items-center transition-all duration-200 ease-linear'
                    >
                        <div className='relative h-10 w-10 shrink-0'>
                            <Image
                                src='/cheese-logo.png'
                                alt='cheese-logo'
                                fill
                                className=' object-cover object-center'
                            />
                        </div>
                        <motion.span
                            animate={props.controlText}
                            className='ml-2 inline-block font-primary text-xl font-bold text-tertiary'
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
