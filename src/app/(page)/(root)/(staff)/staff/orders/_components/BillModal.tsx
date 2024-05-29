import { ModalStyles } from '@/constants/modalStyle';
import { convertPriceToString } from '@/utils';
import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    bill: any;
}

export default function BillModal({ isOpen, setIsOpen, bill }: IProps) {
    if (!bill) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={ModalStyles}
        >
            <div className='h-[10px] overflow-y-scroll p-5'>
                <h1 className='text-center text-2xl font-bold'>Bill</h1>

                <div className='mt-4 flex justify-center gap-10'>
                    <div>
                        <div className=''>
                            <strong>Table: </strong>
                            <span>{bill?.tableNumber}</span>
                        </div>
                        <div className=''>
                            <strong>Check-in: </strong>
                            <span>{bill?.cusIn}</span>
                        </div>
                        <div className=''>
                            <strong>Check-out: </strong>
                            <span>{bill?.cusOut}</span>
                        </div>
                    </div>
                    <div>
                        <div className=''>
                            <strong>Number of Customers: </strong>
                            <span>{bill?.numberOfCustomer}</span>
                        </div>
                        <div className=''>
                            <strong>Customer&apos;s Name: </strong>
                            <span>{bill?.customerName}</span>
                        </div>
                    </div>
                </div>

                <table className='mt-4 w-full'>
                    <thead>
                        <tr className='outline outline-1 outline-black'>
                            <th scope='col' className='px-1'>
                                No.
                            </th>
                            <th scope='col' className='px-1'>
                                Name
                            </th>
                            <th scope='col' className='px-1'>
                                Quantity
                            </th>
                            <th scope='col' className='px-2'>
                                Price
                            </th>
                            <th scope='col' className='px-2 '>
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill?.orderLines.map((item: any, index: number) => (
                            <tr key={index} className='text-center'>
                                <th>{index + 1}</th>
                                <td className='w-40 text-left text-sm'>
                                    {item.name}
                                </td>
                                <td className='text-sm'>{item.quantity}</td>
                                <td className='text-sm'>
                                    {convertPriceToString(item.price)}
                                </td>
                                <td className='text-sm'>
                                    {convertPriceToString(
                                        item.quantity * item.price
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='my-4 w-full outline outline-1 outline-black' />

                <div className='mt-8'>
                    <div className='flex justify-between'>
                        <strong>Subtotal: </strong>
                        <span>
                            {convertPriceToString(bill?.subTotal || 0)} VND
                        </span>
                    </div>

                    <div className='flex justify-between'>
                        <strong>Discount: </strong>
                        <span>
                            {bill?.discountType === 0
                                ? bill?.discountValue
                                : convertPriceToString(
                                      bill?.discountValue || 0
                                  )}
                            {bill?.discountType === 0 ? '%' : ' VND'}
                        </span>
                    </div>

                    <div className='flex justify-between text-xl font-bold'>
                        <strong>Total: </strong>
                        <span>
                            {convertPriceToString(bill?.total || 0)} VND
                        </span>
                    </div>
                </div>

                <div className='my-4 w-full outline outline-1 outline-black' />

                <div className='mt-8'>
                    <div className='flex justify-between'>
                        <strong>Deposit: </strong>
                        <span>
                            {convertPriceToString(bill?.deposit || 0)} VND
                        </span>
                    </div>

                    <div className='flex justify-between'>
                        <strong>Paid: </strong>
                        <span>
                            {convertPriceToString(
                                bill?.paid - bill?.deposit || 0
                            )}{' '}
                            VND
                        </span>
                    </div>

                    <div className='flex justify-between'>
                        <strong>Change: </strong>
                        <span>
                            {convertPriceToString(bill?.changePaid || 0)} VND
                        </span>
                    </div>

                    <div className='flex justify-between'>
                        <strong>Payment Method: </strong>
                        <span>
                            {bill?.paymentType === 0 ? 'Cash' : 'Banking'}
                        </span>
                    </div>
                </div>

                <div className='my-4 w-full outline outline-1 outline-black' />

                <div className='mt-8 flex justify-center'>
                    <button
                        className='rounded bg-red-600 px-2 py-1 text-white'
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}
