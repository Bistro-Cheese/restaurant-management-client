'use client';

import OrderSidebar from './_components/OrderSidebar';
import OrderLayout from './layout';

const OrderPage = () => {
    return (
        <OrderLayout>
            <p>OrderPage</p>
            <OrderSidebar />
        </OrderLayout>
    );
};

export default OrderPage;
