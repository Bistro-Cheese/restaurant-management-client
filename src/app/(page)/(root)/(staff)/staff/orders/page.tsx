'use client';
import Modal from 'react-modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetOrdersQuery } from '@/redux/services/order-api';
import { OrderType } from '@/types/OrderType';
import CheckoutModal from './_components/CheckoutModal';
import { useState } from 'react';

const OrderListPage: React.FC = () => {
    Modal.setAppElement('body');

    const { data } = useGetOrdersQuery();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderId, setOrderId] = useState<string>('');
    const [total, setTotal] = useState<number>(0);

    const orders = Object.values(data?.entities || {}) as OrderType[];

    return (
        <>
            <div className='flex flex-wrap gap-4 p-4'>
                {orders.map((order) => (
                    <div
                        key={order?.id}
                        className={cn('max-w-md rounded p-6 shadow-md', {
                            'bg-red-200': order?.status === 0,
                            'bg-harvest-gold-50': order?.status === 1,
                            'bg-green-200': order?.status === 2
                        })}
                    >
                        <h1 className='mb-4 text-2xl font-bold'>Order</h1>
                        <div>
                            <p className='mb-2'>
                                <strong>Table Number:</strong>{' '}
                                {order.tableNumber}
                            </p>
                            <p className='mb-2'>
                                <strong>Number of Customers:</strong>{' '}
                                {order.numberOfCustomer}
                            </p>
                            <p className='mb-2'>
                                <strong>Deposit:</strong> {order.deposit}
                            </p>
                            <p className='mb-2'>
                                <strong>Sub Total:</strong> {order.subTotal}
                            </p>
                            <p className='mb-2'>
                                <strong>Total:</strong> {order.total}
                            </p>
                            <p className='mb-2'>
                                <strong>Check-in time:</strong> {order.cusIn}
                            </p>
                        </div>
                        <div className='flex justify-center gap-4'>
                            {order?.status === 0 && (
                                <>
                                    <Button
                                        className='mt-4'
                                        variant='outline'
                                        onClick={() => {}}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className='mt-4'
                                        variant='outline'
                                        onClick={() => {}}
                                    >
                                        Set to Reserved
                                    </Button>
                                </>
                            )}
                            {order?.status === 1 && (
                                <>
                                    <Button
                                        className='mt-4'
                                        variant='outline'
                                        onClick={() => {
                                            setIsOpenModal(true);
                                            setTotal(order.total);
                                            setOrderId(order.id);
                                        }}
                                    >
                                        Check-out
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <CheckoutModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                orderId={orderId}
                total={total}
            />
        </>
    );
};

export default OrderListPage;
