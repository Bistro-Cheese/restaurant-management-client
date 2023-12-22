'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDispatchLogin } from '@/hooks/use-dispatch-auth';
import { RiLockPasswordLine, RiUser3Line } from 'react-icons/ri';
import { PiEye, PiEyeClosed } from 'react-icons/pi';

const formSchema = z.object({
    username: z.string().min(1, 'Username is require'),
    password: z
        .string()
        .min(1, 'Password is require')
        .min(8, 'Password must have than 8 characters')
});

const SignInForm = (): JSX.Element => {

    const { isLoginLoading, dispatchLogin, loginError } = useDispatchLogin();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (
        values: z.infer<typeof formSchema>
    ): Promise<void> => {
        dispatchLogin(values.username, values.password);
    };

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        {/* Username */}
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center'>
                                        <RiUser3Line size={20} />
                                        <p className='ml-2'>Username</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoginLoading}
                                            placeholder='example@gmail.com'
                                            {...field}
                                            className='rounded-full'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center'>
                                        <RiLockPasswordLine size={20} />
                                        <p className='ml-2'>Password</p>
                                    </FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Input
                                                disabled={isLoginLoading}
                                                placeholder='Your password'
                                                {...field}
                                                type={
                                                    isPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                className='rounded-full pr-10'
                                            />
                                            <div
                                                className='absolute right-[5%] top-[35%]'
                                                onClick={() => {
                                                    setIsPasswordVisible(
                                                        !isPasswordVisible
                                                    );
                                                }}
                                            >
                                                {isPasswordVisible ? (
                                                    <PiEye />
                                                ) : (
                                                    <PiEyeClosed />
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage>
                                        {loginError &&
                                            "Your email or password isn't correct"}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Submit button */}
                        <Button
                            disabled={isLoginLoading}
                            className='w-full'
                            type='submit'
                        >
                            {isLoginLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignInForm;
