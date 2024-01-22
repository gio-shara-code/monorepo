import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { publicProcedure, t } from '../trpc'
import { PrismaSingleton } from '../prisma'
import { config } from '../config'

export const authRouter = t.router({
    registerUsernamePassword: publicProcedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .output(z.string())
        .mutation(async (opts) => {
            const created = await PrismaSingleton.getInstance().authBase.create(
                {
                    data: {
                        password: opts.input.password,
                        username: opts.input.username,
                    },
                }
            )
            const payload = {
                id: created.id,
                username: created.username,
                createdAt: created.createdAt,
            }
            return jwt.sign(payload, config.RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
            })
        }),
    loginUsernamePassword: publicProcedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .output(z.string())
        .mutation(async (opts) => {
            const user =
                await PrismaSingleton.getInstance().authBase.findUnique({
                    where: {
                        username: opts.input.username,
                    },
                })
            if (!user) throw new Error('user not found')

            if (user.password !== opts.input.password)
                throw new Error('wrong password')

            const payload = {
                id: user.id,
                username: user.username,
                createdAt: user.createdAt,
            }
            return jwt.sign(payload, config.RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
            })
        }),
})
