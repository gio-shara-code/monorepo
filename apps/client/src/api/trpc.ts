import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@whatever/backend'

export const trpc = createTRPCReact<AppRouter>()
