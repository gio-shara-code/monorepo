'use client'
import Image from 'next/image'
import { api } from '@/api/api'

export default function Home() {
    const { data, isLoading } = api.getUser.useQuery('123234')
    const {
        mutateAsync,
        isLoading: creatingUser,
        isSuccess,
    } = api.createUser.useMutation()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {isLoading ? 'Loading...' : data?.name}

            {creatingUser && 'Creating user...'}

            <button
                onClick={async () => {
                    await mutateAsync({ name: 'FooBar' })
                }}
            >
                {isSuccess ? 'User Created!' : 'Create User'}
            </button>
        </main>
    )
}
