'use client';

import { useGetOperationsQuery } from '@/redux/services/inventory-api';
import OperationType from '@/types/OperationType';

export default function LogPage() {
    const { data, isLoading } = useGetOperationsQuery();

    const operations = Object.values(data?.entities || {}).sort(
        (a, b) =>
            Date.parse(b?.createdAt as string) -
            Date.parse(a?.createdAt as string)
    ) as OperationType[];

    if (isLoading) return <div>Loading...</div>;

    return (
        <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
            <thead className='bg-gray-50'>
                <tr>
                    <th
                        scope='col'
                        className='px-6 py-4 font-medium text-gray-900'
                    >
                        Ingredient
                    </th>
                    <th
                        scope='col'
                        className='px-6 py-4 font-medium text-gray-900'
                    >
                        Quantity
                    </th>
                    <th
                        scope='col'
                        className='px-6 py-4 font-medium text-gray-900'
                    >
                        Unit
                    </th>
                    <th
                        scope='col'
                        className='px-6 py-4 font-medium text-gray-900'
                    >
                        Type
                    </th>
                    <th
                        scope='col'
                        className='px-6 py-4 font-medium text-gray-900'
                    >
                        Date
                    </th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                {operations.map((operation: OperationType) => (
                    <tr key={operation.id}>
                        <td className='whitespace-nowrap px-6 py-4'>
                            <div className='flex items-center'>
                                <div className='text-sm font-medium text-gray-900'>
                                    {operation.inventory.ingredient.name}
                                </div>
                            </div>
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                            <div className='text-sm text-gray-900'>
                                {operation.quantity}
                            </div>
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                            <div className='text-sm text-gray-900'>
                                {operation.inventory.ingredient.unit}
                            </div>
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                            <div className='text-sm text-gray-900'>
                                {operation.type === 0 ? 'Import' : 'Export'}
                            </div>
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                            <div className='text-sm text-gray-900'>
                                <p>{operation.createdAt.substring(11, 19)}</p>
                                <p>{operation.createdAt.substring(0, 10)}</p>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
