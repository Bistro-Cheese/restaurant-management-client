import { Modal } from '@/components/modal/modal';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BillModal({ isOpen, setIsOpen }: IProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title='Bill'
            description='Bill for the order'
        ></Modal>
    );
}
