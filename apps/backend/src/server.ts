import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { appRouter } from './trpc'
import cors from 'cors'
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context
type Context = Awaited<ReturnType<typeof createContext>>

const app = express()
app.use(cors())
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

const port = process.env.PORT || 4000
app.listen(port)
console.log(`🚀 Server ready at http://localhost:${port}`)
