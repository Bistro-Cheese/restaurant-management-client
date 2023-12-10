import { Separator } from '@/components/ui/separator';

const OrderHeader = () => {
    return (
        <div className='block w-full flex-shrink-0'>
            <div className='relative flex items-center justify-center'>
                <div className='inline-block py-4'>
                    <span className='text-3xl font-black'>Order Summary</span>
                </div>

                <Separator className='absolute bottom-0 bg-mediumSilver' />
            </div>
        </div>
    );
};

export default OrderHeader;
