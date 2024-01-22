import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/api/trpc-provider'
import { cookies } from 'next/headers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Whatever',
    description: 'Whatever template',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TRPCProvider cookies={cookies().toString()}>
                    {children}
                </TRPCProvider>
                <Toaster />
            </body>
        </html>
    )
}
