import Modal from 'react-modal';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { ModalStyles } from '@/constants/modalStyle';
import { InventoryType } from '@/types';
import toast from 'react-hot-toast';
import { CustomToastOptions } from '@/constants/toast';
import { useUpdateStock } from '@/hooks/inventory/use-update-inventory-stock';

type InventoryModalType = {
    inventoryId: string;
    type: number;
    quantity: string;
};

interface IProps {
    inventoryList: InventoryType[];
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function InventoryModal({
    inventoryList,
    isOpen,
    setIsOpen
}: IProps) {
    const initialInventoryModalState = {
        inventoryId: '',
        type: 0,
        quantity: ''
    };

    const [modalState, setModalState] = useState<InventoryModalType>(
        initialInventoryModalState
    );

    const { updateStock, isUpdateStockLoading } = useUpdateStock();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
        setModalState({
            ...modalState,
            type: Number(e.target.value)
        });
    };

    const handleChangeIngredient = (e: ChangeEvent<HTMLSelectElement>) => {
        setModalState({
            ...modalState,
            inventoryId: e.target.value
        });
    };

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setModalState((prev) => ({
                ...prev,
                quantity: ''
            }));
            return;
        }

        const inputNumber = parseInt(e.target.value);

        if (inputNumber >= 0) {
            setModalState((prev) => ({
                ...prev,
                quantity: inputNumber.toString()
            }));
        }
    };

    const handleImportExport = () => {
        if (
            modalState.quantity === '' ||
            modalState.quantity === '0' ||
            modalState.inventoryId === ''
        ) {
            toast.error('Please fill up all the fields', CustomToastOptions);
            return;
        }

        updateStock({
            inventory_id: modalState.inventoryId,
            type: modalState.type,
            quantity: Number(modalState.quantity)
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message, CustomToastOptions);
                setModalState(initialInventoryModalState);
                setIsOpen(false);
            })
            .catch((err) => {
                toast.error(err.data.message, CustomToastOptions);
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleClose} style={ModalStyles}>
            <div className='p-5'>
                <Heading title='Import / Export' description='' />

                <div className='mt-4 space-y-4'>
                    <div>
                        <p>Type:</p>
                        <select
                            value={modalState.type}
                            onChange={handleChangeType}
                            className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                        >
                            <option value={0}>Import</option>
                            <option value={1}>Export</option>
                        </select>
                    </div>

                    <div>
                        <p>Ingredient: </p>
                        <select
                            value={modalState.inventoryId}
                            onChange={handleChangeIngredient}
                            className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                        >
                            <option disabled value=''>
                                Choose ingredient to{' '}
                                {modalState.type === 0 ? 'import' : 'export'}
                            </option>
                            {inventoryList.map((inventory) => (
                                <option key={inventory.id} value={inventory.id}>
                                    {inventory.ingredientName} ({inventory.unit}
                                    )
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p>Quantity: </p>
                        <input
                            value={modalState.quantity}
                            onChange={handleChangeQuantity}
                            className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                        />
                    </div>

                    <div className='mt-4 flex justify-center focus:outline-2 focus:outline-harvest-gold-300'>
                        <Button className='w-full' onClick={handleImportExport}>
                            {isUpdateStockLoading
                                ? 'Loading...'
                                : modalState.type === 0
                                ? 'Import'
                                : 'Export'}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
