'use client';

import Modal from 'react-modal';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import TableCard from '../_components/TableCard';
import TableModal from '../_components/TableModal';

import { useGetAllTables } from '@/hooks/table/use-get-table';
import { TableType } from '@/types';

export type ModalType = {
    tableId: string;
    tableNumber: string;
    seats: string;
    isOpen: boolean;
    isUpdate: boolean;
};

export const initialModalState: ModalType = {
    tableId: '',
    tableNumber: '',
    seats: '',
    isOpen: false,
    isUpdate: false
};

export default function TablesPage() {
    const [modalState, setModalState] = useState<ModalType>(initialModalState);

    const { getTablesData, isTablesError, isTablesLoading } = useGetAllTables();

    const tables = Object.values(getTablesData?.entities || {}) as TableType[];

    const handleOpenCreateModal = () => {
        setModalState({
            ...initialModalState,
            isOpen: true
        });
    };

    if (isTablesLoading) {
        return <div>Loading All Tables...</div>;
    }

    if (isTablesError) {
        return <div>Error Get Tables</div>;
    }

    Modal.setAppElement('body');

    return (
        <>
            <div className='px-6 py-4'>
                {/* <div className='mb-4 flex justify-between'>
                    <Heading title='Table list' description='' />
                </div> */}

                <div className='grid grid-cols-1 gap-4 sml:grid-cols-2 mdl:grid-cols-3 lgl:grid-cols-4 xxl:grid-cols-5'>
                    <div className='rounded-lg outline-dashed outline-2 outline-gray-300'>
                        <div className='flex h-full w-full items-center justify-center px-2'>
                            <Button
                                className='my-4 space-x-2 hover:bg-green-500'
                                onClick={handleOpenCreateModal}
                            >
                                <span>Add</span>
                                <IoAdd className='h-5 w-5' />
                            </Button>
                        </div>
                    </div>

                    {tables.map((table) => (
                        <TableCard
                            key={table.id}
                            table={table}
                            setModalState={setModalState}
                        />
                    ))}
                </div>
            </div>

            <TableModal modalState={modalState} setModalState={setModalState} />
        </>
    );
}
