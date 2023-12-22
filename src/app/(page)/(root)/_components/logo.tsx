import Image from 'next/image';

export const Logo = () => {
    return (
        <div className='flex'>
            <Image
                src='/cheese-logo.png'
                alt='cheese-logo'
                width={30}
                height={30}
            />
            <p className='ml-2 text-xl font-bold italic'>Cheese Bistro</p>
        </div>
    );
};
