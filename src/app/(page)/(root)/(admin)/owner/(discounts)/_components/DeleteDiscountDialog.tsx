import { useEffect } from 'react';
import toast from 'react-hot-toast';

// Components
import ConfirmDialog from '@/components/common/ConfirmDialog';
import DialogButton from '@/components/common/DialogButton';

// Constants
import { PaymentMessage } from '@/constants/message';
import { CustomToastOptions } from '@/constants/toast';

// Redux
import { useAppDispatch } from '@/hooks/redux-hook';
import { deletePayment } from '@/redux/features/payment-slice';
import { useDeletePaymentMutation } from '@/redux/services/payment-api';

// Types
import PaymentType from '@/types/PaymentType';
import { DiscountType } from '@/types';
import { useDeleteDiscountMutation } from '@/redux/services/discount-api';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    discount?: DiscountType;
}

export default function DeleteDiscountDialog({
    open,
    setOpen,
    discount
}: IProps) {
    const [deleteDiscount, { isSuccess, isLoading, isError }] =
        useDeleteDiscountMutation();

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await deleteDiscount({ discount_id: discount!.id })
            .then(() => {
                toast.success(
                    'Delete discount successfully',
                    CustomToastOptions
                );
                setOpen(false);
            })
            .catch((err) => {
                toast.error((err as any).data.message, CustomToastOptions);
            });
    };

    return (
        <ConfirmDialog
            open={open}
            title='Delete discount'
            content='Are you sure you want to delete this discount method? This action cannot be undone.'
            handleClose={handleClose}
        >
            <DialogButton
                title='Cancle'
                handleClick={handleClose}
                backgroundColor='bg-gray-400'
            />
            <DialogButton
                title='Delete'
                handleClick={handleDelete}
                backgroundColor='bg-red-500'
            />
        </ConfirmDialog>
    );
}
