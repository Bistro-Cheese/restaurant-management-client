import Modal from 'react-modal';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Heading } from '@/components/heading';

import { ModalStyles } from '@/constants/modalStyle';
import { CustomToastOptions } from '@/constants/toast';

import { useCreateBill } from '@/hooks/bill/use-create-bill';
import { useGetAllPayments } from '@/hooks/payment/use-get-payments';

import PaymentType from '@/types/PaymentType';

interface IProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    orderId: string;
    total: number;
}

type ModalStateType = {
    paymentType: number;
    paid: number;
    methodId: string;
};

const initiaModallState: ModalStateType = {
    paymentType: 0,
    paid: 0,
    methodId: ''
};

export default function CheckoutModal({
    isOpen,
    setIsOpen,
    orderId,
    total
}: IProps) {
    const [modalState, setModalState] =
        useState<ModalStateType>(initiaModallState);

    const { payments } = useGetAllPayments();

    const data = Object.values(payments?.entities || {}) as PaymentType[];

    const { createBill, isLoading } = useCreateBill();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        createBill({
            order_id: orderId,
            payment_type: modalState.paymentType,
            paid: modalState.paid,
            method_id: modalState.methodId
        })
            .unwrap()
            .then((res: any) => {
                toast.success('Checkout successfully!', CustomToastOptions);
                setIsOpen(false);
                setModalState(initiaModallState);
            })
            .catch((err: any) => {
                toast.error(err.data.message, CustomToastOptions);
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleClose} style={ModalStyles}>
            <div className='p-5'>
                <Heading title='Checkout' description='' />

                <div className='mt-4'>
                    <div>
                        <p>Payment Type: </p>
                        <select
                            value={modalState.paymentType}
                            onChange={(e) => {
                                setModalState({
                                    ...modalState,
                                    paymentType: Number(e.target.value),
                                    paid: total,
                                    methodId: data[0].id.toString() || ''
                                });
                            }}
                            className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                        >
                            <option value={0}>Cash Payment</option>
                            <option value={1}>Transfer Payment</option>
                        </select>
                    </div>
                </div>

                <div className='mt-4'>
                    {modalState.paymentType === 0 && (
                        <div>
                            <p>Paid: </p>
                            <input
                                value={modalState.paid}
                                onChange={(e) => {
                                    if (!isNaN(Number(e.target.value))) {
                                        setModalState({
                                            ...modalState,
                                            paid: 0
                                        });
                                    }
                                    setModalState({
                                        ...modalState,
                                        paid: Number(e.target.value)
                                    });
                                }}
                                placeholder='Enter amount paid'
                                className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                            />
                        </div>
                    )}

                    {modalState.paymentType === 1 && (
                        <div>
                            <p>Payment Method: </p>
                            <select
                                value={modalState.methodId}
                                onChange={(e) => {
                                    setModalState({
                                        ...modalState,
                                        paid: total,
                                        methodId: e.target.value
                                    });
                                }}
                                className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                            >
                                {data.map((payment) => (
                                    <option key={payment.id} value={payment.id}>
                                        {payment.methodName}{' '}
                                        {payment.accountNumber}{' '}
                                        {payment.accountHolderName}{' '}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className='mt-4 flex justify-center gap-4'>
                    <button
                        className='rounded-md bg-red-500 px-4 py-2 text-white'
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className='rounded-md bg-green-500 px-4 py-2 text-white'
                        onClick={handleConfirm}
                    >
                        {isLoading ? 'Loading...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
