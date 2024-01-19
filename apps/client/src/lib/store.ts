import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthInfo = {
    token: string | null
    enteredPwd: boolean
    address?: string
}

interface AuthInfoStore {
    info: AuthInfo
    setInfo: (info: Partial<AuthInfo>) => void
    getAuthContainerTitle: () => string
    telegramAccountExists: () => boolean
    userLoggedIn: () => boolean
}

export const useAuthInfoStore = create<AuthInfoStore>()(
    persist(
        (set, get) => ({
            info: {
                enteredPwd: false,
                token: null,
                address: '',
            },
            setInfo: (newInfo) => {
                set((old) => ({
                    info: {
                        ...old.info,
                        ...newInfo,
                    },
                }))
            },
            telegramAccountExists: () => {
                return get().info?.token !== null
            },
            userLoggedIn: () => {
                return (
                    get().telegramAccountExists() &&
                    get().info.enteredPwd &&
                    get().info.address?.trim().length !== 0
                )
            },
            getAuthContainerTitle: () => {
                if (!get().info.enteredPwd && !get().info.address)
                    return 'Welcome to Ninja Bet.'
                else if (!get().info.address) return 'Enter you invite Code'
                else return 'Create a password.'
            },
        }),
        {
            name: 'ninja.auth_store',
        }
    )
)
