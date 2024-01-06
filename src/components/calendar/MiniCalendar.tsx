import '@/styles/calendar/MiniCalendar.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Card from '../common/Card';
import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MiniCalendar: React.FC = () => {
    const [value, onChange] = useState(new Date());

    console.log(value.toDateString());
    return (
        <Card className='flex h-full w-full flex-col px-3 py-3 text-tertiary'>
            <Calendar
                // @ts-expect-error
                onChange={onChange}
                value={value}
                prevLabel={<MdChevronLeft className='ml-1 h-6 w-6 ' />}
                nextLabel={<MdChevronRight className='ml-1 h-6 w-6 ' />}
                view={'month'}
            />
        </Card>
    );
};

export default MiniCalendar;
