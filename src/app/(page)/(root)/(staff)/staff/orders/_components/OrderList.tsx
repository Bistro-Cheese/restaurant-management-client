import { FC } from 'react';
import OrderCard from './common/OrderCard';
import { useSelector } from 'react-redux';

import { OrderLineState } from '@/redux/features/order-line-slice';
import { RootState } from '@/redux/store';

const OrderList = () => {
    const orderLines = useSelector(
        (state: RootState) => state.orderLinesReducer.orderLines
    );
    console.log('orderlines:::', orderLines);

    return (
        <ul className='flex h-[420px] w-full flex-col space-y-8 overflow-y-scroll py-3'>
            {/* {Object.keys(orderLines).map((item, id) => {
                return (
                    <li key={orderLines[item].id}>
                        <OrderCard
                            key={orderLines[item].id}
                            id={orderLines[item].id}
                            name={orderLines[item].name}
                            category={orderLines[item].category}
                            productImage={orderLines[item].productImage}
                            price={orderLines[item].price}
                        />
                    </li>
                );
            })} */}

            {orderLines?.map((item) => (
                <li key={item.id}>
                    <OrderCard orderLine={item} />
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
