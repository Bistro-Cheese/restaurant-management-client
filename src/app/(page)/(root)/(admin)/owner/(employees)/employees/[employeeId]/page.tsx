'use client';

import { UserForm } from '../../../_components/create-employee-form';

interface UserPageProps {
    params: {
        employeeId: string;
    };
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <UserForm userId={params.employeeId} />
            </div>
        </div>
    );
};

export default UserPage;
