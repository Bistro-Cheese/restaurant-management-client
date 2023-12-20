interface IProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

export default function Widget({ icon, title, value }: IProps) {
    return (
        <div className='flex w-full items-center rounded-3xl bg-white p-4'>
            {/* icon */}
            <div className='rounded-full bg-harvest-gold-100 p-3'>{icon}</div>

            {/* content */}
            <div className='ml-4'>
                {/* title */}
                <div className=''>
                    <span className='text-gray-400'>{title}</span>
                </div>

                {/* value */}
                <div className=''>
                    <span className='text-lg font-bold'>{value}</span>
                </div>
            </div>
        </div>
    );
}
