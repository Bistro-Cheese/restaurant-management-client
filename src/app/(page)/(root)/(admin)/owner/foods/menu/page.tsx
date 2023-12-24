'use client';

import { FoodList } from '@/app/(page)/(root)/(admin)/_components/food-list';
import { FoodsFilter } from '@/components/food/foods-filter';
import { Button } from '@/components/ui/button';
import { useGetAllFoods } from '@/hooks/food/use-get-foods';
import { useGetSearchFoods } from '@/hooks/food/use-get-search-foods';
import Link from 'next/link';

const FoodMenu = () => {
    const { foods, isFoodsLoading, isFoodsSuccess } = useGetAllFoods();

    const {
        searchParams,
        searchFoods,
        isSearchFoodsLoading,
        isSearchFoodsSuccess
    } = useGetSearchFoods();

    if (isFoodsLoading) {
        return <div>Loading All Foods...</div>;
    }

    if (searchFoods && searchParams.size > 0) {
        const { entities } = searchFoods;
        return (
            <div>
                <div className='p-6'>
                    <div className='flex p-6'>
                        <FoodsFilter />
                        <Link
                            href='/owner/foods/create'
                            className='ml-4 hidden justify-end md:block'
                        >
                            <Button className='bg-harvest-gold-500 '>
                                Add Food
                            </Button>
                        </Link>
                    </div>
                    <FoodList items={entities} />
                </div>
            </div>
        );
    }

    if (isFoodsSuccess) {
        console.log('foods:::', foods);
        return (
            <div>
                <div className='p-6'>
                    <div className='flex p-6'>
                        <FoodsFilter />
                        <Link
                            href='/owner/foods/create'
                            className='ml-4 hidden justify-end md:block'
                        >
                            <Button className='bg-harvest-gold-500 '>
                                Add Food
                            </Button>
                        </Link>
                    </div>
                    <FoodList items={foods?.entities} />
                </div>
            </div>
        );
    }
};

export default FoodMenu;
