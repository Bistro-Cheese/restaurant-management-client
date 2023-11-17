'use client';

import OrderCard from './common/OrderCard';

interface OrderListProps {
    orders: any;
}

const OrderList = ({ orders }: OrderListProps) => {
    return (
        <div className='flex items-center justify-center'>
            <div className='min-w-full'>
                <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-md'>
                    <table className='min-w-full bg-white text-left text-base text-gray-500'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-semibold text-gray-900'
                                >
                                    ORDER ID
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-semibold text-gray-900'
                                >
                                    CREATED
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-semibold text-gray-900'
                                >
                                    STAFF
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-semibold text-gray-900'
                                >
                                    TABLE ID
                                </th>

                                <th
                                    scope='col'
                                    className='px-6 py-4 font-semibold text-gray-900'
                                >
                                    AMOUNT
                                </th>

                                <th
                                    scope='col'
                                    className='px-6 py-4 font-semibold text-gray-900'
                                >
                                    STATUS
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-semibold text-gray-900'
                                ></th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                            {Object.keys(orders).map((item, id) => {
                                return (
                                    <OrderCard
                                        key={orders[item].id}
                                        id={orders[item].id}
                                        staffOrder={orders[item].staffOrder}
                                        status={orders[item].status}
                                        tableId={orders[item].tableId}
                                        orderDate={orders[item].orderDate}
                                        amount={orders[item].amount}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
