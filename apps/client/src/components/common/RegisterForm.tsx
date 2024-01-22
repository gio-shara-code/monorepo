'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/api/api'
import { faker } from '@faker-js/faker'
import { useAuthInfoStore } from '@/lib/store'
import { toast } from '@/components/ui/use-toast'
import { setAuthToken } from '@/api/trpc-provider'

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
})

export function RegisterForm() {
    const { setInfo } = useAuthInfoStore()
    const { mutateAsync, isLoading, isError } =
        api.authRouter.registerUsernamePassword.useMutation({
            onError: () => {
                toast({
                    title: 'Error',
                    description: 'Error registering.',
                    className: 'bg-red-500 text-white',
                })
            },
        })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: faker.internet.password(),
            username: faker.internet.userName(),
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const token = await mutateAsync({
            username: values.username,
            password: values.password,
        })
        toast({
            title: 'Success',
            description: 'Successfully registered.',
        })
        setAuthToken(token!)
        setInfo({
            token,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
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
                                    type={'password'}
                                    placeholder="shadcn"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button loading={isLoading} type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    )
}
