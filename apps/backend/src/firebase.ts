import * as firebaseAdmin from 'firebase-admin'
import { config } from './config'

class FirebaseSingleton {
    private static instance: firebaseAdmin.app.App
    private constructor() {}
    public static getInstance(): firebaseAdmin.app.App {
        if (!this.instance) {
            this.instance = firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert({
                    projectId: config.FIREBASE_PROJECT_ID,
                    privateKey: config.FIREBASE_PRIVATE_KEY,
                    clientEmail: config.FIREBASE_CLIENT_EMAIL,
                }),
            })
            return this.instance
        }
        return this.instance
    }
}
