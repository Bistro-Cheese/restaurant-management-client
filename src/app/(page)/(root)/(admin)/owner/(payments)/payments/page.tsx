'use client';

import Modal from 'react-modal';
import { useEffect } from 'react';
import { CreditCard } from 'lucide-react';

// components
import MethodCard from '../_components/MethodCard';
import CreateMethodModal from '../_components/CreateMethodModal';

// types
import PaymentType from '@/types/PaymentType';

// constants
import { accountImages } from '@/constants/image';

// hooks
import { useGetAllPayments } from '@/hooks/payment/use-get-payments';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import {
    setOpenModal,
    setPayment,
    setPayments
} from '@/redux/features/payment-slice';

export default function PaymentPage() {
    const dispatch = useAppDispatch();

    const { isOpenModal, payment } = useAppSelector(
        (state) => state.reducer.payment
    );

    const {
        payments: paymentsEntities,
        isPaymentsLoading,
        isPaymentsSuccess
    } = useGetAllPayments();

    const paymentsData = Object.values(paymentsEntities?.entities || {});

    const handleOpen = () => {
        dispatch(setPayment(null));
        dispatch(setOpenModal(true));
    };

    Modal.setAppElement('body');

    useEffect(() => {
        if (isPaymentsSuccess) {
            dispatch(setPayments(paymentsData as PaymentType[]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPaymentsSuccess]);

    if (isPaymentsLoading) {
        return <div>Loading All Payments...</div>;
    }

    return (
        <>
            <main className='p-8'>
                <div className='flex items-center justify-between gap-2'>
                    <h1 className='text-xl font-bold'>Account List</h1>

                    <div className='flex w-3/4 justify-end gap-4'>
                        <input
                            className='w-1/2 rounded-md px-4 py-1 outline outline-2 outline-gray-400'
                            placeholder='Search your account number...'
                        />

                        <button
                            onClick={handleOpen}
                            className='flex items-center justify-center gap-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'
                        >
                            <CreditCard className='h-5 w-5' />
                            <span className='hidden lg:inline-block'>
                                Add New Account
                            </span>
                        </button>
                    </div>
                </div>
                <div className='w-full overflow-x-auto'>
                    {paymentsData.map((payment, index) => (
                        <MethodCard
                            key={index}
                            payment={payment as PaymentType}
                            image={accountImages[index % 4]}
                        />
                    ))}
                </div>
            </main>

            <CreateMethodModal isOpen={isOpenModal} payment={payment} />
        </>
    );
}
