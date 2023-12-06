import { EntityId } from '@reduxjs/toolkit';
import { Plus, Trash2, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { TiMinus } from 'react-icons/ti';
import { TiPlus } from 'react-icons/ti';
import { HiOutlineTrash } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TbTrash } from 'react-icons/tb';
import { FC, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { TbShoppingCartX } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import {
    decreaseQuantity,
    increaseQuantity,
    removeOrderLine
} from '@/redux/features/order-line-slice';
import { OrderLineType } from '@/types';

interface OrderCardProps {
    orderLine: OrderLineType;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderLine }) => {
    const priceString = orderLine.price
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState<number | string>(1);

    const handleTypeQuantity = (event: any) => {
        const inputValue = parseInt(event.target.value, 10);

        if (!isNaN(inputValue)) {
            setQuantity(inputValue);
        } else {
            setQuantity('');
        }
    };

    const handleOnBlur = () => {
        if (quantity === '') {
            setQuantity(1);
        }
    };

    const handleIncreaseQuantity = (productId: EntityId) => {
        dispatch(increaseQuantity({ id: productId }));
    };

    const handleDecreaseQuantity = (productId: EntityId) => {
        dispatch(decreaseQuantity({ id: productId }));
    };

    const handleRemoveOrderLine = (productId: EntityId) => {
        dispatch(removeOrderLine({ id: productId }));
    };

    return (
        <div className='group/card flex rounded-lg px-4 py-2 transition-all duration-100 ease-linear hover:bg-lightSilver'>
            {/* Image */}
            <div className='relative h-20 w-20'>
                <Image
                    src={orderLine.image}
                    className='rounded-lg object-cover object-center'
                    fill={true}
                    alt={orderLine.description}
                />
            </div>

            <div className='ml-3 flex grow flex-col rounded-lg'>
                <div className='relative flex h-full'>
                    <div className='group relative w-20 grow'>
                        <span className='line-clamp-2 font-primary text-sm font-semibold leading-normal lg:text-base'>
                            {orderLine.name}
                        </span>
                    </div>

                    <span className='group translate-x-4 opacity-0 transition-all duration-200 ease-linear group-hover/card:translate-x-0 group-hover/card:opacity-100 '>
                        <button
                            onClick={() => handleRemoveOrderLine(orderLine.id)}
                            className='inline-flex items-center justify-center self-start rounded-lg p-1 transition-all duration-100 ease-linear hover:bg-red-200 active:scale-95 active:opacity-70'
                        >
                            <Trash2Icon className='h-5 w-5 text-red-400 transition-all duration-100 ease-linear 2xl:h-6 2xl:w-6' />
                        </button>
                    </span>
                </div>

                <div className='flex items-end justify-between'>
                    <ul className='flex items-center justify-between gap-1 lg:gap-2'>
                        <li className='inline-flex '>
                            <button
                                onClick={() =>
                                    handleDecreaseQuantity(orderLine.id)
                                }
                                className='group cursor-pointer rounded-md bg-gradient-primary bg-size-200 bg-pos-100 p-1 shadow-md duration-150 ease-linear hover:bg-pos-0 hover:shadow-harvest-gold-500 active:scale-95 active:opacity-70'
                            >
                                <TiMinus className='text-sm text-white duration-100 ease-linear lg:text-base' />
                            </button>
                        </li>

                        <li className='text-base'>
                            <input
                                contentEditable={true}
                                value={orderLine.quantity}
                                className='w-7 rounded-md bg-transparent bg-white p-1 text-center text-sm shadow-md lg:text-base'
                                onChange={(event) => handleTypeQuantity(event)}
                                onBlur={handleOnBlur}
                            />
                        </li>

                        <li className='inline-flex'>
                            <button
                                onClick={() =>
                                    handleIncreaseQuantity(orderLine.id)
                                }
                                className='group cursor-pointer rounded-md bg-gradient-primary bg-size-200 bg-pos-100 p-1 shadow-md duration-150 ease-linear hover:bg-pos-0 hover:shadow-harvest-gold-500 active:scale-95 active:opacity-70'
                            >
                                <TiPlus className='text-sm text-white duration-100 ease-linear lg:text-base' />
                            </button>
                        </li>
                    </ul>

                    <span className='line-clamp-1 inline-block text-base font-bold lg:text-lg'>
                        {priceString}{' '}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
