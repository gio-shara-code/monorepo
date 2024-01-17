'use client'

import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from './trpc'

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
        trpc.createClient({
            links: [
                // @ts-ignore
                httpBatchLink({
                    url: 'http://localhost:4000/trpc',
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
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}
