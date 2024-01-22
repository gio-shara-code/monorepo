'use client'
import { api } from '@/api/api'
import { Button } from '@/components/ui/button'
import { RegisterForm } from '@/components/common/RegisterForm'
import { useState } from 'react'

export default function Home() {
    // const { data, isLoading } = api.getUser.useQuery('123234')
    // const {
    //     mutateAsync,
    //     isLoading: creatingUser,
    //     isSuccess,
    // } = api.createUser.useMutation()
    const [fetchUser, setFetchUser] = useState(false)
    const { data } = api.userRouter.getMyProfile.useQuery(undefined, {
        enabled: fetchUser,
    })
    console.log('data', data)
    return (
        <main className={'page-base col-center'}>
            {/*{isLoading ? 'Loading...' : data?.name}*/}

            {/*{creatingUser && 'Creating user...'}*/}

            {/*<Button*/}
            {/*    onClick={async () => {*/}
            {/*        await mutateAsync({ name: 'FooBar' })*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {isSuccess ? 'User Created!' : 'Create User'}*/}
            {/*</Button>*/}
            <RegisterForm />
            <Button onClick={() => setFetchUser(true)}>Fetch User</Button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </main>
    )
}
