'use client';

import { useGetAllFoods } from '@/hooks/food/use-get-foods';
import OrderMenu from '../../_components/order-menu/OrderMenu';
import OrderSummary from '../../_components/order-summary/OrderSummary';

interface OrderTableProps {
    params: {
        tableId: number;
    };
}

const OrderPage: React.FC<OrderTableProps> = () => {
    const { foods, isFoodsLoading, isFoodsSuccess } = useGetAllFoods();

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
