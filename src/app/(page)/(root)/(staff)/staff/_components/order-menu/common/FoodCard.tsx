import Image from 'next/image';
import { TbShoppingCartPlus } from 'react-icons/tb';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToOrder } from '@/redux/features/order-slice';
import { FoodType } from '@/types';
import { convertPriceToString } from '@/utils';

interface FoodCardProps {
    food: FoodType;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
    const dispatch = useDispatch();

    const handleAddToOrder = () => {
        dispatch(addToOrder(food));
        console.log('food added to order:::', food);
    };

    const priceString = convertPriceToString(food.price);

    return (
        <div
            key={food.id}
            className='mt-1 flex h-full rounded-3xl bg-white drop-shadow-xl transition-all duration-300 ease-in-out md:flex-col mdl:hover:-translate-y-1 mdl:hover:drop-shadow-primary'
        >
            {/* Image */}
            {food.image && (
                <div className='relative h-full w-32 md:h-56 md:w-full lg:h-60 xl:h-64 2xl:h-80'>
                    <Image
                        src={food.image}
                        priority
                        className='rounded-3xl object-cover object-center md:rounded-t-3xl md:rounded-bl-none md:rounded-br-none'
                        fill
                        alt={food.description}
                        sizes='(min-width: 1024px) 400px,'
                    />
                </div>
            )}

            {/* Description */}
            <div className='flex grow flex-col p-3'>
                <div className='w-36 grow sm:min-w-full'>
                    <span className='line-clamp-2 grow font-primary text-base font-semibold leading-relaxed sml:line-clamp-none md:text-lg lg:text-xl'>
                        {food.name}
                    </span>
                </div>

                <div className='flex items-end md:mt-1 md:flex-col md:items-stretch'>
                    <div className='flex grow flex-col-reverse justify-between md:grow-0 md:flex-row'>
                        <span className='line-clamp-1 overflow-hidden bg-harvest-gold-600 bg-clip-text text-lg font-black text-transparent md:text-xl'>
                            {priceString}{' '}
                            <span className='text-xs font-extrabold md:text-sm'>
                                VND
                            </span>
                        </span>

                        <span className='font-primary text-sm text-muted-foreground md:text-base'>
                            {food.category.name}
                        </span>
                    </div>

                    <div className='flex items-center justify-between md:mt-1'>
                        <span className='group grow transition-all duration-300 ease-in-out active:scale-95 active:opacity-70'>
                            <button
                                onClick={() => handleAddToOrder()}
                                className='inline-flex w-full items-center justify-center gap-4 rounded-xl bg-gradient-primary bg-size-200 bg-pos-100 px-4 py-2 font-primary transition-all duration-300 ease-in-out group-hover:bg-pos-0'
                            >
                                <TbShoppingCartPlus className='text-base text-white duration-300 ease-in-out md:text-2xl' />

                                <span className='hidden font-primary text-sm font-semibold uppercase text-white duration-300 ease-in-out md:inline-block lg:text-base'>
                                    ADD TO ORDER
                                </span>
                            </button>
                        </span>

                        {/* <ul className='ml-4 flex items-center justify-between gap-3'>
                            <li className='inline-flex '>
                                <button
                                    onClick={() => {}}
                                    className='group inline-flex cursor-pointer items-center justify-center rounded-md bg-white p-1 drop-shadow-md duration-300 ease-in-out hover:bg-gray-200 active:scale-95 active:opacity-70'
                                >
                                    <TiMinus className='text-lg duration-300 ease-in-out' />
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
                                    className='group inline-flex cursor-pointer items-center justify-center rounded-md bg-gradient-primary bg-size-200 bg-pos-100 p-1 drop-shadow-md duration-300 ease-in-out hover:bg-pos-0 active:scale-95 active:opacity-70'
                                >
                                    <TiPlus className='text-lg duration-300 ease-in-out' />
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
