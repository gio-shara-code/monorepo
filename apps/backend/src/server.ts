import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import cors from 'cors'
import { appRouter } from './routers'
import { createContext } from './trpc'

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
