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
        <div className='z-10 mx-auto mt-8 block w-full max-w-md rounded-lg bg-white/20  shadow-lg backdrop-blur-2xl'>
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
                                    <FormLabel className='flex items-center'>
                                        <RiUser3Line size={20} />
                                        <span className='ml-2 font-bold'>
                                            Username
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoginLoading}
                                            placeholder='Email adress'
                                            {...field}
                                            className='rounded-full bg-white'
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
                                                className='rounded-full bg-white pr-10'
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
                            className='w-full bg-gradient-primary text-xl font-bold text-tertiary'
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
