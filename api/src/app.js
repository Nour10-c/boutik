import { Hono } from 'hono'
import { AppError } from './utils/errors.js'

export const app = new Hono()

app.notFound((c) => {
    return c.json({ error: { code: 'NOT_FOUND', message: 'Route introuvable' } }, 404)
})

app.onError((err, c) => {
    if (err instanceof AppError) {
        return c.json({ error: { code: err.code, message: err.message } }, err.status)
    }

    console.error(err)
    return c.json({ error: { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' } }, 500)
})

// Pour tester
app.get('/', (c) => {
    return c.text('Hello Hono!')
})