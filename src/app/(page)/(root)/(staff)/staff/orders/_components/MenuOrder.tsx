import { FoodsFilter } from '@/components/food/foods-filter';
import FoodCard from './common/FoodCard';

interface MenuOrderProps {
    foods: any;
    orders: any;
}

const MenuOrder = ({ foods, orders }: MenuOrderProps) => {
    return (
        <div className='float-left w-[75%] px-12 py-4'>
            <FoodsFilter />

            <ul className='mt-4 grid grid-flow-row gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                {Object.keys(foods).map((item, id) => {
                    return (
                        <li key={foods[item].id}>
                            <FoodCard
                                key={foods[item].id}
                                id={foods[item].id}
                                name={foods[item].name}
                                category={foods[item].category.name}
                                productImage={foods[item].productImage}
                                price={foods[item].price}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MenuOrder;
