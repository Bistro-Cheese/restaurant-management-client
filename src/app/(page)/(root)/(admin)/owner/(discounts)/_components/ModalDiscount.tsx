'use client';

import Modal, { Styles } from 'react-modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { discountStatus } from '@/utils/fake-data';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { DiscountTypeEnum, DiscountTypeEnumValue } from '@/constants/enum';
import {
    selectDiscountById,
    useCreateNewDiscountMutation,
    useUpdateDiscountMutation
} from '@/redux/services/discount-api';
import {
    ModalContent,
    ModalFooter,
    ModalHeader
} from '@/components/common/custom-modal/CustomModal';
import {
    ModalDiscountType,
    initialModalDiscountState
} from '../discounts/page';
import { RootState } from '@/redux/store';
import { CustomToastOptions } from '@/constants/toast';
import Card from '@/components/common/Card';

const customModalStyles: Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 100
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px',
        padding: '0',
        border: 'none',
        outline: 'none',
        zIndex: 100,
        flexGrow: 1
    }
};

interface IProps {
    // isOpen: boolean;
    // setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    // children?: React.ReactNode;
    // discountId?: string;
    modalDiscountState: ModalDiscountType;
    setModalDiscountState: Dispatch<SetStateAction<ModalDiscountType>>;
}

const formSchema = z.object({
    name: z.string().min(1),
    discount_type: z.string().min(1),
    value: z.coerce.number().min(1),
    uses_max: z.coerce.number().min(1),
    start_date: z.string().min(1),
    end_date: z.string().min(1).min(1),
    is_active: z.string().min(1)
});

type DiscountFormType = {
    name: string;
    discount_type: string;
    value: number;
    uses_max: number;
    start_date: string;
    end_date: string;
    is_active: string;
};

export const intialFormValues: DiscountFormType = {
    name: '',
    discount_type: '',
    value: 0,
    uses_max: 0,
    start_date: '',
    end_date: '',
    is_active: ''
};

export type DiscountFormValues = z.infer<typeof formSchema>;

