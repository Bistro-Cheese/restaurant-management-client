import Image from 'next/image';

export const Logo = () => {
    return (
        <div className='flex items-center'>
            <div className='relative h-11 w-11 sml:h-10 sml:w-10'>
                <Image
                    src='/cheese-logo.png'
                    alt='cheese-logo'
                    fill
                    className=' object-cover object-center'
                />
            </div>
            <span className='font-bol ml-2 line-clamp-1 hidden truncate font-primary text-xl font-bold text-tertiary sml:inline-block'>
                Cheese Bistro
            </span>
        </div>
    );
};
