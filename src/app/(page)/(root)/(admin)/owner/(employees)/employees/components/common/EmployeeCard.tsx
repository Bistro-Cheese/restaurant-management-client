import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
    index: number;
};

const EmployeeCard: FC<EmployeeCardProps> = ({
    id,
    lastName,
    firstName,
    phoneNumber,
    role,
    status,
    email,
    index
}): JSX.Element => {
    const router = useRouter();

    const handleClickEdit = (id: EntityId) => {
        router.push(`/owner/employees/${id}`);
    };

    return (
        <motion.tr
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.35,
                delay: 0.1 + Number(index) * 0.075,
                ease: 'easeInOut'
            }}
            className='group w-full hover:bg-gray-50'
            key={id}
        >
            <th className='flex items-center gap-3 px-6 py-4 font-normal text-gray-900'>
                <div className='relative h-10 w-10'>
                    <Image
                        fill
                        className='h-full w-full rounded-full object-cover object-center'
                        src='https://files.cults3d.com/uploaders/23851302/illustration-file/dfdaaa0a-e194-4dad-955e-6877ee68ceca/%D0%A7%D0%B8%D0%B1%D0%B8-%D0%91%D0%B5%D1%82%D0%BC%D0%B5%D0%BD.jpg'
                        alt=''
                        sizes='(max-width: 640px) 640px'
                    />
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
                        x-data="{ tooltip: 'Edite' }"
                        href='#'
                        className=' flex h-12 w-12 rounded-full transition duration-150 ease-linear hover:bg-gray-200'
                        onClick={() => handleClickEdit(id)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            className='m-auto h-6 w-6'
                            x-tooltip='tooltip'
                        >
                            <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'></path>
                            <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'></polygon>
                        </svg>
                    </a>
                </div>
            </td>
        </motion.tr>
    );
};

export default EmployeeCard;
