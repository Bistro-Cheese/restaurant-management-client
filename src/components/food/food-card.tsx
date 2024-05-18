import Image from 'next/image';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { AlertModal } from '../modal/alert-modal';
import { useDeleteFoodMutation } from '@/redux/services/food-api';
import { convertPriceToString } from '@/utils';

export type FoodCardProps = {
    id: EntityId;
    name: string;
    price: number;
    category: string;
    status: number;
    image: string;
};

export const FoodCard = ({
    id,
    name,
    price,
    category,
    status,
    image
}: FoodCardProps) => {
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const [deleteFood, { isLoading, isSuccess }] = useDeleteFoodMutation();

    var colorStatus = '';
    var nameStatus = '';

    const priceString = convertPriceToString(price);

    switch (status) {
        case 1:
            colorStatus = 'bg-green-500';
            nameStatus = 'Available';
            break;
        case 2:
            colorStatus = 'bg-red-500';
            nameStatus = 'Out Stock';
            break;
        default:
            // Thực hiện hành động mặc định hoặc hành động cho trạng thái khác
            colorStatus = 'bg-slate-500';
            nameStatus = 'Draft';
            break;
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
        }
    }, [isSuccess]);

    const handleClickEdit = (id: EntityId) => {
        router.push(`/owner/foods/${id}`);
    };

    const handleClickDelete = () => {
        setOpen(true);
    };

    const onDelete = async (id: EntityId) => {
        try {
            await deleteFood(id);
            toast.success('Delete food successfully');
        } catch (err) {
            console.log('err:::', err);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => onDelete(id)}
                loading={isLoading}
            />
            <div className='group h-full overflow-hidden rounded-lg border bg-white transition hover:shadow-sm'>
                <div className='relative aspect-video w-full overflow-hidden '>
                    <Image
                        fill
                        className='object-content'
                        alt={name}
                        sizes='(min-width: 1024px) 400px,'
                        src={image}
                        priority
                    />
                </div>
                <div className='flex flex-col p-3'>
                    <div className='mb-1 line-clamp-2 flex h-12 flex-row justify-between text-lg font-medium transition group-hover:text-sky-700 md:text-base'>
                        <p className='line-clamp-2  font-semibold text-text'>
                            {name}
                        </p>
                    </div>

                    <div className='flex flex-row justify-between text-text-subtle'>
                        <p className='text-xs text-muted-foreground'>
                            {category}
                        </p>

                        <div
                            className={cn(
                                'rounded-sm p-[5px] text-xs font-bold text-white',
                                colorStatus
                            )}
                        >
                            {nameStatus}
                        </div>
                    </div>
                    <div className='font-bold text-red-500'>
                        {priceString} <span className='text-xs'>VND</span>
                    </div>

                    <div className='mt-4 flex flex-row items-center justify-between'>
                        <Button
                            onClick={() => handleClickDelete()}
                            variant='destructive'
                            size='sm'
                            className='group/remove bg-white px-5 py-[1px] text-xs outline  outline-gray-200'
                        >
                            <Trash2 className='h-4 w-4 text-gray-400 group-hover/remove:text-sky-900' />
                        </Button>
                        <Button
                            onClick={() => handleClickEdit(id)}
                            size='sm'
                            className='bg-harvest-gold-500 px-5 py-[1px] text-sm font-bold text-text hover:bg-harvest-gold-400 active:bg-harvest-gold-300'
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
