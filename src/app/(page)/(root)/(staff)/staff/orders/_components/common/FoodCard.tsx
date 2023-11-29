import { Button } from '@/components/ui/button';
import { EntityId } from '@reduxjs/toolkit';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { TiMinus } from 'react-icons/ti';
import { TiPlus } from 'react-icons/ti';
import { TbShoppingCartPlus } from 'react-icons/tb';

type FoodCardProps = {
    id: EntityId;
    name: string;
    category: string;
    image: string;
    price: number;
};

const FoodCard = ({ id, name, category, image, price }: FoodCardProps) => {
    const priceString = price
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');

    return (
        <div className='mt-1 flex h-full rounded-3xl bg-white drop-shadow-xl duration-200 ease-linear md:flex-col mdl:hover:-translate-y-1 mdl:hover:drop-shadow-primary'>
            {/* Image */}
            <div className='relative h-full w-32 md:h-56 md:w-full lg:h-60 xl:h-64 2xl:h-80'>
                <Image
                    src={image}
                    className='rounded-3xl object-cover object-center md:rounded-t-3xl md:rounded-bl-none'
                    fill={true}
                    alt={image}
                />
            </div>

            {/* Description */}
            <div className='flex grow flex-col p-3'>
                <div className='w-44 grow sm:min-w-full'>
                    <span className='line-clamp-2 grow font-primary text-xl font-semibold sml:line-clamp-none'>
                        {name}
                    </span>
                </div>

                <div className='flex justify-between md:flex-col'>
                    <div className='mt-1 flex flex-col justify-between md:flex-row'>
                        <span className='font-primary text-base text-muted-foreground'>
                            {category}
                        </span>
                        <span className='overflow-hidden bg-gradient-primary bg-clip-text text-xl font-extrabold text-transparent'>
                            {priceString}{' '}
                            <span className='truncate text-sm font-bold'>
                                VND
                            </span>
                        </span>
                    </div>

                    <div className='mt-3 flex items-center justify-between'>
                        <span className='group grow duration-100 ease-linear active:scale-95 active:opacity-70'>
                            <button className='inline-flex w-full items-center justify-center gap-4 rounded-xl bg-gradient-primary bg-size-200 bg-pos-100 px-4 py-2 font-primary duration-300 ease-linear group-hover:bg-pos-0'>
                                <TbShoppingCartPlus className='h-5 w-5 text-white duration-100 ease-linear md:h-7 md:w-7' />

                                <span className='hidden font-primary font-semibold text-white duration-100 ease-linear md:inline-block'>
                                    Add to order
                                </span>
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
        </div>
    );
};

export default FoodCard;
