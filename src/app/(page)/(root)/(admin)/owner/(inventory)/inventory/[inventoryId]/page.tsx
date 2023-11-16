'use client';

import { InventoryForm } from "../../../_components/create-inventory-form";

interface InventoryPageProps {
    params: {
        inventoryId: string;
    };
}
const InventoryPage: React.FC<InventoryPageProps> = ({ params }) => {
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <InventoryForm inventoryId={params.inventoryId} />
            </div>
        </div>
    );
};

export default InventoryPage;
