import { router } from '../trpc'
import { authRouter } from './auth'
import { userRouter } from './user'

export const appRouter = router({
    userRouter,
    authRouter,
})

export type AppRouter = typeof appRouter
