'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import { TableType } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialOrder } from '@/redux/features/order-slice';
import { RootState } from '@/redux/store';
import { deleteTableOrder } from '@/redux/features/table-order-slice';

interface TableCardProps {
    table: TableType;
}

const TableCard: FC<TableCardProps> = ({ table }) => {
    const dispatch = useDispatch();
    const tableOrders = useSelector(
        (state: RootState) => state.reducer.tableOrder.tableOrders
    );

    const handleTableClick = () => {
        const currentTableOrder = tableOrders.find(
            (tableOrder) => tableOrder.tableId === table.id
        );

        dispatch(
            setInitialOrder({
                tableId: table.id,
                orderLines: currentTableOrder
                    ? currentTableOrder.orderLines
                    : []
            })
        );
    };

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
            onClick={() => handleTableClick()}
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
