/* eslint-disable react-hooks/exhaustive-deps */
import toast from 'react-hot-toast';
import Modal, { Styles } from 'react-modal';
import { ChangeEvent, useEffect, useState } from 'react';

// Constants
import PaymentType from '@/types/PaymentType';
import {
    Bank,
    EWallet,
    TransferMethodEnum,
    TransferMethodEnumValue
} from '@/constants/enum';
import { PaymentMessage } from '@/constants/message';
import { CustomToastOptions } from '@/constants/toast';

// Redux
import { useAppDispatch } from '@/hooks/redux-hook';
import { createPayment, setOpenModal } from '@/redux/features/payment-slice';
import {
    useCreatePaymentMutation,
    useUpdatePaymentMutation
} from '@/redux/services/payment-api';

const customModalStyles: Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 100,
        cursor: ''
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '0',
        border: 'none',
        outline: 'none',
        zIndex: 101
    }
};

interface IProps {
    isOpen: boolean;
    payment: PaymentType | null;
}

type ModalType = Omit<PaymentType, 'id'>;

export default function CreateMethodModal({ isOpen, payment }: IProps) {
    const dispatch = useAppDispatch();

    const intitalModalState: ModalType = {
        methodType: TransferMethodEnumValue.BANK_TRANSFER,
        methodName: Bank.BIDV,
        accountHolderName: '',
        accountNumber: '',
        isActive: true
    };

    const [modalState, setModalState] = useState<ModalType>(intitalModalState);

    const [createPaymentMutation, { isSuccess: isCreatePaymentSuccess }] =
        useCreatePaymentMutation();

    const [updatePaymentMutation, { isSuccess: isUpdatePaymentSuccess }] =
        useUpdatePaymentMutation();

    useEffect(() => {
        setModalState({
            methodType: payment
                ? payment.methodType
                : TransferMethodEnumValue.BANK_TRANSFER,
            methodName: payment ? payment.methodName : Bank.BIDV,
            accountHolderName: payment ? payment.accountHolderName : '',
            accountNumber: payment ? payment.accountNumber : '',
            isActive: payment ? payment.isActive : true
        });
    }, [payment]);

    useEffect(() => {
        if (isCreatePaymentSuccess) {
            toast.success(PaymentMessage.CREATE_SUCCESS, CustomToastOptions);
            dispatch(createPayment({ ...modalState }));
            setModalState(intitalModalState);
            dispatch(setOpenModal(false));
        }
    }, [isCreatePaymentSuccess]);

    useEffect(() => {
        if (isUpdatePaymentSuccess) {
            toast.success(PaymentMessage.UPDATE_SUCCESS, CustomToastOptions);
            setModalState(intitalModalState);
            dispatch(setOpenModal(false));
        }
    }, [isUpdatePaymentSuccess]);

    const handleClose = () => {
        setModalState(intitalModalState);
        dispatch(setOpenModal(false));
    };

    const handleChangeMethodType = (e: ChangeEvent<HTMLSelectElement>) => {
        setModalState({
            ...modalState,
            methodType: parseInt(e.target.value, 10)
        });
    };

    const handleChangeMethodName = (e: ChangeEvent<HTMLSelectElement>) => {
        setModalState({
            ...modalState,
            methodName: e.target.value
        });
    };

    const handleChangeAccountNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            accountNumber: e.target.value
        });
    };

    const handleChangeAccountHolderName = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setModalState({
            ...modalState,
            accountHolderName: e.target.value
        });
    };

    const handleChangeStatus = () => {
        setModalState({
            ...modalState,
            isActive: !modalState.isActive
        });
    };

    const handleSubmit = () => {
        if (!payment) {
            createPaymentMutation({
                ...modalState
            } as PaymentType);
        } else {
            updatePaymentMutation({
                ...modalState,
                id: payment.id
            } as PaymentType);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={customModalStyles}
        >
            <div className='p-4'>
                <h1 className='text-3xl font-bold'>Transfer Method</h1>
                <div className=''>
                    <div className='mt-4 flex items-center justify-between gap-4'>
                        {/* Payment Type */}
                        <div className='w-40'>
                            <select
                                className='w-full rounded px-4 py-1 outline outline-2 outline-gray-400'
                                value={modalState.methodType}
                                onChange={handleChangeMethodType}
                            >
                                <option
                                    value={
                                        TransferMethodEnumValue.BANK_TRANSFER
                                    }
                                >
                                    {TransferMethodEnum.BANK_TRANSFER}
                                </option>
                                <option
                                    value={
                                        TransferMethodEnumValue.DIGITAL_WALLET
                                    }
                                >
                                    {TransferMethodEnum.DIGITAL_WALLET}
                                </option>
                            </select>
                        </div>

                        {/* Active */}
                        <div className=''>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    className='h-5 w-5 rounded'
                                    checked={modalState.isActive}
                                    onChange={handleChangeStatus}
                                />
                                <span className='ml-2'>Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className='mt-4'>
                        <select
                            className='w-full rounded px-4 py-1 outline outline-2 outline-gray-400'
                            placeholder='Enter name...'
                            value={modalState.methodName}
                            onChange={handleChangeMethodName}
                        >
                            {modalState.methodType ===
                            TransferMethodEnumValue.BANK_TRANSFER
                                ? Object.keys(Bank).map((bank, index) => (
                                      <option key={index} value={bank}>
                                          {bank}
                                      </option>
                                  ))
                                : Object.keys(EWallet).map((ewallet, index) => (
                                      <option key={index} value={ewallet}>
                                          {ewallet}
                                      </option>
                                  ))}
                        </select>
                    </div>

                    {/* Account Number */}
                    <div className='mt-4'>
                        <input
                            className='w-full rounded px-4 py-1 outline outline-2 outline-gray-400'
                            placeholder='Enter account number...'
                            value={modalState.accountNumber}
                            onChange={handleChangeAccountNumber}
                        />
                    </div>

                    {/* Account Name */}
                    <div className='mt-4'>
                        <input
                            className='w-full rounded px-4 py-1 outline outline-2 outline-gray-400'
                            placeholder='Enter account holder name...'
                            value={modalState.accountHolderName}
                            onChange={handleChangeAccountHolderName}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className='flex items-center justify-center gap-4'>
                    <button
                        onClick={handleClose}
                        className='mt-4 w-full rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className='mt-4 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
                    >
                        {payment ? 'Update' : 'Create'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
