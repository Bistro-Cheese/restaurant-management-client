import { EntityId } from '@reduxjs/toolkit';
import { Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { TiMinus } from 'react-icons/ti';
import { TiPlus } from 'react-icons/ti';
import { HiOutlineTrash } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TbTrash } from 'react-icons/tb';
import { FC } from 'react';

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

const OrderCard: FC<OrderCardProps> = ({
    id,
    name,
    category,
    productImage,
    price
}): JSX.Element => {
    const priceString = price
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');

    return (
        <div className='flex items-center rounded-lg'>
            {/* Image */}
            <div className='relative h-20 w-20'>
                <Image
                    src={productImage}
                    className='rounded-lg object-cover object-center'
                    fill={true}
                    alt={productImage}
                />
            </div>

            <div className='flex grow flex-col overflow-hidden px-4 py-2'>
                <div className='flex grow'>
                    {/* <h1 className='line-clamp-2 w-40 grow text-ellipsis font-primary text-base font-semibold leading-6'>
                        {name}
                    </h1> */}

                    <div className='group relative w-40 grow'>
                        <div className='line-clamp-2 font-primary text-base font-semibold leading-6'>
                            {name}
                        </div>
                    </div>

                    <button
                        onClick={() => {}}
                        className='bg-mediumSilver hover:bg-lightSilver group ml-2 inline-flex h-7 w-7 items-center justify-center rounded-lg duration-100 ease-linear active:scale-95 active:opacity-70 2xl:h-8 2xl:w-8'
                    >
                        <TbTrash className='h-4 w-4 text-white duration-100 ease-linear 2xl:h-5 2xl:w-5' />
                    </button>
                </div>

                <div className='flex items-end justify-between'>
                    <ul className='flex items-center justify-between gap-3'>
                        <li className='inline-flex '>
                            <button
                                onClick={() => {}}
                                className='group cursor-pointer rounded-md bg-white p-1 drop-shadow-md duration-100 ease-linear hover:bg-gray-200 active:scale-95 active:opacity-70'
                            >
                                <TiMinus className='text-lg text-gold-500 duration-100 ease-linear' />
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
                                className='group cursor-pointer rounded-md bg-gradient-primary bg-size-200 bg-pos-100 p-1 drop-shadow-md duration-150 ease-linear hover:bg-pos-0 active:scale-95 active:opacity-70'
                            >
                                <TiPlus className='text-lg text-white duration-100 ease-linear' />
                            </button>
                        </li>
                    </ul>

                    <span className='inline-block overflow-hidden text-ellipsis text-lg font-bold'>
                        {priceString}{' '}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
