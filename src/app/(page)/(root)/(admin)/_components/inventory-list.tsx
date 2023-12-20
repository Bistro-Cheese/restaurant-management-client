const InventoryList = ({ inventoryList }: any) => {
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
                            Type
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
                            Status
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-4 font-medium text-gray-900'
                        ></th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 border-t border-gray-100'></tbody>
            </table>
        </div>
    );
};

export default InventoryList;
