import { FoodsFilter } from '@/components/food/foods-filter';
import FoodCard from './common/FoodCard';

interface MenuOrderProps {
    foods: any;
    orders: any;
}

const MenuOrder = ({ foods, orders }: MenuOrderProps) => {
    return (
        <div className='xmdl:w-4/6 float-left w-full px-12 py-4 xl:w-3/4'>
            {/* <FoodsFilter /> */}

            <ul className='xxl:grid-cols-4 mt-4 grid grid-flow-row gap-10 md:grid-cols-2 xl:grid-cols-3'>
                {Object.keys(foods).map((item, id) => {
                    return (
                        <li key={foods[item].id}>
                            <FoodCard
                                key={foods[item].id}
                                id={foods[item].id}
                                name={foods[item].name}
                                category={foods[item].category}
                                image={foods[item].image}
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
