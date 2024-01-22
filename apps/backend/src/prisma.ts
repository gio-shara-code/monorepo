import { PrismaClient } from '@prisma/client'

export class PrismaSingleton {
    private static instance: PrismaClient
    private constructor() {}
    public static getInstance() {
        if (!PrismaSingleton.instance) {
            this.instance = new PrismaClient()
            return this.instance
        }

        return this.instance
    }
}
