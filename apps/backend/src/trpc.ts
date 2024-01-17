// import superjson from 'superjson'
import { initTRPC } from '@trpc/server'
import { OpenApiMeta } from 'trpc-openapi'
import { z, ZodError } from 'zod'

// export const transformer = superjson

export const t = initTRPC.meta<OpenApiMeta>().create({
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
export const appRouter = t.router({
    getUser: t.procedure
        // .meta({ /* 👉 */ openapi: { method: 'GET', path: '/say-hello' } })
        .input(z.string())
        .query((opts) => {
            opts.input
            return { id: opts.input, name: 'Bilbo' }
        }),
    createUser: t.procedure
        .input(z.object({ name: z.string().min(5) }))
        .mutation(async (opts) => {
            // use your ORM of choice
            return 'created!'
        }),
})
// export type definition of API
export type AppRouter = typeof appRouter
