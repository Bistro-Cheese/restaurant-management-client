import OrderLineCard from './OrderLineCard';

import { useAppSelector } from '@/hooks/redux-hook';

const OrderList = () => {
    const { orderLines } = useAppSelector((state) => state.reducer.order);

    return (
        <ul className='flex grow flex-col space-y-1 overflow-y-auto overflow-x-hidden py-1'>
            {orderLines.map((item: any) => (
                <li key={item.id}>
                    <OrderLineCard orderLine={item} />
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
