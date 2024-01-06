'use client';

import { InventoryType } from '@/types';
import EmployeeCard from './EmployeeCard';
import RadialBarChart from '@/components/charts/RadialBarChart';
import {
    radialBarChartDataInventory,
    radialBarChartOptionsInventory
} from '@/constants/charts';

interface EmployeeListProps {
    inventories?: InventoryType[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ inventories }) => {
    return (
        <div className='flex items-center justify-center'>
            <div className='min-w-full'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white text-left text-sm'>
                        <thead className=''>
                            <tr>
                                <th
                                    scope='col'
                                    className='py-4 font-bold text-tertiary-subtitle'
                                >
                                    Name
                                </th>
                                <th
                                    scope='col'
                                    className='py-4 font-bold text-tertiary-subtitle'
                                >
                                    Supplier
                                </th>
                                <th
                                    scope='col'
                                    className='py-4 font-bold text-tertiary-subtitle'
                                >
                                    Unit
                                </th>
                                <th
                                    scope='col'
                                    className='py-4 font-bold text-tertiary-subtitle'
                                >
                                    Export / Import
                                </th>
                                {/* <th
                                    scope='col'
                                    className='py-4 font-medium text-gray-900'
                                ></th> */}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 border-t border-gray-200 text-lg font-bold text-tertiary'>
                            {/* {Object.keys(employees).map((item, id) => {
                                return (
                                    <EmployeeCard
                                        key={employees[item].id}
                                        role={employees[item].role}
                                        id={employees[item].id}
                                        lastName={employees[item].lastName}
                                        firstName={employees[item].firstName}
                                        phoneNumber={
                                            employees[item].phoneNumber
                                        }
                                        status={employees[item].status}
                                        email={employees[item].email}
                                    />
                                );
                            })} */}

                            {/* Card cứng để xem đa dạng các status và trạng thái hoạt động */}
                            <tr className='hover:bg-gray-50'>
                                <th className='py-4'>Inventory name</th>
                                <td className='py-4'>Supplier name</td>
                                <td className='py-4'>kg</td>
                                <td className='py-4'>
                                    <div className='block'>
                                        <div className='flex flex-wrap items-center font-semibold'>
                                            <span>150 / 1235</span>
                                            <div className='ml-2 max-h-[60px]'>
                                                <RadialBarChart
                                                    chartData={radialBarChartDataInventory(
                                                        96.12
                                                    )}
                                                    chartOptions={
                                                        radialBarChartOptionsInventory
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr className='hover:bg-gray-50'>
                                <th className='py-4'>Inventory name</th>
                                <td className='py-4'>Supplier name</td>
                                <td className='py-4'>kg</td>
                                <td className='py-4'>
                                    <div className='block'>
                                        <div className='flex flex-wrap items-center font-semibold'>
                                            <span>150 / 1235</span>
                                            <div className='ml-2 max-h-[60px]'>
                                                <RadialBarChart
                                                    chartData={radialBarChartDataInventory(
                                                        12.92
                                                    )}
                                                    chartOptions={
                                                        radialBarChartOptionsInventory
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr className='hover:bg-gray-50'>
                                <th className='py-4'>Inventory name</th>
                                <td className='py-4'>Supplier name</td>
                                <td className='py-4'>kg</td>
                                <td className='py-4'>
                                    <div className='block'>
                                        <div className='flex flex-wrap items-center font-semibold'>
                                            <span>150 / 1235</span>
                                            <div className='ml-2 max-h-[60px]'>
                                                <RadialBarChart
                                                    chartData={radialBarChartDataInventory(
                                                        57.92
                                                    )}
                                                    chartOptions={
                                                        radialBarChartOptionsInventory
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