const ModalDiscount: React.FC<IProps> = (props) => {
    const { modalDiscountState, setModalDiscountState } = props;

    const discount = useSelector((state: RootState) =>
        selectDiscountById(state, modalDiscountState.discountId as EntityId)
    );

    const isCreate = modalDiscountState.discountId !== '';

    const title = isCreate ? 'Edit discount' : 'Create new discount';

    const defaultValues = isCreate
        ? {
              name: discount?.name,
              discount_type: discount?.type,
              value: discount?.value,
              uses_max: discount?.usesMax,
              start_date: discount?.startDate,
              end_date: discount?.endDate,
              is_active: discount?.isActive === true ? 'Active' : 'Inactive'
          }
        : {
              ...intialFormValues
          };

    const form = useForm<DiscountFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const [createNewDiscount] = useCreateNewDiscountMutation();

    const [updateDiscount] = useUpdateDiscountMutation();

    useEffect(() => {
        if (modalDiscountState.discountId !== '') {
            console.log('discount:::', discount);
            form.reset({
                name: discount?.name,
                discount_type: JSON.stringify(discount?.type),
                value: discount?.value,
                uses_max: discount?.usesMax,
                start_date: discount?.startDate,
                end_date: discount?.endDate,
                is_active: discount?.isActive === true ? '0' : '1'
            });
        }
    }, [modalDiscountState]);

    const handleSubmit = async (data: DiscountFormValues) => {
        if (data) {
            const discountData = {
                ...data,
                is_active: data.is_active === '0' ? true : false,
                discount_type: parseInt(data.discount_type, 10)
            };

            modalDiscountState.isUpdate === false
                ? await createNewDiscount({ ...discountData })
                      .unwrap()
                      .then(() => {
                          toast.success(
                              'Created discount successfully',
                              CustomToastOptions
                          );
                          setModalDiscountState(initialModalDiscountState);
                      })
                      .catch((err) => {
                          toast.error(
                              (err as any).data.message,
                              CustomToastOptions
                          );
                      })
                : await updateDiscount({
                      discount_id: discount?.id,
                      data: { ...discountData }
                  })
                      .unwrap()
                      .then(() => {
                          toast.success(
                              'Updated discount successfully',
                              CustomToastOptions
                          );
                          setModalDiscountState(initialModalDiscountState);
                      })
                      .catch((err) => {
                          toast.error(
                              (err as any).data.message,
                              CustomToastOptions
                          );
                      });
        } else {
            console.log('create user:::', data);
        }
    };

    const handleCloseModal = () => {
        setModalDiscountState(initialModalDiscountState);

        form.reset({
            ...intialFormValues
        });
    };

    return (
        <Modal
            isOpen={modalDiscountState.isOpen}
            onRequestClose={handleCloseModal}
            style={customModalStyles}
        >
            <Card className='flex max-h-[calc(100vh-100px)] min-w-[75vw] flex-col'>
                <ModalHeader
                    className=''
                    title={title}
                    onCloseModal={handleCloseModal}
                />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className='block w-full'
                    >
                        <ModalContent className='grid grid-cols-1 gap-4 px-4 md:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={false}
                                                placeholder='Enter name of discount'
                                                {...field}
                                                className=' bg-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='discount_type'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select
                                            disabled={false}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full bg-white'>
                                                    <SelectValue
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        placeholder='Select a type of discount'
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='z-[1000]'>
                                                <SelectGroup>
                                                    {Object.keys(
                                                        DiscountTypeEnum
                                                    ).map((type) => {
                                                        return (
                                                            <SelectItem
                                                                key={type}
                                                                value={DiscountTypeEnumValue[
                                                                    type as keyof typeof DiscountTypeEnum
                                                                ].toString()}
                                                            >
                                                                {
                                                                    DiscountTypeEnum[
                                                                        type as keyof typeof DiscountTypeEnum
                                                                    ]
                                                                }
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='value'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Value (VND)</FormLabel>
                                        <FormControl>
                                            <Input
                                                onChangeCapture={(e) => {
                                                    const value =
                                                        e.currentTarget.value;

                                                    if (value[0] === '0') {
                                                        e.currentTarget.value =
                                                            e.currentTarget.value.slice(
                                                                1
                                                            );
                                                    }
                                                }}
                                                inputMode='numeric'
                                                type='number'
                                                disabled={false}
                                                placeholder='Enter value of discount'
                                                {...field}
                                                className='bg-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='uses_max'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Times discount can be used
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                onChangeCapture={(e) => {
                                                    const value =
                                                        e.currentTarget.value;

                                                    if (value[0] === '0') {
                                                        e.currentTarget.value =
                                                            e.currentTarget.value.slice(
                                                                1
                                                            );
                                                    }
                                                }}
                                                inputMode='numeric'
                                                type='number'
                                                disabled={false}
                                                placeholder='Enter times discount can be used'
                                                {...field}
                                                className='bg-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='start_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date start</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={false}
                                                placeholder='dd/MM/yyyy hh:mm:ss'
                                                {...field}
                                                className='bg-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='end_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date end</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={false}
                                                placeholder='dd/MM/yyyy hh:mm:ss'
                                                {...field}
                                                className='bg-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='is_active'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            disabled={false}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full bg-white'>
                                                    <SelectValue
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        placeholder='Select a status of discount'
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='z-[1000]'>
                                                <SelectGroup>
                                                    {discountStatus.map(
                                                        (status) => (
                                                            <SelectItem
                                                                key={status.id}
                                                                value={
                                                                    status.id
                                                                }
                                                            >
                                                                {status.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </ModalContent>

                        <ModalFooter className=''>
                            <button
                                disabled={false}
                                className='rounded-md bg-gray-300 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-gray-400 active:bg-gray-500'
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>

                            <button
                                disabled={false}
                                className='rounded-md bg-primary px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-harvest-gold-600 active:bg-harvest-gold-700'
                                type='submit'
                            >
                                {modalDiscountState.isUpdate
                                    ? 'Update'
                                    : 'Create'}
                            </button>
                        </ModalFooter>
                    </form>
                </Form>
            </Card>
        </Modal>
    );
};

export default ModalDiscount;
