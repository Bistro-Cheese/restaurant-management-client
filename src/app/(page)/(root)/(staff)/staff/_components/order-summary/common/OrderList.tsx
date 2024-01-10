import OrderLineCard from './OrderLineCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const OrderList: React.FC = () => {
    const orderLines = useSelector(
        (state: RootState) => state.reducer.order.orderLines
    );

    return (
        <ul className='flex grow flex-col space-y-1 overflow-y-auto overflow-x-hidden py-1'>
            {orderLines?.map((item) => (
                <li key={item.id}>
                    <OrderLineCard orderLine={item} />
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
