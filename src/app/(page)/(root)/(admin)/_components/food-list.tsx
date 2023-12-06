'use client';

import { FoodCard } from '@/components/food/food-card';

interface FoodListProps {
    items: any;
}
export const FoodList = ({ items }: FoodListProps) => {
    return (
        <div>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>
                {Object.keys(items).map((item, id) => {
                    return (
                        <FoodCard
                            key={items[item].id}
                            category={items[item].category.name}
                            id={items[item].id}
                            name={items[item].name}
                            price={items[item].price}
                            status={items[item].status}
                            image={items[item].image}
                        />
                    );
                })}
            </div>
            {items.length === 0 && (
                <div className='mt-10 text-center text-sm text-muted-foreground'>
                    No Foods found
                </div>
            )}
        </div>
    );
};
