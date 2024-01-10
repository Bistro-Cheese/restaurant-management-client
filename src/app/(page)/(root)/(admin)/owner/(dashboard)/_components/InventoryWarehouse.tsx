import Card from '@/components/common/Card';
import { FaRegCalendarAlt } from 'react-icons/fa';
import InventoryTable from './common/inventory/InvetoryTable';
import { InventoryReportType, InventoryType } from '@/types';
import useGetAllInventoryReports from '@/hooks/inventory-report/use-get-inventory-reports';
import { ChangeEvent, useState } from 'react';

const InventoryWarehouse: React.FC = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const pMonth = month.toString().padStart(2, '0');
    const pDay = day.toString().padStart(2, '0');

    const currentDate = `${pDay}/${pMonth}/${year}`;
    const [date, setDate] = useState<string>(currentDate);

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value.split('-').reverse().join('/');
        setDate(newDate);
        console.log('newDate:::', date);
    };

    return (
        <Card className='flex w-full flex-col px-4'>
            <div className='mt-4 inline-block'>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-tertiary sm:text-lg'>
                        Inventory
                    </p>

                    <button
                        onClick={() => {}}
                        className='inline-flex items-center justify-center rounded-lg p-2 text-tertiary transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95 active:bg-gray-200'
                    >
                        {/* <FaRegCalendarAlt className='h-5 w-5 sm:h-6 sm:w-6' /> */}
                        <input
                            type='date'
                            className='w-full rounded px-3 py-1 text-tertiary outline outline-1 outline-gray-400'
                            placeholder='mm/DD/yyyy'
                            value={date.split('/').reverse().join('-')}
                            onChange={handleChangeDate}
                        />
                    </button>
                </div>
            </div>

            <div className='mb-4 block h-full w-full'>
                <InventoryTable date={date} />
            </div>
        </Card>
    );
};

export default InventoryWarehouse;
