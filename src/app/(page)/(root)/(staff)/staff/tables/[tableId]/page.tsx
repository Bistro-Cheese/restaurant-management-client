'use client';

import { useGetAllFoods } from '@/hooks/food/use-get-foods';
import OrderMenu from '../../_components/order-menu/OrderMenu';
import OrderSummary from '../../_components/order-summary/OrderSummary';
import { useGetOrderByTableIdMutation } from '@/redux/services/order-api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { useEffect } from 'react';
import { setOrder, setTableId } from '@/redux/features/order-slice';

interface OrderTableProps {
    params: {
        tableId: number;
    };
}

const OrderPage: React.FC<OrderTableProps> = ({ params }: OrderTableProps) => {
    const dispatch = useAppDispatch();

    const { foods, isFoodsLoading } = useGetAllFoods();

    const [getOrderByTableId] = useGetOrderByTableIdMutation();

    const { isUpdate } = useAppSelector((state) => state.reducer.order);

    useEffect(() => {
        if (isUpdate) {
            getOrderByTableId(params.tableId)
                .unwrap()
                .then((res) => {
                    dispatch(setOrder(res.data));
                    dispatch(setTableId(params.tableId));
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdate]);

    if (isFoodsLoading) {
        return <div>Loading All Foods...</div>;
    }

    return (
        <>
            <OrderMenu foods={foods?.entities} />
            <OrderSummary />
        </>
    );
};

export default OrderPage;
