'use client';

import EmployeeCard from './common/EmployeeCard';

interface EmployeeListProps {
    employees: any;
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
    return (
        <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md'>
            <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
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
                                key={employees[item].id}
                                role={employees[item].role}
                                id={employees[item].id}
                                last_name={employees[item].last_name}
                                first_name={employees[item].first_name}
                                phone_number={employees[item].phone_number}
                                status={employees[item].status}
                                email={employees[item].email}
                            />
                        );
                    })}

                    {/* Card cứng để xem đa dạng các status và trạng thái hoạt động */}
                    <tr className='hover:bg-gray-50'>
                        <th className='flex items-center gap-3 px-6 py-4 font-normal text-gray-900'>
                            <div className='relative h-10 w-10'>
                                <img
                                    className='h-full w-full rounded-full object-cover object-center'
                                    src='https://files.cults3d.com/uploaders/23851302/illustration-file/dfdaaa0a-e194-4dad-955e-6877ee68ceca/%D0%A7%D0%B8%D0%B1%D0%B8-%D0%91%D0%B5%D1%82%D0%BC%D0%B5%D0%BD.jpg'
                                    alt=''
                                />
                                <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
                            </div>
                            <div className='text-sm'>
                                <div className='font-medium text-gray-700'>
                                    Minh Nhat
                                </div>
                                <div className='text-gray-400'>
                                    21522419@gm.uit.edu.vn
                                </div>
                            </div>
                        </th>
                        <td className='px-6 py-4'>0123456789</td>
                        <td className='px-6 py-4'>Owner</td>
                        <td className='px-6 py-4'>
                            <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
                                <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
                                Active
                            </span>
                        </td>
                        <td className='px-6 py-4'>
                            <div className='flex justify-end gap-4'>
                                <a x-data="{ tooltip: 'View' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                                        <circle cx='12' cy='12' r='3'></circle>
                                    </svg>
                                </a>
                                <a x-data="{ tooltip: 'Edite' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'></path>
                                        <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'></polygon>
                                    </svg>
                                </a>
                                <a x-data="{ tooltip: 'Delete' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <polyline points='3 6 5 6 21 6'></polyline>
                                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                        <line
                                            x1='10'
                                            y1='11'
                                            x2='10'
                                            y2='17'
                                        ></line>
                                        <line
                                            x1='14'
                                            y1='11'
                                            x2='14'
                                            y2='17'
                                        ></line>
                                    </svg>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-gray-50'>
                        <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
                            <div className='relative h-10 w-10'>
                                <img
                                    className='h-full w-full rounded-full object-cover object-center'
                                    src='https://files.cults3d.com/uploaders/23851302/illustration-file/dfdaaa0a-e194-4dad-955e-6877ee68ceca/%D0%A7%D0%B8%D0%B1%D0%B8-%D0%91%D0%B5%D1%82%D0%BC%D0%B5%D0%BD.jpg'
                                    alt=''
                                />
                                <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full bg-red-400 ring ring-white'></span>
                            </div>
                            <div className='text-sm'>
                                <div className='font-medium text-gray-700'>
                                    Minh Nhat
                                </div>
                                <div className='text-gray-400'>
                                    21522419@gm.uit.edu.vn
                                </div>
                            </div>
                        </th>
                        <td className='px-6 py-4'>0123456789</td>
                        <td className='px-6 py-4'>Manager</td>
                        <td className='px-6 py-4'>
                            <span className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600'>
                                <span className='h-1.5 w-1.5 rounded-full bg-amber-600'></span>
                                Pending
                            </span>
                        </td>
                        <td className='px-6 py-4'>
                            <div className='flex justify-end gap-4'>
                                <a x-data="{ tooltip: 'View' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                                        <circle cx='12' cy='12' r='3'></circle>
                                    </svg>
                                </a>
                                <a x-data="{ tooltip: 'Edite' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'></path>
                                        <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'></polygon>
                                    </svg>
                                </a>
                                <a x-data="{ tooltip: 'Delete' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <polyline points='3 6 5 6 21 6'></polyline>
                                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                        <line
                                            x1='10'
                                            y1='11'
                                            x2='10'
                                            y2='17'
                                        ></line>
                                        <line
                                            x1='14'
                                            y1='11'
                                            x2='14'
                                            y2='17'
                                        ></line>
                                    </svg>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr className='hover:bg-gray-50'>
                        <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
                            <div className='relative h-10 w-10'>
                                <img
                                    className='h-full w-full rounded-full object-cover object-center'
                                    src='https://files.cults3d.com/uploaders/23851302/illustration-file/dfdaaa0a-e194-4dad-955e-6877ee68ceca/%D0%A7%D0%B8%D0%B1%D0%B8-%D0%91%D0%B5%D1%82%D0%BC%D0%B5%D0%BD.jpg'
                                    alt=''
                                />
                                <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full bg-neutral-400 ring ring-white'></span>
                            </div>
                            <div className='text-sm'>
                                <div className='font-medium text-gray-700'>
                                    Minh Nhat
                                </div>
                                <div className='text-gray-400'>
                                    21522419@gm.uit.edu.vn
                                </div>
                            </div>
                        </th>
                        <td className='px-6 py-4'>0123456789</td>
                        <td className='px-6 py-4'>Staff</td>
                        <td className='px-6 py-4'>
                            <span className='inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600'>
                                <span className='h-1.5 w-1.5 rounded-full bg-red-600'></span>
                                Disabled
                            </span>
                        </td>
                        <td className='px-6 py-4'>
                            <div className='flex justify-end gap-4'>
                                <a x-data="{ tooltip: 'View' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                                        <circle cx='12' cy='12' r='3'></circle>
                                    </svg>
                                </a>
                                <a x-data="{ tooltip: 'Edite' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'></path>
                                        <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'></polygon>
                                    </svg>
                                </a>
                                <a x-data="{ tooltip: 'Delete' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <polyline points='3 6 5 6 21 6'></polyline>
                                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                        <line
                                            x1='10'
                                            y1='11'
                                            x2='10'
                                            y2='17'
                                        ></line>
                                        <line
                                            x1='14'
                                            y1='11'
                                            x2='14'
                                            y2='17'
                                        ></line>
                                    </svg>
                                </a>
                            </div>
                        </td>
                    </tr>

                    {/* Original Card (do not delete)*/}
                    {/* <tr className='hover:bg-gray-50'>
                        <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
                            <div className='relative h-10 w-10'>
                                <img
                                    className='h-full w-full rounded-full object-cover object-center'
                                    src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                    alt=''
                                />
                                <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
                            </div>
                            <div className='text-sm'>
                                <div className='font-medium text-gray-700'>
                                    Steven Jobs
                                </div>
                                <div className='text-gray-400'>
                                    jobs@sailboatui.com
                                </div>
                            </div>
                        </th>
                        <td className='px-6 py-4'>
                            <span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
                                <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
                                Active
                            </span>
                        </td>
                        <td className='px-6 py-4'>Product Designer</td>
                        <td className='px-6 py-4'>
                            <div className='flex gap-2'>
                                <span className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600'>
                                    Design
                                </span>
                                <span className='inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600'>
                                    Product
                                </span>
                                <span className='inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600'>
                                    Develop
                                </span>
                            </div>
                        </td>
                        <td className='px-6 py-4'>
                            <div className='flex justify-end gap-4'>
                                <a x-data="{ tooltip: 'Delete' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                        />
                                    </svg>
                                </a>
                                <a x-data="{ tooltip: 'Edite' }" href='#'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                        x-tooltip='tooltip'
                                    >
                                        <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                                        />
                                    </svg>
                                </a>
                            </div>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
