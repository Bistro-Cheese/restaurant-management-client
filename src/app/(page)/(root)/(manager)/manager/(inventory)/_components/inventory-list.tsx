import { useGetInventory } from '@/hooks/inventory/use-get-inventory';
import { InventoryType } from '@/types';
import { useEffect, useState } from 'react';

const InventoryList = () => {
    const { inventory, isInventorySuccess, isInventoryLoading } =
        useGetInventory();

    const [inventoryList, setInventoryList] = useState<InventoryType[]>([]);

    useEffect(() => {
        if (isInventorySuccess) {
            setInventoryList(
                Object.values(inventory?.entities || {}) as InventoryType[]
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInventorySuccess]);

    if (isInventoryLoading) {
        return (
            <div className='text-center text-gray-500'>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md'>
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
                            Supplier
                        </th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                    {inventoryList.map((inventory: InventoryType) => (
                        <tr key={inventory.id}>
                            <td className='whitespace-nowrap px-6 py-4'>
                                <div className='flex items-center'>
                                    <div className='text-sm font-medium text-gray-900'>
                                        {inventory.ingredientName}
                                    </div>
                                </div>
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                                <div className='text-sm text-gray-900'>
                                    {inventory.totalQuantity}
                                </div>
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                                <div className='text-sm text-gray-900'>
                                    {inventory.unit}
                                </div>
                            </td>
                            <td className='whitespace-nowrap px-6 py-4'>
                                <div className='text-sm text-gray-900'>
                                    {inventory.supplier}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
