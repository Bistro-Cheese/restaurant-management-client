import BarChart from '@/components/charts/BarChart';
import { barChartDataTotalCustomers } from '@/constants/charts';
import { barChartOptionsTotalCustomers } from '@/constants/charts';
import { MdArrowDropUp } from 'react-icons/md';
import Card from '@/components/common/Card';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { convertPriceToString } from '@/utils';

const TotalCustomers: React.FC = () => {
    return (
        <Card className='flex-col px-4'>
            <div className='mt-4 inline-block'>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-tertiary sm:text-lg'>
                        Total customers
                    </p>
                    <button
                        onClick={() => {}}
                        className='inline-flex items-center justify-center rounded-lg p-2 text-tertiary transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95 active:bg-gray-200'
                    >
                        <FaRegCalendarAlt className='h-5 w-5 sm:h-6 sm:w-6' />
                    </button>
                </div>
            </div>

            <div className='block'>
                <div className='flex flex-wrap items-center'>
                    <span className='text-xl font-bold text-tertiary mdl:text-2xl'>
                        {convertPriceToString(142587)}{' '}
                        <span className='text-[0.75em] text-tertiary-subtitle'>
                            customers
                        </span>
                    </span>

                    <span className='ml-2 flex items-center text-sm text-green-500'>
                        <MdArrowDropUp className='h-5 w-5' />
                        <p className='text-sm'> +2.45%</p>
                    </span>
                </div>
            </div>

            <div className='mb-4 mt-2 block h-[12rem] w-full mdl:h-[16rem] lgl:h-[18rem] xxl:h-[24rem]'>
                <BarChart
                    chartData={barChartDataTotalCustomers}
                    chartOptions={barChartOptionsTotalCustomers}
                />
            </div>
        </Card>
    );
};

export default TotalCustomers;
