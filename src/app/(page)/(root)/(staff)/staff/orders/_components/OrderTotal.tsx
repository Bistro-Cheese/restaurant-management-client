import { Separator } from '@/components/ui/separator';
import { RiCoupon4Line } from 'react-icons/ri';
import { TbShoppingCartCheck } from 'react-icons/tb';
import { MdOutlineDiscount } from 'react-icons/md';

const OrderTotal = () => {
    return (
        <div className='mt-4 flex w-full flex-col justify-center bg-white'>
            <div>
                <div className='flex justify-between'>
                    <span className='font-medium text-muted-foreground'>
                        Sub Total
                    </span>
                    <span className='text-base font-bold'>200.000</span>
                </div>

                <div className='flex justify-between'>
                    <span className='font-medium text-muted-foreground'>
                        Discount
                    </span>

                    <span className='text-base font-bold text-green-500'>
                        200.000
                    </span>
                </div>
            </div>

            <div className='group mt-4 inline-flex items-center justify-center gap-4 rounded-md px-4 py-2'>
                <button className=' inline-flex min-w-full items-center justify-center'>
                    <span className='text-harvest-gold-600 flex items-center justify-center gap-4 text-lg font-semibold duration-150 ease-linear group-hover:scale-105 group-active:scale-95 group-active:opacity-70'>
                        <MdOutlineDiscount />
                        <span>Available discount</span>
                    </span>
                </button>
            </div>

            <div className='mt-4 flex justify-between'>
                <span className='text-xl font-semibold'>Total</span>
                <span className='text-xl font-bold text-red-500'>400.000</span>
            </div>

            <div className='group mt-4 cursor-pointer'>
                <button className=' inline-flex min-w-full items-center justify-center rounded-md bg-gradient-active bg-size-200 bg-pos-100 px-6 py-3 drop-shadow-lg duration-100 ease-linear group-hover:bg-pos-0 group-active:scale-95 group-active:opacity-70'>
                    <span className='flex items-center justify-center gap-4 text-lg '>
                        <TbShoppingCartCheck className='h-7 w-7 text-white' />
                        <span className='font-bold text-white'>
                            Place Order
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default OrderTotal;
