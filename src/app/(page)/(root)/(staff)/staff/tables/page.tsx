'use client';
import { TableType } from '@/types';
import TableCard from './_components/common/TableCard';
import TableList from './_components/TableList';
import { useGetTablesQuery } from '@/redux/services/table-api';
import { useGetAllTables } from '@/hooks/table/use-get-table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTableOrder } from '@/redux/features/table-order-slice';
import { RootState } from '@/redux/store';

// Mảng TableData cứng với 16 object, trong đó giá trị của key status là 0, 1 hoặc 2
// const TableData: TableType[] = [
//     { id: '1', seatNumber: 4, tableNumber: 1, status: { id: '' } },
//     { id: '2', seatNumber: 4, tableNumber: 2, status: 1 },
//     { id: '3', seatNumber: 4, tableNumber: 4, status: 0 },
//     { id: '4', seatNumber: 4, tableNumber: 5, status: 1 },
//     { id: '5', seatNumber: 4, tableNumber: 7, status: 0 },
//     { id: '6', seatNumber: 4, tableNumber: 8, status: 1 },
//     { id: '7', seatNumber: 4, tableNumber: 10, status: 0 },
//     { id: '8', seatNumber: 4, tableNumber: 11, status: 1 },
//     { id: '9', seatNumber: 4, tableNumber: 13, status: 0 },
//     { id: '10', seatNumber: 4, tableNumber: 14, status: 1 },
//     { id: '11', seatNumber: 4, tableNumber: 16, status: 0 }
// ];

const getCountTableStatus = (tables: any) => {
    let numberOfEmptyTable = 0;
    let numberOfOccupiedTable = 0;

    Object.keys(tables).forEach((table) => {
        switch (tables[table].tableStatus) {
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

const TablePage = () => {
    const { tables, isTablesLoading, isTablesSuccess } = useGetAllTables();

    if (isTablesLoading) {
        return <div>Loading tables...</div>;
    }

    if (isTablesSuccess) {
        console.log('tables:::', tables);

        const numberOfEmptyTable = getCountTableStatus(
            tables?.entities
        ).numberOfEmptyTable;
        const numberOfOccupiedTable = getCountTableStatus(
            tables?.entities
        ).numberOfOccupiedTable;

        return (
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

                <TableList tables={tables?.entities} />
            </div>
        );
    }
};

export default TablePage;
