'use client';

import { Dispatch, FC, SetStateAction } from 'react';

import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsTrash2 } from 'react-icons/bs';

import { TableType } from '@/types';

import { Button } from '@/components/ui/button';

import { ModalType } from '../tables/page';

interface TableCardProps {
    table: TableType;
    setModalState: Dispatch<SetStateAction<ModalType>>;
}

const TableCard: FC<TableCardProps> = ({ table, setModalState }) => {
    const handleOpenEditModal = () => {
        setModalState({
            tableId: table.id.toString(),
            tableNumber: table.tableNumber.toString(),
            seats: table.seatNumber.toString(),
            isUpdate: true,
            isOpen: true
        });
    };

    return (
        <div className='flex items-center justify-between rounded-lg px-4 py-2 outline outline-2 outline-gray-300'>
            <div className='space-y-3'>
                <div className=''>No. {table.tableNumber}</div>
                <div className=''>Seats: {table.seatNumber}</div>
            </div>
            <div className='flex gap-2'>
                <Button
                    className='flex items-center justify-center hover:bg-blue-500'
                    onClick={handleOpenEditModal}
                >
                    <HiOutlinePencilSquare className='h-5 w-5' />
                </Button>
                {/* <Button className='flex items-center justify-center hover:bg-red-500'>
                    <BsTrash2 className='h-5 w-5' />
                </Button> */}
            </div>
        </div>
    );
};

export default TableCard;
