'use client';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { TableType } from '@/types';

import { useGetAllTables } from '@/hooks/table/use-get-table';
import CustomerModal from './_components/CustomerModal';
import TableCard from './_components/TableCard';
import { useAppSelector } from '@/hooks/redux-hook';

const TablePage: React.FC = () => {
    Modal.setAppElement('body');

    const [isOpen, setIsOpen] = useState(false);

    const { getTablesData, isTablesLoading } = useGetAllTables();

    const state = useAppSelector((state) => state.reducer.order);

    useEffect(() => {
        console.log('order state', state);
    }, [state]);

    const tables = Object.values(getTablesData?.entities || {}) as TableType[];

    if (isTablesLoading) {
        return <div>Loading tables...</div>;
    }

    const getCountTableStatus = (tables: TableType[]) => {
        let numberOfEmptyTable = 0;
        let numberOfOccupiedTable = 0;

        tables.forEach((table) => {
            switch (table.tableStatus) {
                case 'EMPTY':
                    numberOfEmptyTable++;
                    break;
                case 'OCCUPIED':
                    numberOfOccupiedTable++;
                    break;
                default:
            }
        });

        return { numberOfEmptyTable, numberOfOccupiedTable };
    };

    const { numberOfEmptyTable, numberOfOccupiedTable } =
        getCountTableStatus(tables);

    return (
        <>
            <div className='px-10 py-5'>
                {/* Overview */}
                <div className='flex justify-center'>
                    <div className='inline-flex items-center rounded px-8 py-2 shadow-xl'>
                        <h1 className='font-bold'>Tables:</h1>
                        <ul className='ml-4 flex items-center gap-8'>
                            <li className='flex items-center gap-2'>
                                <div className='h-2 w-2 rounded-full outline outline-4 outline-[#9CA3AF]' />
                                <span>Free</span>
                                <div className='h-5 border' />
                                <span>{numberOfEmptyTable}</span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <div className='h-2 w-2 rounded-full outline outline-4 outline-[#F59E0B]' />
                                <span>Pending</span>
                                <div className='h-5 border' />
                                <span>{numberOfOccupiedTable}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className='mt-6 grid grid-flow-row gap-10 sm:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6'>
                    {tables.map((table) => (
                        <li key={table.id}>
                            <TableCard table={table} setIsOpen={setIsOpen} />
                        </li>
                    ))}
                </ul>
            </div>

            <CustomerModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default TablePage;
