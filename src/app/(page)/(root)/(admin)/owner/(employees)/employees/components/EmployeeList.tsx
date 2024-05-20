'use client';

import EmployeeCard from './common/EmployeeCard';

interface EmployeeListProps {
    employees: any;
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
    return (
        <div className='flex items-center justify-center'>
            <div className='min-w-full'>
                <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-md'>
                    <table className='min-w-full bg-white text-left text-sm text-gray-500'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-medium text-gray-900'
                                >
                                    Name
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-medium text-gray-900'
                                >
                                    Phone number
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-medium text-gray-900'
                                >
                                    Role
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-medium text-gray-900'
                                >
                                    Status
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 font-medium text-gray-900'
                                ></th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                            {Object.keys(employees).map((item, id) => {
                                return (
                                    <EmployeeCard
                                        key={id}
                                        index={id}
                                        role={employees[item].role}
                                        id={employees[item].id}
                                        lastName={employees[item].lastName}
                                        firstName={employees[item].firstName}
                                        phoneNumber={
                                            employees[item].phoneNumber
                                        }
                                        status={employees[item].status}
                                        email={employees[item].email}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
