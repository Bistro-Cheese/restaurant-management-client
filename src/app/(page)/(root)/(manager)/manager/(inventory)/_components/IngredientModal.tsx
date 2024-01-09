import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal, { Styles } from 'react-modal';

// components
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    IngredientModalType,
    initialIngredientModalState
} from '../inventory/page';

// enums
import {
    IngredientTypeEnum,
    DryUnitEnum,
    LiquidUnitEnum
} from '@/enums/Inventory';

// hooks
import useCreateIngredient from '@/hooks/ingredient/use-create-ingredient';
import useUpdateIngredient from '@/hooks/ingredient/use-update-ingredient';

// constants
import { CustomToastOptions } from '@/constants/toast';
import { ModalStyles } from '@/constants/modalStyle';

interface IProps {
    modalState: IngredientModalType;
    setModalState: Dispatch<SetStateAction<IngredientModalType>>;
}

export default function IngredientModal({ modalState, setModalState }: IProps) {
    const { createIngredient, isAddIngredientLoading } = useCreateIngredient();

    const { updateIngredient, isUpdateIngredientLoading } =
        useUpdateIngredient();

    const handleClose = () => {
        setModalState(initialIngredientModalState);
    };

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            name: e.target.value
        });
    };

    const handelChangeSupplier = (e: ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            supplier: e.target.value
        });
    };

    const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
        setModalState({
            ...modalState,
            type: Number(e.target.value)
        });
    };

    const handleChangeUnit = (e: ChangeEvent<HTMLSelectElement>) => {
        setModalState({
            ...modalState,
            unit: e.target.value
        });
    };

    const handleAddIngredient = () => {
        if (modalState.name === '' || modalState.supplier === '') {
            toast.error('Please fill up all the fields', CustomToastOptions);
            return;
        }
        createIngredient({
            name: modalState.name,
            ingredient_type: modalState.type,
            unit: modalState.unit,
            supplier: modalState.supplier
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message, CustomToastOptions);
                setModalState(initialIngredientModalState);
            })
            .catch((err) => {
                toast.error(err.data.message, CustomToastOptions);
            });
    };

    const handleEditIngredient = () => {
        if (modalState.name === '' || modalState.supplier === '') {
            toast.error('Please fill up all the fields', CustomToastOptions);
            return;
        }
        updateIngredient({
            id: modalState.id,
            body: {
                name: modalState.name,
                ingredient_type: modalState.type,
                unit: modalState.unit,
                supplier: modalState.supplier
            }
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message, CustomToastOptions);
                setModalState(initialIngredientModalState);
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
                    title={
                        modalState.isUpdate
                            ? 'Edit Ingredient'
                            : 'Add Ingredient'
                    }
                    description=''
                />

                <div className='mt-4 flex space-x-4'>
                    <div className='space-y-4'>
                        <div className=''>
                            <p>Name: </p>
                            <input
                                autoFocus
                                tabIndex={1}
                                className='mt-2 rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                                placeholder='Enter ingredient name...'
                                value={modalState.name}
                                onChange={handleChangeName}
                            />
                        </div>
                        <div className=''>
                            <p>Type: </p>
                            <select
                                tabIndex={3}
                                className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                                value={modalState.type}
                                onChange={handleChangeType}
                            >
                                {Object.values(IngredientTypeEnum).map(
                                    (type, index) => (
                                        <option key={index} value={index}>
                                            {type}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div className=''>
                            <p>Supplier: </p>
                            <input
                                tabIndex={2}
                                className='mt-2 rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                                placeholder='Enter supplier...'
                                value={modalState.supplier}
                                onChange={handelChangeSupplier}
                            />
                        </div>
                        <div className=''>
                            <p>Unit: </p>
                            <select
                                tabIndex={4}
                                className='mt-2 w-full rounded p-2 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-harvest-gold-300'
                                value={modalState.unit}
                                onChange={handleChangeUnit}
                            >
                                {modalState.type === 0
                                    ? Object.values(DryUnitEnum).map(
                                          (unit, index) => (
                                              <option key={index} value={unit}>
                                                  {unit[0].toUpperCase() +
                                                      unit.slice(1)}
                                              </option>
                                          )
                                      )
                                    : Object.values(LiquidUnitEnum).map(
                                          (unit, index) => (
                                              <option key={index} value={unit}>
                                                  {unit[0].toUpperCase() +
                                                      unit.slice(1)}
                                              </option>
                                          )
                                      )}
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    className='mt-4 flex justify-center focus:outline-2 focus:outline-harvest-gold-300'
                    tabIndex={5}
                >
                    {modalState.isUpdate ? (
                        <Button
                            className='w-full'
                            onClick={handleEditIngredient}
                        >
                            {isUpdateIngredientLoading ? 'Loading...' : 'Edit'}
                        </Button>
                    ) : (
                        <Button
                            className='w-full'
                            onClick={handleAddIngredient}
                        >
                            {isAddIngredientLoading ? 'Loading...' : 'Add'}
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}
