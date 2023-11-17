import { EntityId } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';

type OrderDate = {
    date: string;
    time: string;
};

type StaffOrder = {
    id: string;
    name: string;
};

type OrderCardProps = {
    id: EntityId;
    staffOrder: StaffOrder;
    tableId: string;
    orderDate: OrderDate;
    amount: string;
    status: number;
};

const OrderCard = ({
    id,
    staffOrder,
    tableId,
    orderDate,
    amount,
    status
}: OrderCardProps) => {
    const router = useRouter();

    const handleClickEdit = (id: EntityId) => {
        console.log('OrderId:::', id);
        router.push(`/owner/orders/${id}`);
    };

    let colorBgStatus = '';
    let nameStatus = '';
    let colorTextStatus = '';

    switch (status) {
        case 0:
            colorBgStatus = 'bg-amber-200';
            colorTextStatus = 'text-amber-600';
            nameStatus = 'Pending';
            break;
        case 1:
            colorBgStatus = 'bg-blue-200';
            colorTextStatus = 'text-blue-600';
            nameStatus = 'Shipping';
            break;

        case 2:
            colorBgStatus = 'bg-green-200';
            colorTextStatus = 'text-green-600';
            nameStatus = 'Completed';
            break;

        case 3:
            colorBgStatus = 'bg-red-200';
            colorTextStatus = 'text-red-600';
            nameStatus = 'Cancel';
            break;
        default:
    }

    return (
        <tr className='group transition duration-75 hover:bg-gray-50' key={id}>
            <td scope='row' className='px-6 py-4 font-bold '>
                {id}
            </td>
            <td className='px-6 py-4'>
                <div className='flex flex-col gap-3 font-normal text-gray-900'>
                    <div className='font-medium text-gray-700'>
                        {orderDate.date}
                    </div>
                    <div className='text-gray-400'>{orderDate.time}</div>
                </div>
            </td>
            <td className='px-6 py-4'>
                <div className='flex flex-col gap-3 font-normal text-gray-900'>
                    <div className='font-medium text-gray-700'>
                        {staffOrder.name}
                    </div>
                    <div className='text-gray-400'>{staffOrder.id}</div>
                </div>
            </td>
            <td className='px-6 py-4'>{tableId}</td>
            <td className='px-6 py-4'>{amount}</td>
            <td className='px-6 py-4'>
                <span
                    className={cn(
                        'inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold',
                        colorBgStatus,
                        colorTextStatus
                    )}
                >
                    {nameStatus}
                </span>
            </td>
            <td className='px-6 py-4 '>
                <button className='flex h-8 w-8 rounded-full transition duration-150 ease-linear hover:bg-gray-200'>
                    <MoreHorizontal className='m-auto h-4 w-4 cursor-pointer text-foreground' />
                </button>
            </td>
        </tr>
    );
};

export default OrderCard;
