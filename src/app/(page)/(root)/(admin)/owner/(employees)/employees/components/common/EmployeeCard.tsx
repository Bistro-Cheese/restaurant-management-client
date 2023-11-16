import { EntityId } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type EmployeeCardProps = {
    id: EntityId;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    role: string;
    email: string;
    status: number;
};

const EmployeeCard = ({
    id,
    lastName,
    firstName,
    phoneNumber,
    role,
    status,
    email
}: EmployeeCardProps) => {
    const router = useRouter();

    const handleClickEdit = (id: EntityId) => {
        console.log('EmployeeId:::', id);
        router.push(`/owner/employees/${id}`);
    };

    return (
        <tr className='group hover:bg-gray-50' key={id}>
            <th className='flex items-center gap-3 px-6 py-4 font-normal text-gray-900'>
                <div className='relative h-10 w-10'>
                    <img
                        className='h-full w-full rounded-full object-cover object-center'
                        src='https://files.cults3d.com/uploaders/23851302/illustration-file/dfdaaa0a-e194-4dad-955e-6877ee68ceca/%D0%A7%D0%B8%D0%B1%D0%B8-%D0%91%D0%B5%D1%82%D0%BC%D0%B5%D0%BD.jpg'
                        alt=''
                    />
                    {/* <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span> */}
                </div>
                <div className='text-sm'>
                    <div className='font-medium text-gray-700'>
                        {firstName} {lastName}
                    </div>
                    <div className='text-gray-400'>{email}</div>
                </div>
            </th>
            <td className='px-6 py-4'>{phoneNumber}</td>
            <td className='px-6 py-4'>{role}</td>
            <td className='px-6 py-4'>
                <span
                    className={cn(
                        'inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold',
                        status === 0
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                    )}
                >
                    <span
                        className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            status === 0 ? 'bg-green-600' : 'bg-red-600'
                        )}
                    ></span>
                    {status === 0 ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className='px-6 py-4'>
                <div className='flex justify-end'>
                    <a
                        x-data="{ tooltip: 'View' }"
                        href='#'
                        className=' flex h-12 w-12 rounded-full transition duration-150 ease-linear hover:bg-gray-200'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            className='m-auto h-6 w-6'
                            x-tooltip='tooltip'
                        >
                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                            <circle cx='12' cy='12' r='3'></circle>
                        </svg>
                    </a>
                    <a
                        x-data="{ tooltip: 'Edite' }"
                        href='#'
                        className=' flex h-12 w-12 rounded-full transition duration-150 ease-linear hover:bg-gray-200'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            className='m-auto h-6 w-6'
                            x-tooltip='tooltip'
                        >
                            <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'></path>
                            <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'></polygon>
                        </svg>
                    </a>
                    <a
                        x-data="{ tooltip: 'Delete' }"
                        href='#'
                        className=' flex h-12 w-12 rounded-full transition duration-150 ease-linear hover:bg-gray-200'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            className='m-auto h-6 w-6'
                            x-tooltip='tooltip'
                        >
                            <polyline points='3 6 5 6 21 6'></polyline>
                            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                            <line x1='10' y1='11' x2='10' y2='17'></line>
                            <line x1='14' y1='11' x2='14' y2='17'></line>
                        </svg>
                    </a>
                </div>
            </td>
        </tr>
    );
};

export default EmployeeCard;
