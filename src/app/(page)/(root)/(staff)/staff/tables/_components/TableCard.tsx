'use client';

import { cn } from '@/lib/utils';
import { EntityId } from '@reduxjs/toolkit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

type TableCardProps = {
    id: EntityId;
    numberOfSeat: number;
    tableNumber: number;
    status: number;
};

const tableStatus = {
    free: {
        name: 'Free',
        outlineColor: '#9CA3AF',
        bgColor: '#f8f6f6'
    },
    pending: {
        name: 'Pending',
        outlineColor: '#F59E0B',
        bgColor: '#FFFBEB'
    },
    complete: {
        name: 'Complete',
        outlineColor: '#059669',
        bgColor: '#ECFDF5'
    }
};

const TableCard: FC<TableCardProps> = ({
    id,
    numberOfSeat,
    tableNumber,
    status
}): React.JSX.Element => {
    const router = useRouter();

    let statusName: string = '';
    let statusCardClassName: string = '';
    let statusTextClassName: string = '';

    switch (status) {
        case 0:
            statusName = 'Empty';
            statusCardClassName = 'bg-lightSilver outline outline-mediumSilver';
            statusTextClassName = 'text-slate-600';
            break;

        case 1:
            statusName = 'Pending';
            statusCardClassName =
                'bg-harvest-gold-50 outline outline-harvest-gold';
            statusTextClassName = 'text-harvest-gold-700';
            break;

        case 2:
            statusName = 'Completed';
            statusCardClassName = 'bg-green-100 outline outline-green-400';
            statusTextClassName = 'text-green-600';
            break;

        default:
            break;
    }

    return (
        <Link
            href={status === 0 ? '/staff/orders' : '#'}
            className={cn(
                'flex h-[7rem] flex-col justify-between rounded-lg px-4 py-2',
                statusCardClassName
            )}
        >
            <span className='text-xl font-bold'>{tableNumber}</span>

            <div className=''>
                <span
                    className={cn(
                        'font-primary text-lg font-bold',
                        statusTextClassName
                    )}
                >
                    {statusName}
                </span>
            </div>
        </Link>
    );
};

export default TableCard;
