'use client'
import { api } from '@/api/api'
import { Button } from '@/components/ui/button'
import { RegisterForm } from '@/components/common/RegisterForm'

export default function Home() {
    // const { data, isLoading } = api.getUser.useQuery('123234')
    // const {
    //     mutateAsync,
    //     isLoading: creatingUser,
    //     isSuccess,
    // } = api.createUser.useMutation()
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
        </main>
    )
}
