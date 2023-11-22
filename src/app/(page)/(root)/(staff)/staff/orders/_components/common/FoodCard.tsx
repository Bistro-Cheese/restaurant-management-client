import { Button } from '@/components/ui/button';
import { EntityId } from '@reduxjs/toolkit';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { TiMinus } from 'react-icons/ti';
import { TiPlus } from 'react-icons/ti';
import { TbShoppingCartPlus } from 'react-icons/tb';

type Category = {
    id: string;
    name: string;
};

type FoodCardProps = {
    id: EntityId;
    name: string;
    category: string;
    productImage: string;
    price: number;
};

const FoodCard = ({
    id,
    name,
    category,
    productImage,
    price
}: FoodCardProps) => {
    const priceString = price
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');

    return (
        <div className='hover:drop-shadow-primary mt-1 flex h-full flex-col rounded-3xl bg-white drop-shadow-xl duration-200 ease-linear hover:-translate-y-1'>
            {/* Image */}
            <div className='relative h-48 min-w-full sm:h-32 lg:h-60 xl:h-64 2xl:h-80'>
                <Image
                    src={productImage}
                    className='rounded-t-3xl object-cover object-center'
                    fill={true}
                    alt={productImage}
                />
            </div>

            {/* Description */}
            <div className='flex grow flex-col p-3'>
                <h1 className='grow font-primary text-xl font-semibold'>
                    {name}
                </h1>

                <div className='mt-1 flex items-end justify-between'>
                    <h4 className='font-primary text-base text-muted-foreground'>
                        {category}
                    </h4>
                    <h4 className='inline-block bg-[#f6af04] bg-clip-text text-xl font-extrabold text-transparent'>
                        {priceString}{' '}
                        <span className='text-sm font-bold'>VND</span>
                    </h4>
                </div>

                <div className='mt-3 flex items-center justify-between'>
                    <span className='group grow duration-100 ease-linear active:scale-95 active:opacity-70'>
                        <button className='inline-flex w-full items-center justify-center gap-4 rounded-2xl bg-gradient-primary bg-size-200 bg-pos-100 px-4 py-2 font-primary duration-300 ease-linear group-hover:bg-pos-0'>
                            <TbShoppingCartPlus className='text-lg duration-100 ease-linear' />

                            <p className='font-primary font-semibold duration-100 ease-linear'>
                                Add to order
                            </p>
                        </button>
                    </span>

                    {/* <ul className='ml-4 flex items-center justify-between gap-3'>
                        <li className='inline-flex '>
                            <button
                                onClick={() => {}}
                                className='group inline-flex cursor-pointer items-center justify-center rounded-md bg-white p-1 drop-shadow-md duration-100 ease-linear hover:bg-gray-200 active:scale-95 active:opacity-70'
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
                                className='group inline-flex cursor-pointer items-center justify-center rounded-md bg-gradient-primary bg-size-200 bg-pos-100 p-1 drop-shadow-md duration-100 ease-linear hover:bg-pos-0 active:scale-95 active:opacity-70'
                            >
                                <TiPlus className='text-lg duration-100 ease-linear' />
                            </button>
                        </li>
                    </ul> */}
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
