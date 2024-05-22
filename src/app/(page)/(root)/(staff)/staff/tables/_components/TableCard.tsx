'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { cn } from '@/lib/utils';

import { TableType } from '@/types';
import { useAppDispatch } from '@/hooks/redux-hook';
import { setIsUpdate, setTableId } from '@/redux/features/order-slice';
import { useRouter } from 'next/navigation';

interface TableCardProps {
    table: TableType;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TableCard: FC<TableCardProps> = ({ table, setIsOpen }) => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    const handleClickTable = () => {
        switch (table.tableStatus) {
            case 'EMPTY':
                dispatch(setTableId(table.id));
                setIsOpen(true);
                break;
            case 'OCCUPIED':
                dispatch(setIsUpdate(true));
                router.push(`/staff/tables/${table.id}`);
                break;
            case 'RESERVED':
                toast.error('This table is reserved');
                break;
            default:
                break;
        }
    };

    return (
        <div
            onClick={handleClickTable}
            className={cn(
                'flex h-[7rem] cursor-pointer flex-col justify-between rounded-lg px-4 py-2',
                {
                    'bg-lightSilver outline outline-mediumSilver':
                        table.tableStatus === 'EMPTY',
                    'bg-harvest-gold-50 outline outline-harvest-gold':
                        table.tableStatus === 'OCCUPIED'
                }
            )}
        >
            <div className='flex items-center justify-between'>
                <span className='text-xl font-bold'>{table.tableNumber}</span>
                <span className='text-lg font-bold'>
                    {table.seatNumber} seats
                </span>
            </div>
            <span
                className={cn('font-primary text-lg font-bold', {
                    'text-slate-600': table.tableStatus === 'EMPTY',
                    'text-harvest-gold-700': table.tableStatus === 'OCCUPIED'
                })}
            >
                {table.tableStatus === 'EMPTY' ? 'Free to use' : 'Pending'}
            </span>
        </div>
    );
};

export default TableCard;
