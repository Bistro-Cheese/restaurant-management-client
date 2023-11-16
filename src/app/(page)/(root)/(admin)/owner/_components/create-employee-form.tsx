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
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/heading';
import { AlertModal } from '@/components/modal/alert-modal';
import ImageUpload from '@/components/image-upload';
import {
    categories,
    foodStatus,
    userRoles,
    userStatus
} from '@/utils/fake-data';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import {
    selectUserById,
    useAddNewUserMutation,
    useDeleteUserMutation
} from '@/redux/services/user-api';
import { useUpdateFoodMutation } from '@/redux/services/food-api';
import { useRemoveUnwantedKeys } from '@/hooks/use-user';

const formSchema = z.object({
    username: z.string().min(1),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    date_of_birth: z.string().min(1),
    password: z.string().min(1),
    phone_number: z.string().min(1).max(11),
    role: z.string().min(1),
    status: z.string().min(0),
    address_line: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    email: z.string().min(1).email(),
    experienced_year: z.string().min(0),
    certification_management: z.string().min(0),
    foreign_language: z.string().min(0),
    academic_level: z.string().min(0)
});

export type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
    userId: string | null;
}

export const UserForm: React.FC<UserFormProps> = ({ userId }) => {
    console.log('ID USER FORM EDIT:::', userId);

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<string | undefined>('');
    const [unwantedKeys, setUnwantedKeys] = useState<string[]>([]);

    const user = useSelector((state) =>
        selectUserById(state, userId as EntityId)
    );

    console.log('USER FORM EDIT:::', user);

    const [
        addUserFood,
        {
            isLoading: isCreatingLoading,
            isSuccess: isCreatedSuccess,
            isError: isCreatingError,
            error: creatingError
        }
    ] = useAddNewUserMutation();

    const [
        updateUser,
        {
            isLoading: isUpdatingLoading,
            isSuccess: isUpdatedSuccess,
            isError: isUpdatedError,
            error: updatedError
        }
    ] = useUpdateFoodMutation();

    const [
        deleteUser,
        {
            isLoading: isDeletingLoading,
            isSuccess: isDeletedSuccess,
            isError: isDeletedError,
            error: deletedError
        }
    ] = useDeleteUserMutation();

    const isCreate = userId !== 'create';

    const title = isCreate ? 'Edit User' : 'Create User';
    const description = isCreate ? 'Edit an User.' : 'Add a new User';
    const toastMessage = isCreate ? 'User updated.' : 'User created.';
    const action = isCreate ? 'Save changes' : 'Create';

    const defaultValues = isCreate
        ? {
              username: user?.username,
              first_name: user?.firstName,
              last_name: user?.lastName,
              date_of_birth: user?.dateOfBirth,
              password: user?.password,
              phone_number: user?.phoneNumber,
              role: JSON.stringify(user?.role),
              status: JSON.stringify(user?.status),
              address_line: user?.address?.addressLine,
              city: user?.address?.city,
              region: user?.address?.region,
              email: user?.email,
              experienced_year: user?.experiencedYear,
              certification_management: user?.certificationManagement,
              foreign_language: user?.foreignLanguage,
              academic_level: user?.academicLevel
          }
        : {
              username: '',
              firstName: '',
              lastName: '',
              dateOfBirth: '',
              password: '',
              phoneNumber: '',
              role: '',
              status: '',
              addressLine: '',
              city: '',
              region: '',
              email: '',
              experienced_year: '',
              certification_management: '',
              foreign_language: '',
              academic_level: ''
          };

    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    useEffect(() => {
        if (isCreatingLoading || isUpdatingLoading || isDeletingLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isCreatingLoading, isUpdatingLoading, isDeletingLoading]);

    useEffect(() => {
        if (isCreatedSuccess || isUpdatedSuccess || isDeletedSuccess) {
            console.log('isDeletedSuccess:::', isDeletedSuccess);
            router.refresh();
            router.push('/owner/employees');
            toast.success(toastMessage);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCreatedSuccess, isUpdatedSuccess, isDeletedSuccess]);

    const onSubmit = async (data: UserFormValues) => {
        if (data) {
            let removedKeysData = useRemoveUnwantedKeys(data, unwantedKeys);

            isCreate
                ? await updateUser({
                      user_id: userId,
                      data: { ...removedKeysData }
                  })
                : await addUserFood({ ...removedKeysData });
        } else {
            console.log('create user:::', data);
        }
        console.log('data user submitted:::', data);
    };

    const onDelete = async () => {
        console.log('userId:::', userId);
        try {
            await deleteUser({ user_id: userId });
        } catch (err) {
            console.log('err:::', err);
        }
        setLoading(false);
        setOpen(false);
    };

    const handleChangeRole = (value: string) => {
        setRole(value);

        switch (role) {
            case '1':
                setUnwantedKeys(['foreign_language', 'academic_level']);
                break;
            case '2':
                setUnwantedKeys([
                    'experienced_year',
                    'certification_management'
                ]);
                break;
            default:
        }

        console.log('Role:::', role);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading title={title} description={description} />
                {user && (
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
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full space-y-8'
                >
                    <div className='grid-cols-1 gap-8 md:grid md:grid-cols-1'>
                        <FormField
                            control={form.control}
                            name='first_name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='First name'
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Last name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='example@gmail.com'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Username'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone_number'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Phone number'
                                            {...field}
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
                                            placeholder='Birthday'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='role'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            handleChangeRole(value);
                                        }}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select a role'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {userRoles.map((role) => (
                                                    <SelectItem
                                                        key={role.id}
                                                        value={role.id}
                                                    >
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {role === '2' && (
                            <div className='grid-cols-1 gap-8 md:grid md:grid-cols-1'>
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
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {role === '1' && (
                            <div className='grid-cols-1 gap-8 md:grid md:grid-cols-1'>
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
                                                    disabled={loading}
                                                    placeholder='Experienced year'
                                                    {...field}
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address line</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Address line'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='city'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='City'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='region'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Region</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Region'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select a status'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {userStatus.map((status) => (
                                                    <SelectItem
                                                        key={status.id}
                                                        value={status.id}
                                                    >
                                                        {status.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className='ml-auto'
                        type='submit'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
