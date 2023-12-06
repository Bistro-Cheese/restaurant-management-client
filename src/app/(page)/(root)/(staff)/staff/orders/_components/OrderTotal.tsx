import { Separator } from '@/components/ui/separator';
import { RiCoupon4Line } from 'react-icons/ri';
import { TbShoppingCartCheck } from 'react-icons/tb';
import { MdOutlineDiscount } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { OrderLineType } from '@/types';
import { OrderLineState } from '@/redux/features/order-line-slice';
import { RootState } from '@/redux/store';

const getSubTotal = (orderLines: OrderLineType[]) => {
    let totalQuantity = 0;
    let subTotalPrice = 0;

    orderLines.forEach((orderLine) => {
        totalQuantity += orderLine.quantity!;
        subTotalPrice += Number(orderLine.price)! * orderLine.quantity!;
    });

    return { subTotalPrice, totalQuantity };
};

const OrderTotal = () => {
    const orderLines = useSelector(
        (state: RootState) => state.orderLinesReducer.orderLines
    );

    const quantity = getSubTotal(orderLines).totalQuantity;
    const subTotalPrice = getSubTotal(orderLines)
        .subTotalPrice.toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');

    return (
        <div className='flex w-full flex-col justify-center bg-white'>
            <div>
                <div className='flex justify-between'>
                    <span className='font-medium text-muted-foreground'>
                        Sub Total
                    </span>
                    <span className='text-base font-bold'>{subTotalPrice}</span>
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
                    <span className='flex items-center justify-center gap-4 text-lg font-semibold text-harvest-gold-600 duration-150 ease-linear group-hover:scale-105 group-active:scale-95 group-active:opacity-70'>
                        <MdOutlineDiscount />
                        <span>Available discount</span>
                    </span>
                </button>
            </div>

            <div className='mt-4 flex justify-between'>
                <span className='text-xl font-semibold'>Total</span>
                <span className='text-xl font-bold text-red-500'>999999</span>
            </div>

            <div className='group mt-4 cursor-pointer'>
                <button className=' inline-flex min-w-full items-center justify-center rounded-md bg-green-500 px-6 py-3 drop-shadow-lg duration-100 ease-linear group-hover:bg-green-400 group-active:scale-95 group-active:opacity-70'>
                    <span className='flex items-center justify-center gap-4 text-lg '>
                        <TbShoppingCartCheck className='h-7 w-7 text-white' />
                        <span className='font-bold uppercase text-white'>
                            Place Order
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default OrderTotal;
