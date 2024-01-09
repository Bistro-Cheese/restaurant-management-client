'use client';

import Modal from 'react-modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Hooks
import { useGetInventory } from '@/hooks/inventory/use-get-inventory';

// Components
import InventoryList from '../_components/inventory-list';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import IngredientModal from '../_components/IngredientModal';
import InventoryModal from '../_components/InventoryModal';

// Enums
import { DryUnitEnum } from '@/enums/Inventory';
import { InventoryType } from '@/types';
import { paths } from '@/constants/routes';

export type IngredientModalType = {
    id: string;
    name: string;
    type: number;
    unit: string;
    supplier: string;
    isOpen: boolean;
    isUpdate: boolean;
};

export const initialIngredientModalState: IngredientModalType = {
    id: '',
    name: '',
    type: 0,
    unit: DryUnitEnum.KILOGRAM,
    supplier: '',
    isOpen: false,
    isUpdate: false
};

const Inventory = () => {
    Modal.setAppElement('body');

    const router = useRouter();

    const { inventory, isInventoryLoading } = useGetInventory();

    const inventoryList = Object.values(
        inventory?.entities || {}
    ) as InventoryType[];

    const [modalState, setModalState] = useState<IngredientModalType>(
        initialIngredientModalState
    );

    const [inventoryModalOpen, setInventoryModalOpen] = useState(false);

    const handleAddIngredient = () => {
        setModalState({
            ...initialIngredientModalState,
            isOpen: true
        });
    };

    const handleImportExport = () => {
        setInventoryModalOpen(true);
    };

    return (
        <>
            <div className='px-6 py-4'>
                <div className='mb-4 flex justify-between'>
                    <div className='flex gap-4'>
                        <Heading title='Ingredients List' description='' />
                        <Button onClick={handleAddIngredient}>
                            Add Ingredient
                        </Button>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <Button onClick={handleImportExport}>
                            Import / Export
                        </Button>
                        <Button onClick={() => router.push(paths.manager.logs)}>
                            Logs
                        </Button>
                    </div>
                </div>

                <InventoryList
                    setModalState={setModalState}
                    inventoryList={inventoryList}
                    isInventoryLoading={isInventoryLoading}
                />
            </div>

            <IngredientModal
                modalState={modalState}
                setModalState={setModalState}
            />

            <InventoryModal
                inventoryList={inventoryList}
                isOpen={inventoryModalOpen}
                setIsOpen={setInventoryModalOpen}
            />
        </>
    );
};

export default Inventory;
