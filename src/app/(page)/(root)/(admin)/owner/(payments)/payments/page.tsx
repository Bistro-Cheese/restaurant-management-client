'use client';

import { CreditCard } from 'lucide-react';

import MethodCard from '../_components/MethodCard';
import { useGetAllPayments } from '@/hooks/payment/use-get-payments';
import PaymentType from '@/types/PaymentType';
import { accountImages } from '@/constants/image';
import CreateMethodModal from '../_components/CreateMethodModal';

export default function PaymentPage() {
    const { payments, isPaymentsLoading, isPaymentsSuccess } =
        useGetAllPayments();

    if (isPaymentsLoading) {
        return <div>Loading All Payments...</div>;
    }

    if (isPaymentsSuccess) {
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

                            <button className='flex items-center justify-center gap-2 rounded bg-green-300 px-4 py-2 text-white'>
                                <CreditCard className='h-5 w-5' />
                                <span className='hidden lg:inline-block'>
                                    Add New Account
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='w-full overflow-x-auto'>
                        {payments &&
                            Object.values(payments.entities).map(
                                (payment, index) => {
                                    return (
                                        <MethodCard
                                            key={payment?.id}
                                            payment={payment as PaymentType}
                                            image={accountImages[index]}
                                        />
                                    );
                                }
                            )}
                    </div>
                </main>

                {/* <CreateMethodModal /> */}
            </>
        );
    }
}
