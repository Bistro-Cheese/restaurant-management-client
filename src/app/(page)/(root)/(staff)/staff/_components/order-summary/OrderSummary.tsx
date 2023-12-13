import { Header } from '@/components/header';
import { HeaderContent } from '@/components/header-content';
import { Heading } from '@/components/heading';
import { cn } from '@/lib/utils';
import OrderCard from './common/OrderLineCard';
import OrderList from './common/OrderList';
import OrderTotal from './common/OrderTotal';
import { Separator } from '@/components/ui/separator';
import OrderHeader from './common/OrderHeader';

const OrderSummary = () => {
    return (
        <div className='fixed right-0 float-right hidden max-h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] grow bg-white drop-shadow-2xl xmdl:flex xmdl:w-2/6 xmdl:flex-col xl:w-1/4'>
            {/* Header */}
            <OrderHeader />

            {/* Order list */}
            <OrderList />

            {/* Footer */}
            <OrderTotal />
        </div>
    );
};

export default OrderSummary;
