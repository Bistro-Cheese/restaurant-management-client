import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { IoClose } from 'react-icons/io5';

export const ModalHeader: React.FC<{
    title?: React.ReactNode;
    description?: string;
    className?: string;
    onCloseModal: () => void;
    [key: string]: any;
}> = (props) => {
    const { title, description, className, onCloseModal, ...rest } = props;

    return (
        <div
            {...rest}
            className={cn('relative block w-full flex-shrink-0 p-4', className)}
        >
            <div className='relative flex items-center justify-between'>
                <div className='block w-20 grow'>
                    {typeof title === 'string' ? (
                        <p className='truncate text-ellipsis text-lg font-bold text-tertiary sml:text-xl lg:text-2xl'>
                            {title}
                        </p>
                    ) : (
                        title
                    )}

                    {description && <p>{description}</p>}
                </div>

                <div className='block'>
                    <button
                        onClick={() => {
                            onCloseModal();
                        }}
                        className='inline-flex items-center justify-center rounded-sm bg-gray-200 p-1 text-tertiary shadow transition-all duration-200 ease-in-out active:bg-gray-200/70'
                    >
                        <IoClose className='h-4 w-4 sml:h-5 sml:w-5 lg:h-6 lg:w-6' />
                    </button>
                </div>
            </div>
            {/* <Separator className='absolute bottom-0 bg-mediumSilver' /> */}
        </div>
    );
};

export const ModalContent: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = (props) => {
    const { children, className } = props;
    return (
        <>
            <Separator className='h-[0.5px] w-full bg-gray-300' />
            <div
                className={cn(
                    'flex max-h-[70vh] w-full grow flex-col overflow-y-auto overflow-x-hidden py-4',
                    className
                )}
            >
                {children}
            </div>
            <Separator className='h-[0.5px] w-full bg-gray-300' />
        </>
    );
};

export const ModalFooter: React.FC<{
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}> = (props) => {
    const { className, children, ...rest } = props;

    return (
        <div
            {...rest}
            className={cn('block w-full flex-shrink-0 p-4', className)}
        >
            <div className='relative flex items-center justify-end gap-2'>
                {/* <Separator className='absolute bottom-0 bg-mediumSilver' /> */}
                {children}
            </div>
        </div>
    );
};
