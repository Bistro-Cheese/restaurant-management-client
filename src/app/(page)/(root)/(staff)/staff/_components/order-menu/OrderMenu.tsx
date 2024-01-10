import FoodCard from './common/FoodCard';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface OrderMenuProps {
    foods: any;
}

const OrderMenu: FC<OrderMenuProps> = ({ foods }) => {
    return (
        <div className='float-left w-full px-12 py-4 xmdl:w-4/6 xl:w-3/4'>
            {/* <FoodsFilter /> */}

            <ul className='my-4 grid grid-flow-row gap-10 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4'>
                {Object.keys(foods).map((item, id) => {
                    return (
                        <motion.li
                            key={foods[item].id}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.1 + id * 0.075,
                                ease: 'easeInOut'
                            }}
                        >
                            <FoodCard food={foods[item]} />
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
};

export default OrderMenu;
