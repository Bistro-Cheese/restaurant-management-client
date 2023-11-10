import { Button } from '@/components/ui/button';
import EmployeeList from './components/EmployeeList';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const ListUsers = [
    {
        id: '1',
        first_name: 'Minh Nhat',
        last_name: 'Nguyen',
        email: '21522419@gm.uit.edu.vn',
        phone_number: '0123456789',
        role: 'Manager',
        status: 'Active'
    },
    {
        id: '2',
        first_name: 'Minh Nhat',
        last_name: 'Nguyen',
        email: '21522419@gm.uit.edu.vn',
        phone_number: '0123456789',
        role: 'Manager',
        status: 'Inactive'
    },
    {
        id: '3',
        first_name: 'Minh Nhat',
        last_name: 'Nguyen',
        email: '21522419@gm.uit.edu.vn',
        phone_number: '0123456789',
        role: 'Staff',
        status: 'Active'
    }
];

const Employees = () => {
    return (
        <div className='px-6 py-4'>
            <div className='mb-4 flex justify-between'>
                <Heading title='List of Employees' description='' />
                <Link
                    href='/owner/create-employee'
                    className='hidden justify-end md:block'
                >
                    <Button>ADD</Button>
                </Link>
            </div>

            <EmployeeList employees={ListUsers} />
        </div>
    );
};

export default Employees;
