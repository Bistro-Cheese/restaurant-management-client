import ConfirmDialog from '@/components/common/ConfirmDialog';
import DialogButton from '@/components/common/DialogButton';
import { CustomToastOptions } from '@/constants/toast';
import useDeleteIngredient from '@/hooks/ingredient/use-delete-ingredient';
import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';

interface IProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    ingredientId: string;
}

function DeleteDialog({ setOpen, open, ingredientId }: IProps) {
    const handleClose = () => {
        setOpen(false);
    };

    const { deleteIngredient } = useDeleteIngredient();

    const handleDelete = () => {
        deleteIngredient(ingredientId)
            .unwrap()
            .then((res) => {
                toast.success(res.message, CustomToastOptions);
                setOpen(false);
            });
    };

    return (
        <ConfirmDialog
            open={open}
            title='Delete Ingredient'
            content='Are you sure you want to delete this Ingredient? This action cannot be undone.'
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
export default DeleteDialog;
