import { Header } from '@/components/header';
import { HeaderContent } from '@/components/header-content';
import { Heading } from '@/components/heading';
import { cn } from '@/lib/utils';
import OrderCard from './common/OrderCard';
import OrderList from './OrderList';
import OrderTotal from './OrderTotal';
import { Separator } from '@/components/ui/separator';

interface OrderCardProps {
    orders: any;
}

const OrderSummary = ({ orders }: OrderCardProps) => {
    return (
        <div className='xmdl:flex xmdl:w-2/6 xmdl:flex-col fixed right-0 float-right box-border hidden h-[calc(100vh-80px)] bg-white px-3 py-6 drop-shadow-2xl xl:w-1/4'>
            <div>
                <h1 className='text-center text-[32px] font-black'>
                    Order Summary
                </h1>

                <OrderList orders={orders} />
            </div>

            <div className='mt-4'>
                <Separator />
                <OrderTotal />
            </div>
        </div>
    );
};

export default OrderSummary;
