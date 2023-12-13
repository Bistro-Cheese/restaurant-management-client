import { Separator } from '@/components/ui/separator';
import { TbShoppingCartCheck } from 'react-icons/tb';
import { MdOutlineDiscount } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { OrderLineType, OrderType } from '@/types';
import { setInitialOrder } from '@/redux/features/order-slice';
import { RootState } from '@/redux/store';
import { convertPriceToString } from '@/utils';
import {
    useCreateOrderMutation,
    useUpdateOrderMutation
} from '@/redux/services/order-api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { create } from 'domain';
import { createTableOrder } from '@/redux/features/table-order-slice';
import { useCreateOrder } from '@/hooks/order/use-create-order';
import { useUpdateOrder } from '@/hooks/order/use-update-order';

interface OrderLineRequest {
    food_id: string;
    quantity: number;
}

const getSubTotal = (orderLines: OrderLineType[]) => {
    let totalQuantity = 0;
    let subTotalPrice = 0;

    orderLines.forEach((orderLine) => {
        totalQuantity += orderLine.quantity!;
        subTotalPrice += Number(orderLine.price)! * orderLine.quantity!;
    });

    return { subTotalPrice, totalQuantity };
};

const convertToOrderLinesRequestType = (orderLines: OrderLineType[]) => {
    let orderLinesRequest: OrderLineRequest[] = [];

    orderLines.forEach((orderLine) => {
        orderLinesRequest.push({
            food_id: orderLine.id,
            quantity: orderLine.quantity
        });
    });

    return orderLinesRequest;
};

const OrderTotal = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const tableOrders = useSelector(
        (state: RootState) => state.reducer.tableOrder.tableOrders
    );

    const order = useSelector((state: RootState) => state.reducer.order);

    const quantity = getSubTotal(order.orderLines).totalQuantity;
    const subTotalPrice = convertPriceToString(
        getSubTotal(order.orderLines).subTotalPrice
    );

    const {
        createOrder,
        isCreatingLoading,
        isCreatedSuccess,
        isCreatingError,
        creatingError
    } = useCreateOrder();

    const {
        updateOrder,
        isUpdatingLoading,
        isUpdatedSuccess,
        isUpdatedError,
        updatedError
    } = useUpdateOrder();

    useEffect(() => {
        if (isCreatedSuccess || isUpdatedSuccess) {
            router.refresh();
            router.push('/staff/tables');
            toast.success('Create new order successfully!');
        }
    }, [isCreatedSuccess, isUpdatedSuccess]);

    const handleCreateNewOrder = async () => {
        if (order.orderLines.length > 0) {
            dispatch(createTableOrder(order));

            let orderLinesDataRequest: OrderLineRequest[] =
                convertToOrderLinesRequestType(order.orderLines);

            let orderDataRequest = {
                table_id: order.tableId,
                order_lines: orderLinesDataRequest
            };

            tableOrders.find(
                (tableOrder) => tableOrder.tableId === order.tableId
            )
                ? await updateOrder(orderDataRequest)
                : await createOrder(orderDataRequest);

            console.log('order created already:::', orderDataRequest);
        } else {
            alert('Please add at least one item to place order!');
        }
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
                        onClick={() => handleCreateNewOrder()}
                        className=' inline-flex min-w-full items-center justify-center rounded-md bg-harvest-gold-600 px-6 py-3 drop-shadow-lg duration-100 ease-linear group-hover:bg-harvest-gold-500 group-active:scale-95 group-active:opacity-70'
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
