import { createHash, timingSafeEqual } from 'node:crypto'
import { env } from '../config/env.js'
import { AppError } from '../utils/errors.js'

const hash = (value) => createHash('sha256').update(value).digest()

export const adminAuth = async (c, next) => {
    const header = c.req.header('Authorization') ?? ''
    const [scheme, token] = header.split(' ')

    const valid =
        scheme === 'Bearer' &&
        token &&
        timingSafeEqual(hash(token), hash(env.adminToken))

    if (!valid) {
        throw new AppError(401, 'UNAUTHORIZED', 'Token admin invalide ou manquant')
    }

    await next()
}