import postgres from 'postgres'
import { env } from './env.js'

export const sql = postgres(env.databaseUrl, {
    max: 1,
    prepare: false,
})