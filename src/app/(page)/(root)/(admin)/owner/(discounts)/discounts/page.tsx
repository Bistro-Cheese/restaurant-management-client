'use client';
import { useState } from 'react';
import ModalDiscount from '../_components/ModalDiscount';
import { useGetDiscountsQuery } from '@/redux/services/discount-api';
import Card from '@/components/common/Card';
import { cn } from '@/lib/utils';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Modal from 'react-modal';
import { IoAdd } from 'react-icons/io5';
import { FaLongArrowAltDown } from 'react-icons/fa';
import getEnumKeyByEnumValue from '@/utils/get-enum-key-by-enum-value';
import { DiscountTypeEnum, DiscountTypeEnumValue } from '@/constants/enum';
import { DiscountType } from '@/types';
import { convertPriceToString } from '@/utils';
import DiscountCard from '../_components/DiscountCard';
import { motion } from 'framer-motion';

export type ModalDiscountType = {
    discountId: string;
    isOpen: boolean;
    isUpdate: boolean;
};

export const initialModalDiscountState: ModalDiscountType = {
    discountId: '',
    isOpen: false,
    isUpdate: false
};

const getTypeFromEnumKey = (enumValue: string) => {
    const enumKey = getEnumKeyByEnumValue(
        DiscountTypeEnumValue,
        Number(enumValue)
    );

    if (enumKey !== null) {
        return DiscountTypeEnum[enumKey];
    }

    return null;
};

const DiscountPage: React.FC = () => {
    const [modalDiscountState, setModalDiscountState] =
        useState<ModalDiscountType>(initialModalDiscountState);

    const {
        data: discounts,
        isLoading: isDiscountsLoading,
        isSuccess: isDiscountsSuccess,
        isError: isDiscountsError
    } = useGetDiscountsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    if (isDiscountsLoading) {
        return <div>Loading all discounts...</div>;
    }

    if (isDiscountsError) {
        return <div>Error get all discounts...</div>;
    }

    const handleOpenCreateModal = () => {
        setModalDiscountState({
            ...modalDiscountState,
            isOpen: true,
            isUpdate: false
        });
    };

    Modal.setAppElement('body');

    if (isDiscountsSuccess) {
        console.log('discounts:::', discounts);

        return (
            <div className='block w-full'>
                <div className='grid grid-flow-row grid-cols-1 gap-4 sml:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-5'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.35,
                            delay: 0.1,
                            ease: 'easeInOut'
                        }}
                    >
                        <Card className='flex h-full min-h-[120px] w-full items-center justify-center rounded-md bg-gray-100/30 outline-dashed outline-gray-300 drop-shadow-none'>
                            <button
                                className='inline-flex items-center justify-center space-x-3 rounded bg-primary px-4 py-2 font-bold text-white hover:bg-harvest-gold-600 active:bg-harvest-gold-700'
                                onClick={handleOpenCreateModal}
                            >
                                Add
                                <IoAdd className='h-5 w-5' />
                            </button>
                        </Card>
                    </motion.div>

                    {Object.values(discounts?.entities).map(
                        (discount, index) => {
                            // console.log('discount:::', discount);
                            const typeOfDiscount = getTypeFromEnumKey(
                                discount!.type
                            );
                            return (
                                <motion.div
                                    key={discount?.id}
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.35,
                                        delay: 0.1 + index * 0.075,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    <DiscountCard
                                        discount={discount}
                                        setModalDiscountState={
                                            setModalDiscountState
                                        }
                                    />
                                </motion.div>
                            );
                        }
                    )}
                </div>

                <ModalDiscount
                    modalDiscountState={modalDiscountState}
                    setModalDiscountState={setModalDiscountState}
                />
            </div>
        );
    }
};

export default DiscountPage;
