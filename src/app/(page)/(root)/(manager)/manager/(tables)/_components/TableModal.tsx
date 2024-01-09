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

// modal
import { ModalType, initialModalState } from '../tables/page';
import { useUpdateTable } from '@/hooks/table/use-update-table';

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
    // isOpen: boolean;
    // setIsOpen: Dispatch<SetStateAction<boolean>>;
    modalState: ModalType;
    setModalState: Dispatch<SetStateAction<ModalType>>;
}

export default function TableModal({
    // isOpen,
    // setIsOpen,
    modalState,
    setModalState
}: IProps) {
    const {
        createTable,
        isCreateTableLoading,
        isCreateTableSuccess,
        isCreateTableError,
        createTableData,
        createTableError
    } = useCreateTable();

    const {
        updateTable,
        isUpdateTableLoading,
        isUpdateTableSuccess,
        isUpdateTableError,
        updateTableData,
        updateTableError
    } = useUpdateTable();

    const handleClose = () => {
        setModalState(initialModalState);
    };

    useEffect(() => {
        if (isCreateTableSuccess) {
            toast.success(createTableData.message, CustomToastOptions);
            setModalState(initialModalState);
        }
    }, [isCreateTableSuccess]);

    useEffect(() => {
        if (isCreateTableError) {
            toast.error(
                (createTableError as any).data.message,
                CustomToastOptions
            );
        }
    }, [isCreateTableError]);

    useEffect(() => {
        if (isUpdateTableSuccess) {
            toast.success(updateTableData.message, CustomToastOptions);
            setModalState(initialModalState);
        }
    }, [isUpdateTableSuccess]);

    useEffect(() => {
        if (isUpdateTableError) {
            toast.error(
                (updateTableError as any).data.message,
                CustomToastOptions
            );
        }
    }, [isUpdateTableError]);

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
        });
    };

    const handleUpdateTable = () => {
        updateTable({
            id: modalState.tableId,
            seats: parseInt(modalState.seats)
        });
    };

    return (
        <Modal
            isOpen={modalState.isOpen}
            onRequestClose={handleClose}
            style={customModalStyles}
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
