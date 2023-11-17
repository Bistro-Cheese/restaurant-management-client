'use client';

import OrderLineList from '../components/OrderDetail';

interface OrderProps {
    params: {
        orderId: string;
    };
}

const OrderDetail: React.FC<OrderProps> = ({ params }) => {
    return (
        // <div className='flex-col'>
        //     <div className='flex-1 space-y-4 p-8 pt-6'>
        //         <OrderLineList orderId={params.orderId} />
        //     </div>
        // </div>
        <OrderLineList orderId={params.orderId} />
    );
};

export default OrderDetail;
