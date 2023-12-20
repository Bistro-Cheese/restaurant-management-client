import TableCard from './common/TableCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';

interface TableListProps {
    tables: any;
}

const TableList = ({ tables }: TableListProps) => {
    const tableOrders = useSelector(
        (state: RootState) => state.reducer.tableOrder.tableOrders
    );

    useEffect(() => {
        console.log('tableOrders:::', tableOrders);
    }, [tableOrders]);

    return (
        <ul className='mt-6 grid grid-flow-row gap-10 sm:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6'>
            {Object.keys(tables).map((table, id) => {
                return (
                    <li key={tables[table].id}>
                        <TableCard table={tables[table]} />
                    </li>
                );
            })}
        </ul>
    );
};

export default TableList;
