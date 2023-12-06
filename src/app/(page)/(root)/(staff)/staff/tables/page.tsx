import TableCard from './_components/TableCard';
import TableList from './_components/TableList';

type TableDataType = {
    id: string;
    numberOfSeat: number;
    tableNumber: number;
    status: 0 | 1 | 2;
};

// Mảng TableData cứng với 16 object, trong đó giá trị của key status là 0, 1 hoặc 2
const TableData: TableDataType[] = [
    { id: '1', numberOfSeat: 4, tableNumber: 1, status: 0 },
    { id: '2', numberOfSeat: 4, tableNumber: 2, status: 1 },
    { id: '3', numberOfSeat: 4, tableNumber: 3, status: 2 },
    { id: '4', numberOfSeat: 4, tableNumber: 4, status: 0 },
    { id: '5', numberOfSeat: 4, tableNumber: 5, status: 1 },
    { id: '6', numberOfSeat: 4, tableNumber: 6, status: 2 },
    { id: '7', numberOfSeat: 4, tableNumber: 7, status: 0 },
    { id: '8', numberOfSeat: 4, tableNumber: 8, status: 1 },
    { id: '9', numberOfSeat: 4, tableNumber: 9, status: 2 },
    { id: '10', numberOfSeat: 4, tableNumber: 10, status: 0 },
    { id: '11', numberOfSeat: 4, tableNumber: 11, status: 1 },
    { id: '12', numberOfSeat: 4, tableNumber: 12, status: 2 },
    { id: '13', numberOfSeat: 4, tableNumber: 13, status: 0 },
    { id: '14', numberOfSeat: 4, tableNumber: 14, status: 1 },
    { id: '15', numberOfSeat: 4, tableNumber: 15, status: 2 },
    { id: '16', numberOfSeat: 4, tableNumber: 16, status: 0 }
];

const TablePage = () => {
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
                            <span>6</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <div className='h-2 w-2 rounded-full outline outline-4 outline-[#F59E0B]' />
                            <span>Pending</span>
                            <div className='h-5 border' />
                            <span>10</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <div className='h-2 w-2 rounded-full outline outline-4 outline-[#008060]' />
                            <span>Complete</span>
                            <div className='h-5 border' />
                            <span>4</span>
                        </li>
                    </ul>
                </div>
            </div>

            <TableList tables={TableData} />
        </div>
    );
};
export default TablePage;
