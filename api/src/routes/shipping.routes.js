import { Hono } from 'hono'
import { listShippingMethods } from '../services/shipping.service.js'
import { shippingParamSchema } from '../schemas/shipping.schema.js'
import { getShippingById } from '../services/shipping.service.js'
import { validate } from '../utils/validate.js'

export const shippingRoutes = new Hono()

shippingRoutes.get('/methods', async (c) => {
    const methods = await listShippingMethods()
    return c.json(methods)
})

shippingRoutes.get('/methods/:id', validate('param', shippingParamSchema), async (c) => {
    const { id } = c.req.valid('param')
    const shippingById = await getShippingById(id)
    return c.json(shippingById)
})