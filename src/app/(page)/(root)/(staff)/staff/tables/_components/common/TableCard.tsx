'use client';

import { cn } from '@/lib/utils';
import { EntityId } from '@reduxjs/toolkit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { TableType } from '@/types';

interface TableCardProps {
    table: TableType;
}

const TableCard: FC<TableCardProps> = ({ table }) => {
    const router = useRouter();

    let status: string = '';
    let statusCardClassName: string = '';
    let statusTextClassName: string = '';

    switch (table.tableStatus) {
        case 'EMPTY':
            status = 'Free';
            statusCardClassName = 'bg-lightSilver outline outline-mediumSilver';
            statusTextClassName = 'text-slate-600';
            break;

        case 'OCCUPIED':
            status = 'Pending';
            statusCardClassName =
                'bg-harvest-gold-50 outline outline-harvest-gold';
            statusTextClassName = 'text-harvest-gold-700';
            break;

        default:
            break;
    }

    return (
        <Link
            href={`/staff/tables/${table.id}`}
            className={cn(
                'flex h-[7rem] flex-col justify-between rounded-lg px-4 py-2',
                statusCardClassName
            )}
        >
            <span className='text-xl font-bold'>{table.tableNumber}</span>

            <div className=''>
                <span
                    className={cn(
                        'font-primary text-lg font-bold',
                        statusTextClassName
                    )}
                >
                    {status}
                </span>
            </div>
        </Link>
    );
};

export default TableCard;
