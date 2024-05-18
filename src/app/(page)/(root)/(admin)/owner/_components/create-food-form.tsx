'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import ImageUpload from '@/components/image-upload';

import { categories, foodStatus } from '@/utils/fake-data';

import {
    useAddNewFoodMutation,
    useDeleteFoodMutation,
    useUpdateFoodMutation
} from '@/redux/services/food-api';
import { useGetFoodById } from '@/hooks/food/use-get-food-by-id';

const formSchema = z.object({
    name: z.string().min(2).default(''),
    category: z.string().default('1'),
    image: z
        .string()
        .optional()
        .default('https://cdn-icons-png.flaticon.com/512/135/135161.png'),
    price: z.coerce.number().min(10000).default(0),
    status: z.string().default('1'),
    description: z.string().optional().default('')
});

type FoodFormValues = z.infer<typeof formSchema>;

interface FoodFormProps {
    foodId: string;
}

export const FoodForm: React.FC<FoodFormProps> = ({
    foodId
}: FoodFormProps) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { food, isGetFoodByIdLoading, isGetFoodByIdSuccess } =
        useGetFoodById(foodId);

    const [
        addNewFood,
        { isLoading: isCreatingLoading, isSuccess: isCreatedSuccess }
    ] = useAddNewFoodMutation();

    const [
        updateFood,
        { isLoading: isUpdatingLoading, isSuccess: isUpdatedSuccess }
    ] = useUpdateFoodMutation();

    const [
        deleteFood,
        { isLoading: isDeletingLoading, isSuccess: isDeletedSuccess }
    ] = useDeleteFoodMutation();

    const isCreate = foodId === 'create';

    const title = !isCreate ? 'Edit Food' : 'Create Food';
    const description = !isCreate ? 'Edit a food.' : 'Add a new food';
    const toastMessage = !isCreate ? 'Food updated.' : 'Food created.';
    const action = !isCreate ? 'Save changes' : 'Create';

    const defaultValues = {
        name: '',
        description: '',
        image: '',
        category: '1',
        price: 0,
        status: '1'
    };

    const form = useForm<FoodFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    useEffect(() => {
        if (isGetFoodByIdSuccess) {
            form.setValue('name', food?.name);
            form.setValue('description', food?.description);
            form.setValue('image', food?.productImage);
            form.setValue('category', food?.category.id.toString());
            form.setValue('price', food?.price);
            form.setValue('status', food?.status.toString());
        }
    }, [isGetFoodByIdSuccess, food, form]);

    useEffect(() => {
        if (isCreatingLoading || isUpdatingLoading || isDeletingLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isCreatingLoading, isUpdatingLoading, isDeletingLoading]);

    useEffect(() => {
        if (isCreatedSuccess || isUpdatedSuccess) {
            router.push('/owner/foods/menu');
            toast.success(toastMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCreatedSuccess, isUpdatedSuccess]);

    const onSubmit = async (data: FoodFormValues) => {
        if (data) {
            !isCreate
                ? await updateFood({
                      food_id: foodId,
                      data: {
                          ...data,
                          category: parseInt(data.category),
                          status: parseInt(data.status)
                      }
                  })
                : await addNewFood({
                      ...data,
                      category: parseInt(data.category),
                      status: parseInt(data.status)
                  });
        } else {
            console.log('create food:::', data);
        }
    };

    const onDelete = async () => {
        try {
            await deleteFood(foodId);
        } catch (err) {
            console.log('err:::', err);
        }
        setLoading(false);
        setOpen(false);
        router.push('/owner/foods/menu');
        toast.success('Food deleted.');
    };

    if (isGetFoodByIdLoading) {
        return <div>Loading...</div>;
    }

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
                {food && (
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
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        disabled={loading}
                                        onChange={field.onChange}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid-cols-1 gap-8 md:grid md:grid-cols-1'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Product name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='price'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            onChangeCapture={(e) => {
                                                const value =
                                                    e.currentTarget.value;

                                                if (value[0] === '0') {
                                                    e.currentTarget.value =
                                                        e.currentTarget.value.slice(
                                                            1
                                                        );
                                                }
                                            }}
                                            inputMode='numeric'
                                            type='number'
                                            disabled={loading}
                                            placeholder='20000'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select a category'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select status'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {foodStatus.map((status) => (
                                                    <SelectItem
                                                        key={status.id}
                                                        value={status.id}
                                                    >
                                                        {status.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='0-255 characters'
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
