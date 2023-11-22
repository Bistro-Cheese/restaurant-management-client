import OrderCard from './common/OrderCard';

interface OrderCardProps {
    orders: any;
}
const OrderList = ({ orders }: OrderCardProps) => {
    return (
        <ul className='mt-4 flex h-[420px] w-full flex-col space-y-8 overflow-y-scroll py-3'>
            {Object.keys(orders).map((item, id) => {
                return (
                    <li key={orders[item].id}>
                        <OrderCard
                            key={orders[item].id}
                            id={orders[item].id}
                            name={orders[item].name}
                            category={orders[item].category}
                            productImage={orders[item].productImage}
                            price={orders[item].price}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default OrderList;
