import { z } from 'zod'
import { protectedProcedure, t } from '../trpc'
import { PrismaSingleton } from '../prisma'
import { Prisma, ProfileBase } from '@prisma/client'
export const userRouter = t.router({
    createUserProfile: protectedProcedure
        .input(z.object({ name: z.string().min(5) }))
        .output(z.string())
        .mutation(async (opts) => {
            const id = '1'

            await PrismaSingleton.getInstance().profileBase.create({
                data: {
                    name: opts.input.name,
                    authBase: {
                        connect: {
                            id,
                        },
                    },
                },
            })
            return 'ok'
        }),
    getMyProfile: protectedProcedure.query((opts) => {
        return PrismaSingleton.getInstance().profileBase.findUnique({
            where: {
                id: opts.ctx.user.id,
            },
            select: {
                name: true,
                id: true,
                updatedAt: true,
                createdAt: true,
            },
        })
    }),
    createProfile: protectedProcedure
        .input(
            z.object({ name: z.string().min(5), password: z.string().min(5) })
        )
        .mutation(async (opts) => {
            return PrismaSingleton.getInstance().profileBase.create({
                data: {
                    name: opts.input.name,
                    authBase: {
                        connect: {
                            id: opts.ctx.user.id,
                        },
                    },
                },
            })
        }),
})
