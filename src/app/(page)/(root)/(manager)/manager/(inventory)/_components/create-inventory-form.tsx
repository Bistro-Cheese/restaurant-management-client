'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';
import { AlertModal } from '@/components/modal/alert-modal';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import {
    selectInventoryById,
    useImportInventoryMutation
} from '@/redux/services/inventory-api';
import { selectIngredients } from '@/redux/services/ingredient-api';
import { IngredientType } from '@/types';

const formSchema = z.object({
    ingredient_id: z.coerce.number().min(0),
    quantity: z.coerce.number().min(0)
});

type InventoryFormValues = z.infer<typeof formSchema>;

interface InventoryFormProps {
    inventoryId: string | null;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({
    inventoryId
}) => {
    const [ingredients, setIngredients] = useState<IngredientType[]>();

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const inventory = useSelector((state) =>
        selectInventoryById(state, inventoryId as EntityId)
    );

    console.log('INVENTORY FORM EDIT:::', inventory);

    const [
        importInventory,
        {
            isLoading: isCreatingLoading,
            isSuccess: isCreatedSuccess,
            isError: isCreatingError,
            error: creatingError
        }
    ] = useImportInventoryMutation();

    // const [deleteFood, {
    //     isLoading: isDeletingLoading,
    //     isSuccess: isDeletedSuccess,
    //     isError: isDeletedError,
    //     error: deletedError
    // }] = useDeleteFoodMutation()

    const isCreate = inventoryId !== 'create';

    const title = isCreate ? 'Edit Inventory' : 'Create Inventory';
    const description = isCreate ? 'Edit a inventory.' : 'Add a new inventory';
    const toastMessage = isCreate ? 'Inventory updated.' : 'Inventory created.';
    const action = isCreate ? 'Save changes' : 'Create';

    const defaultValues = isCreate
        ? {
              //   ingredient_id: inventory?.ingredient.id,
              //   quantity: inventory?.quantity
          }
        : {
              inventory_id: 0,
              quantity: 0
          };

    const form = useForm<InventoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    // useEffect(() => {
    //     if (isCreatingLoading || isUpdatingLoading || isDeletingLoading) {
    //         setLoading(true)
    //     } else {
    //         setLoading(false)
    //     }
    // }, [isCreatingLoading, isUpdatingLoading, isDeletingLoading])

    useEffect(() => {
        if (isCreatedSuccess) {
            router.refresh();
            router.push('/owner/inventory');
            toast.success(toastMessage);
        }
    }, [isCreatedSuccess]);

    const onSubmit = async (data: InventoryFormValues) => {
        console.log('SUBMIT INVENTORY', data);
        if (data) {
            await importInventory({
                ingredient_id: data.ingredient_id,
                payload: { quantity: data.quantity }
            });
        } else {
            console.log('ERROR IMPORT INVENTORY');
        }
    };

    const onDelete = async () => {
        console.log('inventoryId:::', inventoryId);
        setLoading(false);
        setOpen(false);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading title={title} description={description} />
                {inventory && (
                    <Button
                        disabled={loading}
                        variant='destructive'
                        size='sm'
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='h-4 w-4' />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full space-y-8'
                >
                    <div className='grid-cols-1 gap-8 md:grid md:grid-cols-1'>
                        <FormField
                            control={form.control}
                            name='ingredient_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ingredient</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value as unknown as string}
                                        defaultValue={
                                            field.value as unknown as string
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select an ingredient'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {ingredients != undefined &&
                                                ingredients.map(
                                                    (ingredient) => (
                                                        <SelectItem
                                                            key={ingredient.id}
                                                            value={ingredient.id.toString()}
                                                        >
                                                            {ingredient.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='quantity'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            disabled={loading}
                                            placeholder='10'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className='ml-auto'
                        type='submit'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
