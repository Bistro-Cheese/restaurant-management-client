'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import EmployeeList from './components/EmployeeList';
import { useGetUsersQuery } from '@/redux/services/user-api';

const Employees = () => {
    const {
        data: users,
        isLoading,
        isSuccess
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    console.log('USERDATA:::', users);

    if (isLoading) {
        return <div>Loading All Employees...</div>;
    }

    if (isSuccess) {
        const { entities } = users;
        console.log('entities:::', entities);
        return (
            <div className='max-h-full overflow-hidden px-6 py-4'>
                <div className='mb-4 flex justify-between'>
                    <Heading title='List of Employees' description='' />
                    <Link
                        href='/owner/employees/create'
                        className='hidden justify-end md:block'
                    >
                        <Button>ADD</Button>
                    </Link>
                </div>

                <EmployeeList employees={entities} />
            </div>
        );
    }
};

export default Employees;
