import { Separator } from '@/components/ui/separator';
import { RiCoupon4Line } from 'react-icons/ri';
import { TbShoppingCartCheck } from 'react-icons/tb';

const OrderTotal = () => {
    return (
        <div className='mt-4 flex w-full flex-col bg-white'>
            <div>
                <div className='flex justify-between'>
                    <h1 className='font-medium text-muted-foreground'>
                        Sub Total
                    </h1>
                    <h1 className='text-base font-bold'>200.000</h1>
                </div>

                <div className='flex justify-between'>
                    <h1 className='font-medium text-muted-foreground'>
                        Discount
                    </h1>

                    <h1 className='text-base font-bold text-green-400'>
                        200.000
                    </h1>
                </div>
            </div>

            <div className='mt-4 flex items-center justify-around rounded-md bg-[#ffea76] px-6 py-3 outline outline-2 outline-[#FFDC2E]'>
                <h1 className='text-center font-semibold'>Find Promotion</h1>

                <button
                    onClick={() => {}}
                    className='group rounded-md bg-yellow-400 px-6 py-3 duration-100 ease-linear hover:bg-yellow-300 active:scale-95 active:opacity-70'
                >
                    <div className='flex items-center justify-between gap-2 duration-100 ease-linear'>
                        <RiCoupon4Line />
                        <p className='font-semibold '>Add Coupon</p>
                    </div>
                </button>
            </div>

            <div className='mt-4 flex justify-between'>
                <h1 className='text-xl font-semibold'>Total</h1>
                <h2 className='text-xl font-bold text-red-500'>400.000</h2>
            </div>

            <button className='group m-auto mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-green-400 px-6 py-3 duration-100 ease-linear hover:bg-green-200 active:scale-95 active:opacity-70'>
                <span className='flex items-center justify-center gap-4 text-lg'>
                    <TbShoppingCartCheck className='text-xl' />
                    <p className='font-bold'>Place Order</p>
                </span>
            </button>
        </div>
    );
};

export default OrderTotal;
