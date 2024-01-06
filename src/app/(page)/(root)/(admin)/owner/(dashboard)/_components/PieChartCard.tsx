import PieChart from '@/components/charts/PieChart';
import { pieChartData, pieChartOptions } from '@/constants/charts';
import Card from '@/components/common/Card';

const PieChartCard: React.FC = () => {
    return (
        <Card className='flex-col rounded-[20px] p-3'>
            <div className='flex flex-row justify-between px-3 pt-2'>
                <div>
                    <h4 className='text-navy-700 text-lg font-bold dark:text-white'>
                        Your Pie Chart
                    </h4>
                </div>

                <div className='mb-6 flex items-center justify-center'>
                    <select className='dark:!bg-navy-800 mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:text-white'>
                        <option value='monthly'>Monthly</option>
                        <option value='yearly'>Yearly</option>
                        <option value='weekly'>Weekly</option>
                    </select>
                </div>
            </div>

            <div className='mb-auto flex h-[220px] w-full items-center justify-center'>
                <PieChart
                    chartOptions={pieChartOptions}
                    chartData={pieChartData}
                />
            </div>
            <div className='shadow-shadow-500 dark:!bg-navy-700 flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl dark:shadow-none'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                        <div className='bg-brand-500 h-2 w-2 rounded-full' />
                        <p className='ml-1 text-sm font-normal text-gray-600'>
                            Your Files
                        </p>
                    </div>
                    <p className='text-navy-700 mt-px text-xl font-bold  dark:text-white'>
                        63%
                    </p>
                </div>

                <div className='h-11 w-px bg-gray-300 dark:bg-white/10' />

                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                        <div className='h-2 w-2 rounded-full bg-[#6AD2FF]' />
                        <p className='ml-1 text-sm font-normal text-gray-600'>
                            System
                        </p>
                    </div>
                    <p className='text-navy-700 mt-px text-xl font-bold dark:text-white'>
                        25%
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default PieChartCard;
