'use client'

import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { api } from './api'

export const TRPCProvider = ({
    children,
    cookies,
}: {
    children: ReactNode
    cookies: string
}) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        // @ts-ignore
        api.createClient({
            links: [
                // @ts-ignore
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc`,
                    // You can pass any HTTP headers you wish here
                    async headers() {
                        return {
                            cookie: cookies,
                            'x-trpc-source': 'react',
                        }
                    },
                }),
            ],
        })
    )
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </api.Provider>
    )
}
