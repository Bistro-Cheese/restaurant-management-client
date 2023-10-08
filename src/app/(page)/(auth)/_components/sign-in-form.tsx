'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import SplitComponent from './split-component'
import { useDispatchLogin } from '@/hooks/use-dispatch-login'

const formSchema = z.object({
    username: z.string().min(1, 'Username is require'),
    password: z
        .string()
        .min(1, 'Password is require')
        .min(8, 'Password must have than 8 characters')
})

const SignInForm = (): JSX.Element => {
    const { isLoading, dispatchLogin } = useDispatchLogin()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
        // Do something with the form values.
        dispatchLogin(values.username, values.password)
        // ✅ This will be type-safe and validated.
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="example@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Your password"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} className="w-full" type="submit">
                            Submit
                        </Button>
                    </form>
                    <SplitComponent isLogin={true} />
                </Form>
            </div>
        </div>
    )
}

export default SignInForm
