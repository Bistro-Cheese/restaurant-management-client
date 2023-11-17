import { Heading } from '@/components/heading';
import { CalendarDays, ChevronDown, Filter, Tag } from 'lucide-react';
import OrderList from './components/OrderList';

const OrderData = [
    {
        id: '#1',
        staffOrder: {
            id: '#1',
            name: 'Tung'
        },
        tableId: '#1',
        orderDate: {
            date: 'Nov 10 2023',
            time: '14:11'
        },
        amount: '730.000 VND',
        status: 0
    },
    {
        id: '#2',
        staffOrder: {
            id: '#2',
            name: 'Son'
        },
        tableId: '#2',
        orderDate: {
            date: 'Nov 10 2023',
            time: '16:20'
        },
        amount: '120.000 VND',
        status: 1
    },
    {
        id: '#3',
        staffOrder: {
            id: '#3',
            name: 'Thanh'
        },
        tableId: '#3',
        orderDate: {
            date: 'Nov 10 2023',
            time: '9:46'
        },
        amount: '420.000 VND',
        status: 2
    },
    {
        id: '#4',
        staffOrder: {
            id: '#4',
            name: 'Thanh'
        },
        tableId: '#4',
        orderDate: {
            date: 'Nov 10 2023',
            time: '9:46'
        },
        amount: '390.000 VND',
        status: 3
    }
];

const Orders = () => {
    return (
        <div className='max-h-full overflow-hidden px-6 py-4'>
            <div className='mb-4 flex justify-between'>
                <Heading title='Orders' description='' />
                <div className='flex flex-row gap-7'>
                    <button className='group flex cursor-pointer items-center overflow-hidden rounded-md border border-input px-4 ring-offset-background hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                        <CalendarDays className='h-5 w-5 text-foreground' />
                        <span className='ml-2 mr-6'>Date range</span>

                        <ChevronDown className='h-5 w-5 text-foreground transition duration-100 group-focus:rotate-180' />
                    </button>

                    <button className=' group flex cursor-pointer items-center overflow-hidden rounded-md border border-input px-4 ring-offset-background hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                        <Tag className='h-5 w-5 text-foreground' />
                        <span className='ml-2 mr-6'>Status</span>

                        <ChevronDown className='h-5 w-5 text-foreground transition duration-100 group-focus:rotate-180' />
                    </button>

                    <button className='group flex cursor-pointer items-center overflow-hidden rounded-md border border-input px-4 ring-offset-background hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                        <Filter className='h-5 w-5 text-foreground' />
                        <span className='ml-2 mr-6'>More filters</span>

                        <ChevronDown className='h-5 w-5 text-foreground transition duration-100 group-focus:rotate-180' />
                    </button>
                </div>
            </div>

            <OrderList orders={OrderData} />
        </div>
    );
};

export default Orders;
