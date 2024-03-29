import { LineChart, Receipt, Users } from 'lucide-react';

import Widget from '@/components/report/Widget';

import { convertPriceToString } from '@/utils';
import { MdAttachMoney, MdOutlineReceiptLong } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import { IoFastFoodOutline } from 'react-icons/io5';
import { TbBrandAirtable } from 'react-icons/tb';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import useGetMonthlyReport from '@/hooks/monthly-report/use-get-monthly-report';

interface IProps {}

export default function TotalReport({}: IProps) {
    const {
        monthlyReports,
        isMonthlyReportError,
        isMonthlyReportsLoading,
        isMonthlyReportsSuccess,
        monthlyReportError
    } = useGetMonthlyReport({ year: '2023' });

    console.log('monthlyReports:::', monthlyReports);
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lgl:grid-cols-3'>
            {/* Total Revenue */}
            <Widget
                icon={<MdAttachMoney className='text-3xl' />}
                title='Total Revenue'
                value={convertPriceToString(265479000) + ' VNĐ'}
            />

            {/* Total Orders */}
            <Widget
                icon={<MdOutlineReceiptLong className='text-3xl' />}
                title='Total Orders'
                value={convertPriceToString(2119) + ' orders'}
            />

            {/* Vistors */}
            <div className='grid columns-auto md:col-span-2 lgl:col-auto '>
                <Widget
                    icon={<GoPeople className='text-3xl' />}
                    title='Customers'
                    value={convertPriceToString(2332) + ' customers'}
                />
            </div>

            {/* <Widget
                icon={<IoFastFoodOutline className='text-3xl' />}
                title='Foods'
                value={`${convertPriceToString(7204)} foods`}
            />

            <Widget
                icon={<TbBrandAirtable className='text-3xl' />}
                title='Tables'
                value={`24 / 52 tables`}
            />

            <Widget
                icon={<HiOutlineUserGroup className='text-3xl' />}
                title='Staffs'
                value={`${convertPriceToString(137)} staffs`}
            /> */}
        </div>
    );
}
