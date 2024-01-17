// import superjson from 'superjson'
import { initTRPC } from '@trpc/server'
import { z, ZodError } from 'zod'

// export const transformer = superjson

export const t = initTRPC.meta().create({
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
        .input(z.string())
        .output(z.object({ id: z.string(), name: z.string() }))
        .query((opts) => {
            opts.input
            return { id: opts.input, name: 'Love Trpc ❤️' }
        }),
    createUser: t.procedure
        .meta({ openapi: { method: 'POST', path: '/createUser' } })
        .input(z.object({ name: z.string().min(5) }))
        .mutation(async (opts) => {
            // use your ORM of choice
            console.log('opts', opts.input.name)
            return 'created!'
        }),
})
// export type definition of API
export type AppRouter = typeof appRouter
