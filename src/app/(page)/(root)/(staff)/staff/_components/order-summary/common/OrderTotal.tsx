import { Separator } from '@/components/ui/separator';
import { TbShoppingCartCheck } from 'react-icons/tb';
import { MdOutlineDiscount } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { OrderLineType, OrderType } from '@/types';
import { setInitialOrderLines } from '@/redux/features/order-line-slice';
import { RootState } from '@/redux/store';
import { convertPriceToString } from '@/utils/convert-price-to-string';
import { useCreateNewOrderMutation } from '@/redux/services/order-api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const getSubTotal = (orderLines: OrderLineType[]) => {
    let totalQuantity = 0;
    let subTotalPrice = 0;

    orderLines.forEach((orderLine) => {
        totalQuantity += orderLine.quantity!;
        subTotalPrice += Number(orderLine.price)! * orderLine.quantity!;
    });

    return { subTotalPrice, totalQuantity };
};

interface OrderTotalProps {
    tableId: number | null;
}

interface OrderLineRequest {
    foodId: string;
    quantity: number;
}

const ConvertOrderLineType = (orderLines: OrderLineType[]) => {
    let orderLinesRequest: OrderLineRequest[] = [];

    orderLines.forEach((orderLine) => {
        orderLinesRequest.push({
            foodId: orderLine.id,
            quantity: orderLine.quantity
        });
    });

    return orderLinesRequest;
};

const OrderTotal = ({ tableId }: OrderTotalProps) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const orderLines = useSelector(
        (state: RootState) => state.reducer.orderLine.orderLines
    );

    const quantity = getSubTotal(orderLines).totalQuantity;
    const subTotalPrice = convertPriceToString(
        getSubTotal(orderLines).subTotalPrice
    );

    const [
        createNewOrder,
        {
            isLoading: isCreatingLoading,
            isSuccess: isCreatedSuccess,
            isError: isCreatingError,
            error: creatingError
        }
    ] = useCreateNewOrderMutation();

    useEffect(() => {
        if (isCreatedSuccess) {
            console.log('isCreatedSuccess:::', isCreatedSuccess);
            router.refresh();
            router.push('/staff/tables');
            toast.success('Create new order successfully!');
        }
    }, [isCreatedSuccess]);

    const handleCreateNewOrder = async (data: OrderLineType[]) => {
        if (data) {
            let orderLinesRequest: OrderLineRequest[] =
                ConvertOrderLineType(data);

            let order = {
                tableId,
                orderLines: orderLinesRequest
            };

            console.log('order created already:::', order);

            createNewOrder({ ...order });
            dispatch(setInitialOrderLines({ orderLines: [] }));
        } else {
            console.log('create order:::', data);
        }

        console.log('data order created:::', data);
    };

    return (
        <div className='relative block w-full flex-shrink-0 bg-white'>
            <Separator className='absolute top-0 bg-mediumSilver' />

            <div className='flex flex-col px-4 pb-6 pt-4'>
                <div className=''>
                    <div className='flex justify-between'>
                        <span className='font-medium text-muted-foreground'>
                            Sub Total
                        </span>
                        <span className='text-base font-bold'>
                            {subTotalPrice}
                        </span>
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
                    <span className='text-xl font-bold'>Total</span>
                    <span className='text-xl font-black text-harvest-gold-600'>
                        {subTotalPrice}
                        <span className='text-base font-black text-harvest-gold-600'>
                            &#8363;
                        </span>
                    </span>
                </div>

                <div className='group mt-4 cursor-pointer'>
                    <button
                        onClick={() => handleCreateNewOrder(orderLines)}
                        className=' inline-flex min-w-full items-center justify-center rounded-md bg-green-500 px-6 py-3 drop-shadow-lg duration-100 ease-linear group-hover:bg-green-400 group-active:scale-95 group-active:opacity-70'
                    >
                        <span className='flex items-center justify-center gap-4 text-lg '>
                            <TbShoppingCartCheck className='h-7 w-7 text-white' />
                            <span className='font-bold uppercase text-white'>
                                Place Order
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderTotal;
