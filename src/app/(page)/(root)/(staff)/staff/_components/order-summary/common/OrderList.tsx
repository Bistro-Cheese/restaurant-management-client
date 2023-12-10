import OrderLineCard from './OrderLineCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const OrderData = [
    {
        id: '38326134-3532-3265-2d38-3132382d3131',
        name: 'Bánh Mì Burger Phô Mai',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Burger bò mỹ phẩm với phô mai Cheddar, hành tây, bơ rút, và rau sống trên bánh mì hấp',
        image: 'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3
    },
    {
        id: '38326134-3532-3265-2d38-3132382d3131',
        name: 'Bánh Mì Burger Phô Mai',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Burger bò mỹ phẩm với phô mai Cheddar, hành tây, bơ rút, và rau sống trên bánh mì hấp',
        image: 'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3
    },
    {
        id: '38326134-3532-3265-2d38-3132382d3131',
        name: 'Bánh Mì Burger Phô Mai',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Burger bò mỹ phẩm với phô mai Cheddar, hành tây, bơ rút, và rau sống trên bánh mì hấp',
        image: 'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3
    },
    {
        id: '38326134-3532-3265-2d38-3132382d3131',
        name: 'Bánh Mì Burger Phô Mai',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Burger bò mỹ phẩm với phô mai Cheddar, hành tây, bơ rút, và rau sống trên bánh mì hấp',
        image: 'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3
    },
    {
        id: '38326134-3532-3265-2d38-3132382d3131',
        name: 'Bánh Mì Burger Phô Mai',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Burger bò mỹ phẩm với phô mai Cheddar, hành tây, bơ rút, và rau sống trên bánh mì hấp',
        image: 'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3
    },
    {
        id: '38326134-3532-3265-2d38-3132382d3131',
        name: 'Bánh Mì Burger Phô Mai',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Burger bò mỹ phẩm với phô mai Cheddar, hành tây, bơ rút, và rau sống trên bánh mì hấp',
        image: 'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3
    },
    {
        id: '38326134-3532-3265-2d38-3132382d3131',
        name: 'Bánh Mì Burger Phô Mai',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Burger bò mỹ phẩm với phô mai Cheddar, hành tây, bơ rút, và rau sống trên bánh mì hấp',
        image: 'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3
    }
];

const OrderList = () => {
    const orderLines = useSelector(
        (state: RootState) => state.reducer.orderLine.orderLines
    );

    return (
        <ul className='flex grow flex-col space-y-1 overflow-y-auto overflow-x-hidden py-1'>
            {orderLines?.map((item) => (
                <li key={item.id}>
                    <OrderLineCard orderLine={item} />
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
