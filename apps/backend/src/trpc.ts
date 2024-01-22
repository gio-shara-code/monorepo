import { initTRPC, TRPCError } from '@trpc/server'
import { ZodError } from 'zod'
import jwt from 'jsonwebtoken'
import { config } from './config'
import * as trpcExpress from '@trpc/server/dist/adapters/express'

type JWTPayload = {
    id: string
    username: string
}

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    if (req.headers.authorization) {
        const authToken = req.headers.authorization?.split('Bearer ')[1]
        try {
            return {
                user: jwt.verify(
                    authToken,
                    config.RSA_PUBLIC_KEY
                ) as JWTPayload,
            }
        } catch (err) {
            console.error("authorization token couldn't be verified", err)
            return {}
        }
    }
    return {}
}

type Context = Awaited<ReturnType<typeof createContext>>

export const t = initTRPC.context<Context>().create({
    // transformer,
    errorFormatter(opts) {
        const { shape, error } = opts
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code === 'BAD_REQUEST' &&
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        }
    },
})
export const router = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(
    async function isAuthed(opts) {
        const { ctx } = opts

        if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })

        return opts.next({
            ctx: {
                user: ctx.user,
            },
        })
    }
)
