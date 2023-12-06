import { Header } from '@/components/header';
import { HeaderContent } from '@/components/header-content';
import { Heading } from '@/components/heading';
import { cn } from '@/lib/utils';
import OrderCard from './common/OrderCard';
import OrderList from './OrderList';
import OrderTotal from './OrderTotal';
import { Separator } from '@/components/ui/separator';

const OrderSummary = () => {
    return (
        <div className='fixed right-0 float-right box-border hidden h-[calc(100vh-80px)] bg-white px-3 py-6 drop-shadow-2xl xmdl:flex xmdl:w-2/6 xmdl:flex-col xl:w-1/4'>
            <div className='inline-flex items-center justify-center'>
                <span className='text-3xl font-black'>Order Summary</span>
            </div>

            <div className='mt-4'>
                <OrderList />
            </div>

            <div className='mt-4'>
                <Separator />
            </div>

            <div className='mt-4'>
                <OrderTotal />
            </div>
        </div>
    );
};

export default OrderSummary;
