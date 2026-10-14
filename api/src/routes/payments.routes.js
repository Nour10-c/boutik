import { Hono } from 'hono'
import { validate } from '../utils/validate.js'
import { checkoutSchema } from '../schemas/payment.schema.js'
import {
    createCheckoutSession,
    parseWebhookEvent,
    handleWebhookEvent,
} from '../services/payment.service.js'

export const paymentsRoutes = new Hono()

paymentsRoutes.post('/checkout', validate('json', checkoutSchema), async (c) => {
    const { order_id, key } = c.req.valid('json')
    return c.json(await createCheckoutSession(order_id, key))
})

paymentsRoutes.post('/webhook', async (c) => {
    const rawBody = await c.req.text()
    const signature = c.req.header('stripe-signature')

    const event = parseWebhookEvent(rawBody, signature)
    await handleWebhookEvent(event)

    return c.json({ received: true })
})