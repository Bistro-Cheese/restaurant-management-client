'use client';

import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import CheckoutModal from './_components/CheckoutModal';

import { cn } from '@/lib/utils';
import { OrderType } from '@/types/OrderType';
import {
    useDeleteOrderMutation,
    useGetOrdersQuery,
    useUpdateOrderStatusMutation
} from '@/redux/services/order-api';
import DiscountModal from '../_components/discount-modal/DiscountModal';
import { convertPriceToString } from '@/utils';
import BillModal from './_components/BillModal';
import { useGetBillByOrderIdMutation } from '@/redux/services/bill-api';
import { useUpdateTableMutation } from '@/redux/services/table-api';

const OrderListPage: React.FC = () => {
    Modal.setAppElement('body');

    const { data, isSuccess, isLoading, isFetching } = useGetOrdersQuery();

    const [isOpenCheckoutModal, setIsOpenCheckoutModal] = useState(false);
    const [isOpenDiscountModal, setIsOpenDiscountModal] = useState(false);
    const [isOpenBillModal, setIsOpenBillModal] = useState(false);

    const [filter, setFilter] = useState<number>(-1);

    const [tableId, setTableId] = useState<number>();
    const [orderId, setOrderId] = useState<string>('');
    const [total, setTotal] = useState<number>(0);

    const orders = Object.values(data?.entities || {}) as OrderType[];

    const [getBill] = useGetBillByOrderIdMutation();

    const [bill, setBill] = useState<any>(null);

    const [deleteOrder] = useDeleteOrderMutation();

    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const [updateTable] = useUpdateTableMutation();

    const handleCancelReversedOrder = (orderId: string) => {
        deleteOrder({
            order_id: orderId
        })
            .unwrap()
            .then((res) => {
                toast.success('Cancel successfully');
            });
    };

    const handleSetToReserved = (tableId: number) => {
        updateTable({
            id: tableId,
            status: 2
        })
            .unwrap()
            .then((res) => {
                toast.success('Set to Reserved successfully');
            });
    };

    const handleSetToPending = (orderId: string, tableId: number) => {
        updateOrderStatus({
            order_id: orderId,
            status: 1
        })
            .unwrap()
            .then((res) => {
                toast.success('Set to Pending successfully');
                updateTable({
                    id: tableId,
                    status: 1
                });
            });
    };

    const [filterOrders, setFilterOrders] = useState<OrderType[]>(orders);

    useEffect(() => {
        if (isSuccess) {
            switch (filter) {
                case 0:
                    setFilterOrders(
                        orders.filter((order) => order.status === 0)
                    );
                    break;
                case 1:
                    setFilterOrders(
                        orders.filter((order) => order.status === 1)
                    );
                    break;
                case 2:
                    setFilterOrders(
                        orders.filter((order) => order.status === 2)
                    );
                    break;
                default:
                    setFilterOrders(orders);
                    break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, isSuccess, isFetching]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Filter */}
            <div className='flex flex-col items-center p-4'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-xl'>Order Status: </h1>

                    <button
                        className={cn(
                            'w-24 rounded-md bg-gray-500 px-4 py-2 text-white',
                            {
                                'bg-gray-600 outline outline-2 outline-black':
                                    filter === -1
                            }
                        )}
                        onClick={() => setFilter(-1)}
                    >
                        All
                    </button>

                    <button
                        className={cn(
                            'rounded-md bg-yellow-500 px-4 py-2 text-white',
                            {
                                'bg-yellow-600 outline outline-2 outline-black':
                                    filter === 1
                            }
                        )}
                        onClick={() => setFilter(1)}
                    >
                        Pending
                    </button>
                    <button
                        className={cn(
                            'rounded-md bg-red-500 px-4 py-2 text-white',
                            {
                                'bg-red-600 outline outline-2 outline-black':
                                    filter === 0
                            }
                        )}
                        onClick={() => setFilter(0)}
                    >
                        Reversed
                    </button>
                    <button
                        className={cn(
                            'rounded-md bg-green-500 px-4 py-2 text-white',
                            {
                                'bg-green-600 outline outline-2 outline-black':
                                    filter === 2
                            }
                        )}
                        onClick={() => setFilter(2)}
                    >
                        Complete
                    </button>
                </div>
                <div className='mt-4 w-1/2 outline outline-1 outline-black'></div>
            </div>

            <div className='pb-8'>
                <div className='flex items-center justify-between px-4'>
                    <h1 className='text-2xl font-bold'>Order List</h1>
                </div>

                {filterOrders.length === 0 && (
                    <div className='w-full text-center'>
                        <h1 className='text-2xl font-bold'>
                            There is no order!
                        </h1>
                    </div>
                )}

                <div className='mt-4 grid grid-cols-4 gap-5 px-4'>
                    {isSuccess &&
                        filterOrders.map((order) => (
                            <div
                                key={order?.id}
                                className={cn(
                                    'inline-block w-full max-w-md rounded p-6 shadow-md',
                                    {
                                        'bg-red-200': order?.status === 0,
                                        'bg-harvest-gold-50':
                                            order?.status === 1,
                                        'bg-green-200': order?.status === 2
                                    }
                                )}
                            >
                                <h1 className='mb-4 text-2xl font-bold'>
                                    Order Table {order.tableNumber}
                                </h1>
                                <div>
                                    <p className='mb-2'>
                                        <strong>Number of Customers:</strong>{' '}
                                        {order.numberOfCustomer}
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Deposit:</strong>{' '}
                                        {convertPriceToString(
                                            order.deposit || 0
                                        )}{' '}
                                        VND
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Sub Total:</strong>{' '}
                                        {convertPriceToString(
                                            order.subTotal || 0
                                        )}{' '}
                                        VND
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Discount: </strong>
                                        {order.discountType === 0
                                            ? order.discountValue
                                            : convertPriceToString(
                                                  order.discountValue || 0
                                              )}

                                        {order.discountType === 0
                                            ? '%'
                                            : ' VND'}
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Total:</strong>{' '}
                                        {convertPriceToString(order.total || 0)}
                                        <span> VND</span>
                                    </p>
                                    <p className='mb-2'>
                                        <strong>Check-in time:</strong>{' '}
                                        {order.cusIn}
                                    </p>
                                </div>

                                <div className='flex justify-center gap-4'>
                                    {order.status === 0 && (
                                        <>
                                            <Button
                                                className='mt-4'
                                                variant='outline'
                                                onClick={() =>
                                                    handleCancelReversedOrder(
                                                        order.id
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>

                                            {order.tableStatus === 0 && (
                                                <Button
                                                    className='mt-4'
                                                    variant='outline'
                                                    onClick={() =>
                                                        handleSetToReserved(
                                                            order.tableId
                                                        )
                                                    }
                                                >
                                                    Set to Reserved
                                                </Button>
                                            )}

                                            {order.tableStatus === 2 && (
                                                <Button
                                                    className='mt-4'
                                                    variant='outline'
                                                    onClick={() =>
                                                        handleSetToPending(
                                                            order.id,
                                                            order.tableId
                                                        )
                                                    }
                                                >
                                                    Set to Pending
                                                </Button>
                                            )}
                                        </>
                                    )}

                                    {order?.status === 1 && (
                                        <>
                                            <Button
                                                className='mt-4'
                                                variant='outline'
                                                onClick={() => {
                                                    setTableId(order.tableId);
                                                    setIsOpenDiscountModal(
                                                        true
                                                    );
                                                }}
                                            >
                                                Apply Discount
                                            </Button>

                                            <Button
                                                className='mt-4'
                                                variant='outline'
                                                onClick={() => {
                                                    setIsOpenCheckoutModal(
                                                        true
                                                    );
                                                    setTotal(order.total);
                                                    setOrderId(order.id);
                                                }}
                                            >
                                                Check-out
                                            </Button>
                                        </>
                                    )}

                                    {order?.status === 2 && (
                                        <Button
                                            className='mt-4'
                                            variant='outline'
                                            onClick={() => {
                                                getBill(order.id)
                                                    .unwrap()
                                                    .then((res) => {
                                                        setBill(res.data[0]);
                                                        setIsOpenBillModal(
                                                            true
                                                        );
                                                    });
                                            }}
                                        >
                                            Bill
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <CheckoutModal
                isOpen={isOpenCheckoutModal}
                setIsOpen={setIsOpenCheckoutModal}
                orderId={orderId}
                total={total}
            />

            <DiscountModal
                isOpen={isOpenDiscountModal}
                setIsOpen={setIsOpenDiscountModal}
                tableId={tableId}
            />

            <BillModal
                isOpen={isOpenBillModal}
                setIsOpen={setIsOpenBillModal}
                bill={bill}
            />
        </div>
    );
};

export default OrderListPage;
