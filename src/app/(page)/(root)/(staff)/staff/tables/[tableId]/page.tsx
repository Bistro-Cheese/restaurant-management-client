'use client';

import OrderPage from '../../_components/OrderPage';

interface OrderTableProps {
    params: {
        tableId: number;
    };
}

const OrderTable: React.FC<OrderTableProps> = ({ params }) => {
    return <OrderPage />;
};

export default OrderTable;
