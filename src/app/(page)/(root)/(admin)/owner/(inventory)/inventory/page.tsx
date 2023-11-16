"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InventoryList from "../../../_components/inventory-list";
import { useGetInventory } from "@/hooks/inventory/use-get-inventory";
import { useGetIngredientsQuery } from "@/redux/services/ingredient-api";

const Inventory = () => {

    const { inventory } = useGetInventory();
    const { data: ingredients } = useGetIngredientsQuery();

    console.log("INGREDIENTS:::", ingredients)

    console.log("INVENTORY:::", inventory);

    return (
        <div className='px-6 py-4'>
            <div className='mb-4 flex justify-between'>
                <Heading title='Inventory' description='' />
                <Link
                    href='/owner/inventory/create'
                    className='hidden justify-end md:block'
                >
                    <Button>ADD</Button>
                </Link>
            </div>

            <InventoryList inventoryList={inventory} />
        </div>
    );
};

export default Inventory;