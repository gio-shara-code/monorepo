import { config } from '../src/config'
//@ts-ignore
import jwt from 'jsonwebtoken'

const authToken = jwt.sign({ id: 1 }, config.RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
})
console.log(`authToken: ${authToken}`)
const user = jwt.verify(authToken, config.RSA_PUBLIC_KEY)
// @ts-ignore
console.log(`user: ${user['id']}`)
// console.log(`user.id: ${user['id']}`)
