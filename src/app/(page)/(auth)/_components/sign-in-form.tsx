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

const SignInForm: React.FC = () => {
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
        <div className='z-10 mx-auto mt-8 block w-full max-w-md bg-white/90 drop-shadow-secondary'>
            <div className='h-full w-full p-8'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8 text-tertiary'
                    >
                        {/* Username */}
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center sm:text-lg'>
                                        <RiUser3Line className='text-[1.25em]' />
                                        <span className='ml-2 font-bold'>
                                            Username
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoginLoading}
                                            placeholder='Email adress'
                                            {...field}
                                            className='rounded-sm bg-white'
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
                                    <FormLabel className='flex items-center sm:text-lg'>
                                        <RiLockPasswordLine className='text-[1.25em]' />
                                        <p className='ml-2 font-bold'>
                                            Password
                                        </p>
                                    </FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Input
                                                disabled={isLoginLoading}
                                                placeholder='Password'
                                                {...field}
                                                type={
                                                    isPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                className='rounded-sm bg-white pr-10'
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
                            className='w-full rounded-sm text-lg font-bold text-tertiary sm:text-xl'
                            type='submit'
                        >
                            {isLoginLoading ? 'Loading...' : 'Log in'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignInForm;
