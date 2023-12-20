import { LineChart, Receipt, Users } from 'lucide-react';

import Widget from '@/components/report/Widget';

import { convertPriceToString } from '@/utils';

interface IProps {}

export default function TotalReport({}: IProps) {
    return (
        <div className='grid grid-cols-1 gap-4 bg-harvest-gold-100 p-8 lgl:grid-cols-3 '>
            {/* Total Revenue */}
            <Widget
                icon={
                    <LineChart
                        width={25}
                        height={25}
                        className='text-harvest-gold-900'
                    />
                }
                title='Total Revenue'
                value={convertPriceToString(1200000) + ' VNĐ'}
            />

            {/* Total Orders */}
            <Widget
                icon={
                    <Receipt
                        width={25}
                        height={25}
                        className='text-harvest-gold-900'
                    />
                }
                title='Total Orders'
                value={convertPriceToString(1200) + ' orders'}
            />

            {/* Vistors */}
            <Widget
                icon={
                    <Users
                        width={25}
                        height={25}
                        className='text-harvest-gold-900'
                    />
                }
                title='Vistors'
                value={convertPriceToString(5401) + ' visitors'}
            />
        </div>
    );
}
