'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import Card from '@/components/common/Card';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { AlertModal } from '@/components/modal/alert-modal';

import { userRoles, userStatus } from '@/utils/fake-data';
import {
    useAddNewUserMutation,
    useDeleteUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation
} from '@/redux/services/user-api';
import { removeUnwantedKeys } from '@/utils';
import { CustomToastOptions } from '@/constants/toast';

const formSchema = z.object({
    username: z.string().min(1),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    date_of_birth: z.string(),
    phone_number: z.string().min(1).max(11),
    password: z.string().min(8),
    role: z.string().min(1),
    status: z.string().min(0),
    address_line: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    email: z.string().min(1).email(),
    experienced_year: z.string().min(0).optional(),
    certification_management: z.string().min(0).optional(),
    foreign_language: z.string().min(0).optional(),
    academic_level: z.string().min(0).optional()
});

export type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
    userId: string;
}

export const UserForm: React.FC<UserFormProps> = ({ userId }) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<string>('manager');
    const [date, setDate] = useState<string>('');
    const [unwantedKeys, setUnwantedKeys] = useState<string[]>([]);

    const {
        data,
        isSuccess: isGetUserByIdSuccess,
        isLoading: isGetUserByIdLoading
    } = useGetUserByIdQuery(userId, {
        pollingInterval: 120000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const [addNewUser, { isLoading: isCreatingLoading }] =
        useAddNewUserMutation();

    const [updateUser, { isLoading: isUpdatingLoading }] =
        useUpdateUserMutation();

    const [deleteUser, { isLoading: isDeletingLoading }] =
        useDeleteUserMutation();

    const isCreate = userId === 'create';

    const title = !isCreate ? 'Edit User' : 'Create User';
    const description = !isCreate ? 'Edit an User.' : 'Add a new User';
    const action = !isCreate ? 'Save changes' : 'Create';

    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        if (isGetUserByIdSuccess) {
            const user = data?.data;

            setRole(user?.role.toLowerCase());
            setDate(user?.dateOfBirth.split('-').reverse().join('-'));

            form.setValue('username', user?.username);
            form.setValue('first_name', user?.firstName);
            form.setValue('last_name', user?.lastName);
            form.setValue('email', user?.email);
            form.setValue('date_of_birth', date);
            form.setValue('phone_number', user?.phoneNumber);
            form.setValue('password', user?.password);
            form.setValue('role', user?.role.toLowerCase());
            form.setValue('status', user?.status.toString());
            form.setValue('address_line', user?.address.addressLine);
            form.setValue('city', user?.address.city);
            form.setValue('region', user?.address.region);
            form.setValue('experienced_year', user?.experiencedYear);
            form.setValue(
                'certification_management',
                user?.certificationManagement
            );
            form.setValue('foreign_language', user?.foreignLanguage);
            form.setValue('academic_level', user?.academicLevel);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetUserByIdSuccess, form]);

    useEffect(() => {
        if (isCreatingLoading || isUpdatingLoading || isDeletingLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isCreatingLoading, isUpdatingLoading, isDeletingLoading]);

    const onSubmit = async (data: UserFormValues) => {
        if (data) {
            let removedKeysData = removeUnwantedKeys(data, unwantedKeys);

            const formattedDate = date.split('-').reverse().join('-');

            !isCreate
                ? await updateUser({
                      user_id: userId,
                      data: {
                          ...removedKeysData,
                          role: removedKeysData.role === 'manager' ? 1 : 2,
                          status: parseInt(removedKeysData.status),
                          date_of_birth: formattedDate
                      }
                  })
                      .unwrap()
                      .then(() => {
                          toast.success(
                              'Update user successfully',
                              CustomToastOptions
                          );
                          setLoading(true);
                          router.push('/owner/employees');
                      })
                      .catch((err) => {
                          console.log('err:::', err);
                      })
                      .finally(() => setLoading(false))
                : await addNewUser({
                      ...removedKeysData,
                      role: removedKeysData.role === 'manager' ? 1 : 2,
                      status: parseInt(removedKeysData.status),
                      date_of_birth: formattedDate
                  })
                      .unwrap()
                      .then(() => {
                          toast.success(
                              'Add user successfully',
                              CustomToastOptions
                          );
                          router.push('/owner/employees');
                      })
                      .catch((err) => {
                          toast.error(
                              (err as any).data.message,
                              CustomToastOptions
                          );
                      })
                      .finally(() => setLoading(false));
        } else {
            console.log('create user:::', data);
        }
    };

    const onDelete = async () => {
        await deleteUser({ user_id: userId })
            .unwrap()
            .then(() => {
                toast.success('Delete user successfully', CustomToastOptions);
                setLoading(true);
                router.push('/owner/employees');
            })
            .catch((err) => {
                console.log('err:::', err);
                if ((err as any).data.title === 'Forbidden') {
                    toast.error(
                        `${(err as any).data.title}`,
                        CustomToastOptions
                    );
                } else {
                    toast.error(
                        `${(err as any).data.message}`,
                        CustomToastOptions
                    );
                }
            })
            .finally(() => setLoading(false));
    };

    const handleChangeRole = (role: string) => {
        setRole(role);
        setUnwantedKeys(getUnwantedKeys(role));
    };

    const getUnwantedKeys = (role: string) => {
        switch (role) {
            case 'staff':
                return ['experienced_year', 'certification_management'];
            case 'manager':
                return ['academic_level'];
            default:
                return [];
        }
    };

    if (isGetUserByIdLoading) return <div>Loading...</div>;

    return (
        <div className='pb-4'>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            <Card className='flex-col bg-transparent px-4'>
                <div className='flex items-center justify-between'>
                    <Heading
                        classNameDescription='mt-4'
                        title={title}
                        description={description}
                    />
                    {data && (
                        <Button
                            disabled={loading}
                            variant='destructive'
                            size='sm'
                            onClick={() => setOpen(true)}
                        >
                            <Trash className='h-4 w-4' />
                        </Button>
                    )}
                </div>

                <Separator className='mb-3 mt-3' />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full space-y-8'
                    >
                        <div className='grid-cols-1 gap-8 md:grid md:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='first_name'
                                defaultValue={data?.data?.firstName}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='First name'
                                                className='bg-white'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='last_name'
                                defaultValue={data?.data?.lastName}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='Last name'
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
                                name='email'
                                defaultValue={data?.data?.email}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='example@gmail.com'
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
                                name='username'
                                defaultValue={data?.data?.username}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='Username'
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
                                name='phone_number'
                                defaultValue={data?.data?.phoneNumber}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='Phone number'
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
                                name='date_of_birth'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of birth</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                type='date'
                                                {...field}
                                                className='bg-white'
                                                value={date}
                                                onChange={(e) => {
                                                    setDate(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                defaultValue={data?.data?.password}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                disabled={loading}
                                                placeholder='Password'
                                                {...field}
                                                className='bg-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='grid-cols-2 gap-8 md:grid md:grid-cols-2'>
                                <FormField
                                    control={form.control}
                                    name='role'
                                    defaultValue={data?.data?.role}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select
                                                disabled={loading}
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    handleChangeRole(value);
                                                }}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className='bg-white'>
                                                        <SelectValue placeholder='Select a role' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {userRoles.map(
                                                            (role) => (
                                                                <SelectItem
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    value={
                                                                        role.name
                                                                    }
                                                                >
                                                                    {role.name}
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

                                <FormField
                                    control={form.control}
                                    name='status'
                                    defaultValue={data?.data?.status}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className='bg-white'>
                                                        <SelectValue
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            placeholder='Select a status'
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {userStatus.map(
                                                            (status) => (
                                                                <SelectItem
                                                                    key={
                                                                        status.id
                                                                    }
                                                                    value={
                                                                        status.id
                                                                    }
                                                                >
                                                                    {
                                                                        status.name
                                                                    }
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
                            </div>

                            {role === 'staff' && (
                                <div className='grid-cols-2 gap-8 md:grid md:grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='foreign_language'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Foreign language
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}
                                                        placeholder='Foreign language'
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
                                        name='academic_level'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Academic level
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}
                                                        placeholder='Academic level'
                                                        {...field}
                                                        className='bg-white'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {role === 'manager' && (
                                <div className='grid-cols-3 gap-8 md:grid md:grid-cols-3'>
                                    <FormField
                                        control={form.control}
                                        name='experienced_year'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Experienced year
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='number'
                                                        disabled={loading}
                                                        placeholder='Experienced year'
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
                                        name='certification_management'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Certification management
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}
                                                        placeholder='Certification management'
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
                                        name='foreign_language'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Foreign language
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}
                                                        placeholder='Foreign language'
                                                        {...field}
                                                        className='bg-white'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name='address_line'
                                defaultValue={data?.data?.address.addressLine}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address line</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='Address line'
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
                                name='city'
                                defaultValue={data?.data?.address.city}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='City'
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
                                name='region'
                                defaultValue={data?.data?.address.region}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Region</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='Region'
                                                {...field}
                                                className='bg-white'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={loading}
                            className='ml-auto bg-primary transition-all duration-200 ease-in-out hover:bg-harvest-gold-600 active:bg-harvest-gold-700'
                            type='submit'
                        >
                            {loading ? 'Loading...' : action}
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
};
