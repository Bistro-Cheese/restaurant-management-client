'use client';
import RadialBarChart from '@/components/charts/RadialBarChart';
import {
    radialBarChartDataInventory,
    radialBarChartOptionsInventory
} from '@/constants/charts';
import useGetAllInventoryReports from '@/hooks/inventory-report/use-get-inventory-reports';

const InventoryTable: React.FC<{ date: string }> = ({ date }) => {
    const {
        inventoryReports,
        isInventoryReportError,
        isInventoryReportsLoading,
        isInventoryReportsSuccess,
        inventoryReportError
    } = useGetAllInventoryReports({ date: date });

    if (isInventoryReportsLoading) {
        return <div>Please wait, loading inventory reports...</div>;
    }

    if (isInventoryReportError) {
        return <div>Sorry, get data inventory error.</div>;
    }

    if (isInventoryReportsSuccess) {
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
                            <tbody className='divide-y divide-gray-100 border-t border-gray-200 font-bold text-tertiary'>
                                {Object.values(inventoryReports!.entities).map(
                                    (item, id) => {
                                        const valuePercentage =
                                            (item!.quantity /
                                                item!.importQuantity) *
                                            100;

                                        return (
                                            <tr
                                                key={item!.id}
                                                className='hover:bg-gray-50'
                                            >
                                                <th className='py-4'>
                                                    {item!.ingredientName}
                                                </th>
                                                <td className='py-4'>
                                                    {item!.supplier}
                                                </td>
                                                <td className='py-4'>
                                                    {item!.unit}
                                                </td>
                                                <td className='py-4'>
                                                    <div className='block'>
                                                        <div className='flex flex-wrap items-center font-semibold'>
                                                            <div>
                                                                <span>
                                                                    {
                                                                        item!
                                                                            .exportQuantity
                                                                    }{' '}
                                                                    /{' '}
                                                                    {
                                                                        item!
                                                                            .importQuantity
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className='ml-2 max-h-[60px]'>
                                                                <RadialBarChart
                                                                    chartData={radialBarChartDataInventory(
                                                                        valuePercentage
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
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

export default InventoryTable;
