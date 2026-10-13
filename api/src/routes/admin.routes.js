import { Hono } from 'hono'
import { adminAuth } from '../middlewares/adminAuth.js'
import { validate } from '../utils/validate.js'
import { createProductSchema } from '../schemas/product.schema.js'
import { createProduct } from '../services/product.service.js'

export const adminRoutes = new Hono()

adminRoutes.use('*', adminAuth)

adminRoutes.get('/verify', (c) => c.json({ ok: true }))

adminRoutes.post('/products', validate('json', createProductSchema), async (c) => {
    const data = c.req.valid('json')
    const product = await createProduct(data)
    return c.json(product, 201)
})