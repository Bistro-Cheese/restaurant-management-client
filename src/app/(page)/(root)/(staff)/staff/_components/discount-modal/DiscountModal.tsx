import Modal from 'react-modal';
import { Dispatch, SetStateAction } from 'react';

import { ModalStyles } from '@/constants/modalStyle';
import { Heading } from '@/components/heading';

import { useGetDiscountsQuery } from '@/redux/services/discount-api';

import { cn } from '@/lib/utils';
import { useUpdateOrder } from '@/hooks/order/use-update-order';
import toast from 'react-hot-toast';
import { convertPriceToString } from '@/utils';

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    tableId?: number;
}

export default function DiscountModal({ isOpen, setIsOpen, tableId }: IProps) {
    const { data, isLoading: isGetDiscountsLoading } = useGetDiscountsQuery();

    const { updateOrder } = useUpdateOrder();

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleApplyDiscount = (discountId: number) => {
        updateOrder({
            table_id: tableId,
            discount_id: discountId
        })
            .unwrap()
            .then((res) => {
                toast.success('Apply discount successfully');
                setIsOpen(false);
            });
    };

    if (isGetDiscountsLoading) return <div>Loading...</div>;

    return (
        <Modal isOpen={isOpen} style={ModalStyles} onRequestClose={handleClose}>
            <div className='p-5'>
                <Heading title='Discounts' description='' />

                <div className='mt-4 flex flex-col gap-4'>
                    {Object.values(data?.entities || {}).map(
                        (discount: any) => (
                            <div key={discount.id}>
                                <div
                                    className={cn(
                                        'flex items-center justify-between rounded p-2 outline outline-2 outline-blue-500',
                                        !discount.isActive && 'hidden'
                                    )}
                                >
                                    <div className='mr-10 w-full'>
                                        <p className='text-xl font-semibold'>
                                            {discount.name}
                                        </p>
                                        <span>
                                            {convertPriceToString(
                                                discount.value || 0
                                            )}
                                        </span>
                                        <span>
                                            {discount.type === 1 ? ' VND' : '%'}
                                        </span>
                                    </div>
                                    <div>
                                        <button
                                            className='rounded bg-blue-500 px-2 py-1 text-white'
                                            onClick={() =>
                                                handleApplyDiscount(discount.id)
                                            }
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </Modal>
    );
}
