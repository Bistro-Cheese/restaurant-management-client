import TableCard from './TableCard';

interface TableListProps {
    tables: any;
}

const TableList = ({ tables }: TableListProps) => {
    return (
        <div className='mt-6 grid grid-flow-row gap-10 sm:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6'>
            {Object.keys(tables).map((item, id) => {
                return (
                    <TableCard
                        key={tables[item].id}
                        id={tables[item].id}
                        tableNumber={tables[item].tableNumber}
                        status={tables[item].status}
                        numberOfSeat={tables[item].numberOfSeat}
                    />
                );
            })}
        </div>
    );
};

export default TableList;
