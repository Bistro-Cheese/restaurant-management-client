import React from 'react';

interface OrderDetailProps {
    orderId: string | null;
}

const OrderLineList: React.FC<OrderDetailProps> = ({ orderId }) => {
    return <div>Order Line List</div>;
};

export default OrderLineList;
