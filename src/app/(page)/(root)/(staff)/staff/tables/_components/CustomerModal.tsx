import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { ModalStyles } from '@/constants/modalStyle';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';

import { setCustomer, setTableId } from '@/redux/features/order-slice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type ModalType = {
    name: string;
    phoneNumber: string;
    numberOfCustomer: number;
    reversed: boolean;
    checkin: string;
};

const initialModalState: ModalType = {
    name: '',
    phoneNumber: '',
    numberOfCustomer: 0,
    reversed: false,
    checkin: ''
};

export default function CustomerModal({ isOpen, setIsOpen }: IProps) {
    const [modalState, setModalState] = useState<ModalType>(initialModalState);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const { tableId } = useAppSelector((state) => state.reducer.order);

    const handleClose = () => {
        dispatch(setTableId(-1));
        setModalState(initialModalState);
        setIsOpen(false);
    };

    const handleConfirm = () => {
        if (modalState.name === '') {
            toast.error('Name is required');
            return;
        }

        if (modalState.phoneNumber === '') {
            toast.error('Phone number is required');
            return;
        }

        if (modalState.numberOfCustomer === 0) {
            toast.error('Number of customer is required');
            return;
        }

        if (modalState.reversed && modalState.checkin === '') {
            toast.error('Check-in time is required');
            return;
        }

        dispatch(
            setCustomer({
                customerName: modalState.name,
                phoneNumber: modalState.phoneNumber,
                numberOfCustomer: modalState.numberOfCustomer,
                status: modalState.reversed ? 0 : 1,
                checkInTime: modalState.checkin
            })
        );

        setIsOpen(false);

        router.push(`/staff/tables/${tableId}`);
    };

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value
            .split('T')
            .join(' ')
            .replaceAll('-', '/');

        setModalState({
            ...modalState,
            checkin: newDate + ':00'
        });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleClose} style={ModalStyles}>
            <div className='p-5'>
                <Heading title='Customer' description='' />

                <div className='mt-4 space-y-4'>
                    <div>
                        <p>Name:</p>
                        <input
                            value={modalState.name}
                            onChange={(e) => {
                                setModalState({
                                    ...modalState,
                                    name: e.target.value
                                });
                            }}
                            placeholder='Enter customer name'
                            className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                        />
                    </div>

                    <div>
                        <p>Phone number: </p>
                        <input
                            value={modalState.phoneNumber}
                            onChange={(e) => {
                                if (isNaN(Number(e.target.value))) return;

                                if (e.target.value.length > 10) return;

                                setModalState({
                                    ...modalState,
                                    phoneNumber: e.target.value
                                });
                            }}
                            placeholder='Enter phone number'
                            className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                        />
                    </div>

                    <div>
                        <p>Number of customer: </p>
                        <input
                            value={modalState.numberOfCustomer}
                            onChange={(e) => {
                                if (isNaN(Number(e.target.value))) return;

                                setModalState({
                                    ...modalState,
                                    numberOfCustomer: Number(e.target.value)
                                });
                            }}
                            placeholder='Enter number of customer'
                            className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                        />
                    </div>

                    <div className='h-28'>
                        <div className='flex items-center gap-2'>
                            <p>Reversed:</p>
                            <input
                                checked={modalState.reversed}
                                onChange={(e) => {
                                    setModalState({
                                        ...modalState,
                                        reversed: e.target.checked
                                    });
                                }}
                                type='checkbox'
                                className='mt-1 h-5 w-5'
                            />
                        </div>

                        {modalState.reversed && (
                            <div className='mt-4'>
                                <p>Check-in time: </p>

                                <input
                                    type='datetime-local'
                                    className='w-full rounded px-3 py-1 text-tertiary outline outline-1 outline-gray-400'
                                    placeholder='mm/DD/yyyy hh:mm:ss'
                                    onChange={handleChangeDate}
                                />
                            </div>
                        )}
                    </div>

                    <div className='mt-4 flex justify-center focus:outline-2 focus:outline-harvest-gold-300'>
                        <Button className='w-full' onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
