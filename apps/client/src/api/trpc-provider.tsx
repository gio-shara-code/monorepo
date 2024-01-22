'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { api } from './api'
import { useAuthInfoStore } from '@/lib/store'

// NOTE tricky way to update the client header using global variable. info.token only does not update the headers.
let authToken = ''
export const setAuthToken = (token: string) => {
    authToken = token
}

export const TRPCProvider = ({
    children,
    cookies,
}: {
    children: ReactNode
    cookies: string
}) => {
    const { info } = useAuthInfoStore()
    const [queryClient] = useState(() => new QueryClient())

    const [trpcClient] = useState(() => {
        return api.createClient({
            links: [
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc`,
                    async headers() {
                        return {
                            cookie: cookies,
                            'x-trpc-source': 'react',
                            authorization: `Bearer ${authToken || info.token}`,
                        }
                    },
                }),
            ],
        })
    })
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </api.Provider>
    )
}
