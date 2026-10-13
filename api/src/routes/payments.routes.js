import { Hono } from 'hono'
import { parseWebhookEvent } from '../services/payment.service.js'

export const paymentsRoutes = new Hono()

paymentsRoutes.post('/webhook', async (c) => {
    const rawBody = await c.req.text()
    const signature = c.req.header('stripe-signature')

    parseWebhookEvent(rawBody, signature)

    return c.json({ received: true })
})