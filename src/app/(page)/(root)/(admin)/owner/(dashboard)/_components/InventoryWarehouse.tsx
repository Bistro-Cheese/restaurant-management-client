import Card from '@/components/common/Card';
import { FaRegCalendarAlt } from 'react-icons/fa';
import InventoryTable from './common/inventory/InvetoryTable';
import { InventoryType } from '@/types';

function generateRandomQuantity(): number {
    return Math.floor(Math.random() * 501) + 1000; // Random quantity between 1000 and 1500
}

function generateInventoriesArray(): InventoryType[] {
    const inventoriesArray: InventoryType[] = [];

    for (let i = 1; i <= 15; i++) {
        const inventory: InventoryType = {
            id: i.toString(),
            ingredientName: `Ingredient ${i}`,
            supplier: `Supplier ${i}`,
            totalQuantity: generateRandomQuantity(),
            unit: 'kg'
        };

        inventoriesArray.push(inventory);
    }

    return inventoriesArray;
}

const InventoryWarehouse: React.FC = () => {
    return (
        <Card className='flex w-full flex-col px-4'>
            <div className='mt-4 inline-block'>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-tertiary sm:text-lg'>
                        Inventory
                    </p>

                    <button
                        onClick={() => {}}
                        className='inline-flex items-center justify-center rounded-lg p-2 text-tertiary transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95 active:bg-gray-200'
                    >
                        <FaRegCalendarAlt className='h-5 w-5 sm:h-6 sm:w-6' />
                    </button>
                </div>
            </div>

            <div className='mb-4 block h-full w-full'>
                <InventoryTable inventories={generateInventoriesArray()} />
            </div>
        </Card>
    );
};

export default InventoryWarehouse;
