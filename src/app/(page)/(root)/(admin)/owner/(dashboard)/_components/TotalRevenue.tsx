import {
    MdArrowDropUp,
    MdOutlineCalendarToday,
    MdBarChart
} from 'react-icons/md';
import Card from '@/components/common/Card';
import {
    lineAreaChartDataTotalRevenue,
    lineAreaChartOptionsTotalRevenue
} from '@/constants/charts';
import LineChart from '@/components/charts/LineChart';
import { FaRegCalendarAlt } from 'react-icons/fa';
import LineAreaChart from '@/components/charts/LineAreaChart';
import { convertPriceToString } from '@/utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { timeRange } from '@/utils/fake-data';

const TotalRevenue: React.FC = () => {
    return (
        <Card className='flex-col !px-4'>
            <div className='mt-4 inline-block'>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-tertiary sm:text-lg'>
                        Total revenue
                    </p>

                    <button
                        onClick={() => {}}
                        className='inline-flex items-center justify-center rounded-lg p-2 text-tertiary transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95 active:bg-gray-200'
                    >
                        {/* <FaRegCalendarAlt className='h-5 w-5 sm:h-6 sm:w-6' /> */}
                        <select
                            className='w-full rounded px-2 py-1 text-tertiary outline outline-1 outline-gray-400'
                            value={'Monthly'}
                            onChange={() => {}}
                        >
                            {timeRange.map((item, index) => {
                                return (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </button>
                </div>
            </div>

            <div className='block'>
                <div className='flex flex-wrap items-center'>
                    <p className='text-xl font-bold text-tertiary mdl:text-2xl'>
                        <span className='text-[0.85em] font-black text-tertiary'>
                            &#8363;
                        </span>
                        {convertPriceToString(4374137222)}
                    </p>

                    <span className='ml-2 flex items-center'>
                        <MdArrowDropUp className='text-success' />
                        <p className='text-sm text-success'> +2.45%</p>
                    </span>
                </div>
            </div>

            <div className='mb-4 mt-2 block h-[12rem] w-full mdl:h-[16rem] lgl:h-[18rem] xxl:h-[24rem]'>
                <LineAreaChart
                    chartOptions={lineAreaChartOptionsTotalRevenue}
                    chartData={lineAreaChartDataTotalRevenue}
                />
            </div>
        </Card>
    );
};

export default TotalRevenue;
