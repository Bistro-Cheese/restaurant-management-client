'use client';
import { Dispatch, SetStateAction, useState } from 'react';
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
import { ModalDiscountType } from '../discounts/page';
import DeleteDialog from '../../(payments)/_components/DeleteDialog';
import DeleteDiscountDialog from './DeleteDiscountDialog';

interface DiscountCardProps {
    discount?: DiscountType;
    setModalDiscountState: Dispatch<SetStateAction<ModalDiscountType>>;
}

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

const DiscountCard: React.FC<DiscountCardProps> = ({
    discount,
    setModalDiscountState
}) => {
    const typeOfDiscount = getTypeFromEnumKey(discount!.type);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <Card
                className={cn(
                    'h-full flex-col rounded-md p-4',
                    discount?.isActive === true
                        ? ''
                        : 'pointer-events-none opacity-50 drop-shadow-none'
                )}
            >
                <div className='block grow'>
                    <p className='line-clamp-2  text-lg font-bold'>
                        {discount?.name}
                    </p>
                </div>

                <div
                    className={cn(
                        'mt-2 inline-flex items-center text-xl font-semibold',
                        discount?.isActive === true
                            ? 'text-success'
                            : 'text-gray-200'
                    )}
                >
                    <FaLongArrowAltDown className='h-5 w-5' />
                    <div className='inline-block'>
                        <span>{convertPriceToString(discount!.value)}</span>
                        {typeOfDiscount === DiscountTypeEnum['PERCENTAGE'] ? (
                            <span>%</span>
                        ) : typeOfDiscount === DiscountTypeEnum['FIXED'] ? (
                            <span className='text-base'> VND</span>
                        ) : null}
                    </div>
                </div>

                <div className='flex grow items-end'>
                    <div className='mt-2 flex items-center justify-start space-x-3 font-bold'>
                        <button
                            onClick={() => {
                                setModalDiscountState({
                                    discountId: discount!.id,
                                    isUpdate: true,
                                    isOpen: true
                                });
                            }}
                            className='inline-flex items-center justify-center rounded-sm bg-primary px-2 py-1 text-white'
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => {
                                if (openDialog === false) setOpenDialog(true);
                            }}
                            className='inline-flex items-center justify-center text-destructive'
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* <div className='mt-2 block text-sm'>
                <div className='flex w-fit flex-row items-center justify-center gap-2 rounded-sm px-2 py-1 outline outline-1'>
                    <span className='text-center font-bold'>
                        {discount?.startDate}
                    </span>
    
                    <FaLongArrowAltRight className='flex-shrink-0' />
                    <span className='text-center font-bold'>
                        {discount?.endDate}
                    </span>
                </div>
            </div> */}
            </Card>
            <DeleteDiscountDialog
                open={openDialog}
                setOpen={setOpenDialog}
                discount={discount}
            />
        </>
    );
};

export default DiscountCard;
