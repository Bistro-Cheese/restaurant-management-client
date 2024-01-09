import Card from '../common/Card';

interface IProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    children?: React.ReactNode;
}

const Widget: React.FC<IProps> = ({ icon, title, value, children }) => {
    return (
        <Card className='flex flex-grow items-center bg-white p-4'>
            {/* icon */}
            <div className='inline-flex flex-shrink items-center justify-center rounded-md bg-harvest-gold-100 p-2'>
                <span className='text-harvest-gold-900'>{icon}</span>
            </div>

            {/* content */}
            <div className='ml-4 flex w-auto flex-col'>
                {/* title */}
                <div className=''>
                    <span className='text-sm text-tertiary-subtitle'>
                        {title}
                    </span>
                </div>

                {/* value */}
                <div className=''>
                    <span className='text-lg font-bold text-tertiary'>
                        {value}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default Widget;
