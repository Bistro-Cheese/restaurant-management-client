'use client';

import { useSelector } from 'react-redux';
import OrderMenu from './order-menu/OrderMenu';
import OrderSummary from './order-summary/OrderSummary';
import { useGetAllFoods } from '@/hooks/food/use-get-foods';
import { RootState } from '@/redux/store';

const OrderData = [
    {
        id: '33303432-3033-3338-2d38-3132372d3131',
        name: 'Bánh mì nướng với Phô Mai Camembert',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Bánh mì nướng giòn với lớp vỏ ngoài và phô mai Camembert nướng tan chảy bên trong. Được kèmtheo mứt dâu và hạt dẻ.',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer1_qmtpcx.jpg',
        price: 40000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3035-3836-2d38-3132372d3131',
        name: 'Salad Cà Chua Caprese',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Cà chua tươi ngon, phô mai Mozzarella cắt lát mỏng, và lá bạc hà, tất cả được chế biến cùng với dầu ô-liu và nước cốt chanh',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer2_yukeyl.jpg',
        price: 35000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3036-6232-2d38-3132372d3131',
        name: 'Bánh Mì Sandwich Phô Mai Gruyère và Prosciutto',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Bánh mì sandwich với lớp phô mai Gruyère thơm ngon và lớp Prosciutto mỏng, nướng vàng giòn.',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer3_ahte6i.jpg',
        price: 49000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3037-6434-0000-000000000000',
        name: 'Bánh mì nướng với Phô Mai Ricotta và Mứt Dâu',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Bánh mì nướng với phô mai Ricotta mềm mịn và mứt dâu ngọt ngào',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer4_fylmuj.jpg',
        price: 49000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3065-3436-2d38-3132372d3131',
        name: 'Hộp Súp Hành Phô Mai',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Súp hành trắng thơm ngon, phủ lớp phô mai Swiss nướng trên mặt',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer5_tq88yg.jpg',
        price: 49000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
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
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    }
];

const FoodData = [
    {
        id: '33303432-3033-3338-2d38-3132372d3131',
        name: 'Bánh mì nướng với Phô Mai Camembert',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Bánh mì nướng giòn với lớp vỏ ngoài và phô mai Camembert nướng tan chảy bên trong. Được kèmtheo mứt dâu và hạt dẻ.',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer1_qmtpcx.jpg',
        price: 40000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3035-3836-2d38-3132372d3131',
        name: 'Salad Cà Chua Caprese',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Cà chua tươi ngon, phô mai Mozzarella cắt lát mỏng, và lá bạc hà, tất cả được chế biến cùng với dầu ô-liu và nước cốt chanh',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer2_yukeyl.jpg',
        price: 35000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3036-6232-2d38-3132372d3131',
        name: 'Bánh Mì Sandwich Phô Mai Gruyère và Prosciutto',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Bánh mì sandwich với lớp phô mai Gruyère thơm ngon và lớp Prosciutto mỏng, nướng vàng giòn.',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer3_ahte6i.jpg',
        price: 49000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3037-6434-0000-000000000000',
        name: 'Bánh mì nướng với Phô Mai Ricotta và Mứt Dâu',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Bánh mì nướng với phô mai Ricotta mềm mịn và mứt dâu ngọt ngào',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer4_fylmuj.jpg',
        price: 49000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33303432-3065-3436-2d38-3132372d3131',
        name: 'Hộp Súp Hành Phô Mai',
        category: {
            id: 1,
            name: 'Appetizer'
        },
        description:
            'Súp hành trắng thơm ngon, phủ lớp phô mai Swiss nướng trên mặt',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/appetizer5_tq88yg.jpg',
        price: 49000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
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
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza1_ul8uos.jpg',
        price: 109000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '38326134-3535-3163-2d38-3132382d3131',
        name: 'Pizza Quattro Formaggi',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Pizza với tổ hợp bốn loại phô mai: Mozzarella, Gorgonzola, Parmesan và Ricotta',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/pizza2_ffelxl.jpg',
        price: 129000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '38326134-3536-3532-2d38-3132382d3131',
        name: 'Ravioli Phô Mai với Sốt Nấm Trắng',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Ravioli nhân phô mai Ricotta, được phủ lớp sốt nấm trắng kem ngon',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777760/pizza3_kbwhai.jpg',
        price: 139000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '38326134-3563-3130-2d38-3132382d3131',
        name: 'Lasagna Bolognese với Phô Mai Parmesan',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description:
            'Lasagna cổ điển với lớp bò bolognese, mousse phô mai Ricotta và phủ lớp phô mai Parmesan nướng',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777760/pizza4_kj9l4r.jpg',
        price: 139000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '38326134-3564-6130-2d38-3132382d3131',
        name: 'Quiche Lorraine với Phô Mai Gruyère',
        category: {
            id: 2,
            name: 'Main Course'
        },
        description: 'Quiche với nhân bánh béo ngậy, bacon và phô mai Gruyère',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777758/pizza5_i1jtmq.jpg',
        price: 139000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33313237-3961-3461-2d38-3132392d3131',
        name: 'Bánh Phô Mai New York Cheesecake',
        category: {
            id: 3,
            name: 'Dessert'
        },
        description:
            'Cheesecake New York đậm đà với lớp phô mai kem trên đỉnh, được kết hợp với sốt dâu tây',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/dessert1_ow1xpt.jpg',
        price: 79000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    },
    {
        id: '33313237-3965-3363-2d38-3132392d3131',
        name: 'Mousse Phô Mai với Hương Vị Cam',
        category: {
            id: 3,
            name: 'Dessert'
        },
        description:
            'Mousse phô mai mềm mịn với hương vị cam tự nhiên và lớp kem sữa tươi',
        productImage:
            'https://res.cloudinary.com/dc6io9an2/image/upload/v1699777759/dessert2_citu5i.jpg',
        price: 79000,
        status: 3,
        createdDate: '17-11-2023 14:26:06',
        lastModifiedDate: '17-11-2023 18:04:08'
    }
];

interface OrderPageProps {
    tableId: number | null;
}

const OrderPage = () => {
    const { foods, isFoodsLoading, isFoodsSuccess } = useGetAllFoods();
    const order = useSelector((state: RootState) => state.reducer.order);

    if (isFoodsLoading) {
        return <div>Loading All Foods...</div>;
    }

    if (isFoodsSuccess) {
        console.log('foods:::', foods);
        console.log('tableId:::', order.tableId);

        return (
            <>
                <OrderMenu foods={foods?.entities} />
                <OrderSummary />
            </>
        );
    }

    return (
        <>
            <OrderSummary />
        </>
    );
};

export default OrderPage;
