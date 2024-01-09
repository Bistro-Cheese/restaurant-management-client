import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal, { Styles } from 'react-modal';

// components
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';

// hooks
import { useCreateTable } from '@/hooks/table/use-create-table';

// constants
import { CustomToastOptions } from '@/constants/toast';
import { ModalStyles } from '@/constants/modalStyle';

// modal
import { ModalType, initialModalState } from '../tables/page';
import { useUpdateTable } from '@/hooks/table/use-update-table';

interface IProps {
    modalState: ModalType;
    setModalState: Dispatch<SetStateAction<ModalType>>;
}

export default function TableModal({ modalState, setModalState }: IProps) {
    const { createTable, isCreateTableLoading } = useCreateTable();

    const { updateTable, isUpdateTableLoading } = useUpdateTable();

    const handleClose = () => {
        setModalState(initialModalState);
    };

    const handleChangeTableNumber = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setModalState((prev) => ({
                ...prev,
                tableNumber: ''
            }));
            return;
        }

        const inputNumber = parseInt(e.target.value);

        if (inputNumber >= 0) {
            setModalState((prev) => ({
                ...prev,
                tableNumber: inputNumber.toString()
            }));
        }
    };

    const handleChangeSeats = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setModalState((prev) => ({
                ...prev,
                seats: ''
            }));
            return;
        }

        const inputNumber = parseInt(e.target.value);

        if (inputNumber >= 0) {
            setModalState((prev) => ({
                ...prev,
                seats: inputNumber.toString()
            }));
        }
    };

    const handleAddTable = () => {
        createTable({
            tableNumber: parseInt(modalState.tableNumber),
            seats: parseInt(modalState.seats)
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message, CustomToastOptions);
                setModalState(initialModalState);
            })
            .catch((err) => {
                toast.error(err.data.message, CustomToastOptions);
            });
    };

    const handleUpdateTable = () => {
        updateTable({
            id: modalState.tableId,
            seats: parseInt(modalState.seats)
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message, CustomToastOptions);
                setModalState(initialModalState);
            })
            .catch((err) => {
                toast.error(err.data.message, CustomToastOptions);
            });
    };

    return (
        <Modal
            isOpen={modalState.isOpen}
            onRequestClose={handleClose}
            style={ModalStyles}
        >
            <div className='p-5'>
                <Heading
                    title={modalState.isUpdate ? 'Edit Table' : 'Add Table'}
                    description=''
                />

                <div className='mt-4 space-y-4'>
                    <div className=''>
                        <p>Table number: </p>
                        <input
                            className='mt-2 rounded p-2 outline outline-1 outline-gray-300'
                            placeholder='Enter table number'
                            value={modalState.tableNumber}
                            onChange={handleChangeTableNumber}
                            disabled={modalState.isUpdate}
                        />
                    </div>
                    <div className=''>
                        <p>Seats: </p>
                        <input
                            className='mt-2 rounded p-2 outline outline-1 outline-gray-300'
                            placeholder='Enter number of seats'
                            value={modalState.seats}
                            onChange={handleChangeSeats}
                        />
                    </div>
                </div>

                <div className='mt-4 flex justify-center '>
                    {modalState.isUpdate ? (
                        <Button className='w-full' onClick={handleUpdateTable}>
                            {isUpdateTableLoading ? 'Loading...' : 'Edit'}
                        </Button>
                    ) : (
                        <Button className='w-full' onClick={handleAddTable}>
                            {isCreateTableLoading ? 'Loading...' : 'Add'}
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
