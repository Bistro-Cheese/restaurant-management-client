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
                <div className='flex items-center justify-between gap-4'>
                    <Link href='/manager/inventory/create'>
                        <Button>Add</Button>
                    </Link>
                    <Link
                        href='/manager/inventory/update'
                        className='hidden justify-end md:block'
                    >
                        <Button>Update</Button>
                    </Link>
                </div>
            </div>

            <InventoryList />
        </div>
    );
};

export default Inventory;
