'use client';

import Modal from 'react-modal';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import CheckoutModal from './_components/CheckoutModal';

import { cn } from '@/lib/utils';
import { OrderType } from '@/types/OrderType';
import { useGetOrdersQuery } from '@/redux/services/order-api';
import DiscountModal from '../_components/discount-modal/DiscountModal';
import { convertPriceToString } from '@/utils';
import BillModal from './_components/BillModal';
import { useGetBillByOrderIdMutation } from '@/redux/services/bill-api';

const OrderListPage: React.FC = () => {
    Modal.setAppElement('body');

    const { data } = useGetOrdersQuery();

    const [isOpenCheckoutModal, setIsOpenCheckoutModal] = useState(false);
    const [isOpenDiscountModal, setIsOpenDiscountModal] = useState(false);
    const [isOpenBillModal, setIsOpenBillModal] = useState(false);

    const [tableId, setTableId] = useState<number>();
    const [orderId, setOrderId] = useState<string>('');
    const [total, setTotal] = useState<number>(0);

    const orders = Object.values(data?.entities || {}) as OrderType[];

    const [getBill, { data: billData, isLoading }] =
        useGetBillByOrderIdMutation();

    const [bill, setBill] = useState<any>(null);

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
                        <h1 className='mb-4 text-2xl font-bold'>
                            Order Table {order.tableNumber}
                        </h1>
                        <div>
                            <p className='mb-2'>
                                <strong>Number of Customers:</strong>{' '}
                                {order.numberOfCustomer}
                            </p>
                            <p className='mb-2'>
                                <strong>Deposit:</strong> {order.deposit}
                            </p>
                            <p className='mb-2'>
                                <strong>Sub Total:</strong>{' '}
                                {convertPriceToString(order.subTotal || 0)}{' '}
                                <span> VND</span>
                            </p>
                            <p className='mb-2'>
                                <strong>Discount: </strong>
                                {order.discountType === 0
                                    ? order.discountValue
                                    : convertPriceToString(
                                          order.discountValue || 0
                                      )}

                                {order.discountType === 0 ? '%' : ' VND'}
                            </p>
                            <p className='mb-2'>
                                <strong>Total:</strong>{' '}
                                {convertPriceToString(order.total || 0)}
                                <span> VND</span>
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
                                            setTableId(order.tableId);
                                            setIsOpenDiscountModal(true);
                                        }}
                                    >
                                        Apply Discount
                                    </Button>

                                    <Button
                                        className='mt-4'
                                        variant='outline'
                                        onClick={() => {
                                            setIsOpenCheckoutModal(true);
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
                                                setIsOpenBillModal(true);
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
        </>
    );
};

export default OrderListPage;
