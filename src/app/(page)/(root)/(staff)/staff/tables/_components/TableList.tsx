import Link from 'next/link';
import TableCard from './common/TableCard';

interface TableListProps {
    tables: any;
}

const TableList = ({ tables }: TableListProps) => {
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
