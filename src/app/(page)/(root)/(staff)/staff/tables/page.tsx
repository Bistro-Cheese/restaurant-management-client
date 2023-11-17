import TableCard from './_components/TableCard';

function TablePage() {
    return (
        <div className='mx-20 mt-10'>
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

            {/* Details */}
            <ul className='my-10 grid grid-cols-5 gap-8'>
                <li className=''>
                    <TableCard table={1} status={0} />
                </li>
                <li className=''>
                    <TableCard table={2} status={1} />
                </li>
                <li className=''>
                    <TableCard table={3} status={2} />
                </li>
            </ul>
        </div>
    );
}
export default TablePage;
