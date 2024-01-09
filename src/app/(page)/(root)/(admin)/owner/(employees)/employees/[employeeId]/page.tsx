'use client';

import { UserForm } from '../../../_components/create-employee-form';

interface UserPageProps {
    params: {
        employeeId: string;
    };
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
    return <UserForm userId={params.employeeId} />;
};

export default UserPage;
