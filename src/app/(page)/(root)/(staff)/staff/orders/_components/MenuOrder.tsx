import { FoodsFilter } from '@/components/food/foods-filter';
import FoodCard from './common/FoodCard';

interface MenuOrderProps {
    foods: any;
}

const MenuOrder = ({ foods }: MenuOrderProps) => {
    return (
        <div className='float-left w-full px-12 py-4 xmdl:w-4/6 xl:w-3/4'>
            {/* <FoodsFilter /> */}

            <ul className='my-4 grid grid-flow-row gap-10 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4'>
                {Object.keys(foods).map((item, id) => {
                    return (
                        <li key={foods[item].id}>
                            <FoodCard food={foods[item]} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MenuOrder;
