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
        <div className='fixed right-0 float-right box-border flex h-[calc(100vh-80px)] w-[25%] flex-col bg-white px-3 py-6 drop-shadow-2xl'>
            <div>
                <h1 className='text-center font-primary text-[32px] font-semibold'>
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
