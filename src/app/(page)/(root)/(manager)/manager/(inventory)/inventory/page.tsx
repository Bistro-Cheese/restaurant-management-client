'use client';

import Link from 'next/link';

import InventoryList from '../_components/inventory-list';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';

const Inventory = () => {
    return (
        <div className='px-6 py-4'>
            <div className='mb-4 flex justify-between'>
                <Heading title='Inventory' description='' />
                <Link
                    href='/manager/inventory/update'
                    className='hidden justify-end md:block'
                >
                    <Button>Update</Button>
                </Link>
            </div>

            <InventoryList />
        </div>
    );
};

export default Inventory;
