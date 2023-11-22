import { EntityId } from '@reduxjs/toolkit';
import { Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { TiMinus } from 'react-icons/ti';
import { TiPlus } from 'react-icons/ti';
import { HiOutlineTrash } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Category = {
    id: string;
    name: string;
};

type OrderCardProps = {
    id: EntityId;
    name: string;
    category: Category;
    productImage: string;
    price: number;
};

const OrderCard = ({
    id,
    name,
    category,
    productImage,
    price
}: OrderCardProps) => {
    const priceString = price
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');

    return (
        <div className='relative flex rounded-lg'>
            {/* Image */}
            <div className='relative h-28 w-28'>
                <Image
                    src={productImage}
                    className='rounded-lg object-cover object-center'
                    fill={true}
                    alt={productImage}
                />
            </div>

            <div className='flex grow flex-col px-4 py-2'>
                <div className='flex grow justify-between '>
                    <h1 className='line-clamp-2 w-60 font-primary text-base font-medium leading-6'>
                        {name}
                    </h1>

                    <button
                        onClick={() => {}}
                        className='bg-gradient-destructive group flex h-9 w-9 rounded-lg bg-size-200 bg-pos-100 text-center drop-shadow-xl duration-100 ease-linear hover:bg-pos-0 active:scale-95 active:opacity-70'
                    >
                        <HiOutlineTrash className='m-auto h-5 w-5 text-white duration-100 ease-linear' />
                    </button>
                </div>

                <div className='flex items-end justify-between'>
                    <ul className='flex items-center justify-between gap-3'>
                        <li className='inline-flex '>
                            <button
                                onClick={() => {}}
                                className='group cursor-pointer rounded-md bg-white p-1 drop-shadow-md duration-100 ease-linear hover:bg-gray-200 active:scale-95 active:opacity-70'
                            >
                                <TiMinus className='text-lg duration-100 ease-linear' />
                            </button>
                        </li>

                        <li className='text-base'>
                            <input
                                defaultValue={1}
                                className='w-7 rounded-md bg-transparent bg-white p-1 text-center drop-shadow-md'
                            />
                        </li>

                        <li className='inline-flex'>
                            <button
                                onClick={() => {}}
                                className='group cursor-pointer rounded-md bg-gradient-primary bg-size-200 bg-pos-100 p-1 drop-shadow-md duration-100 ease-linear hover:bg-pos-0 active:scale-95 active:opacity-70'
                            >
                                <TiPlus className='text-lg duration-100 ease-linear' />
                            </button>
                        </li>
                    </ul>

                    <h4 className='inline-block text-lg font-bold'>
                        {priceString}{' '}
                        <span className='text-sm font-bold'>VND</span>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
