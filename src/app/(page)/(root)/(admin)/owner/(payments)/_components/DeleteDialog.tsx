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

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    payment: PaymentType;
}

export default function DeleteDialog({ open, setOpen, payment }: IProps) {
    const dispatch = useAppDispatch();

    const [deletePaymentMutation, { isSuccess, isLoading }] =
        useDeletePaymentMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success(PaymentMessage.DELETE_SUCCESS, CustomToastOptions);
            dispatch(deletePayment(payment.id));
            setOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isLoading]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        deletePaymentMutation(payment.id as number);
    };

    return (
        <ConfirmDialog
            open={open}
            title='Delete Payment Method'
            content='Are you sure you want to delete this payment method? This action cannot be undone.'
            handleClose={handleClose}
        >
            <DialogButton
                title='Cancle'
                handleClick={handleClose}
                backgroundColor='bg-gray-500'
            />
            <DialogButton
                title='Delete'
                handleClick={handleDelete}
                backgroundColor='bg-red-500'
            />
        </ConfirmDialog>
    );
}
