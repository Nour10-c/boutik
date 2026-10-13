import { Hono } from 'hono'
import { listShippingMethods } from '../services/shipping.service.js'

export const shippingRoutes = new Hono()

shippingRoutes.get('/methods', async (c) => {
    const methods = await listShippingMethods()
    return c.json(methods)
})