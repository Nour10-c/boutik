import { Hono } from 'hono'
import { adminAuth } from '../middlewares/adminAuth.js'
import { validate } from '../utils/validate.js'
import {
    createProductSchema,
    updateProductSchema,
    productIdParamSchema,
} from '../schemas/product.schema.js'
import { createProduct, updateProduct, deleteProduct } from '../services/product.service.js'
import { updateStockSchema } from '../schemas/stock.schema.js'
import { updateStock } from '../services/stock.service.js'

export const adminRoutes = new Hono()

adminRoutes.use('*', adminAuth)

adminRoutes.get('/verify', (c) => c.json({ ok: true }))

adminRoutes.post('/products', validate('json', createProductSchema), async (c) => {
    const data = c.req.valid('json')
    const product = await createProduct(data)
    return c.json(product, 201)
})

adminRoutes.patch(
    '/products/:id',
    validate('param', productIdParamSchema),
    validate('json', updateProductSchema),
    async (c) => {
        const { id } = c.req.valid('param')
        const data = c.req.valid('json')
        const product = await updateProduct(id, data)
        return c.json(product)
    },
)

adminRoutes.delete('/products/:id', validate('param', productIdParamSchema), async (c) => {
    const { id } = c.req.valid('param')
    await deleteProduct(id)
    return c.body(null, 204)
})

adminRoutes.patch(
    '/products/:id/stock',
    validate('param', productIdParamSchema),
    validate('json', updateStockSchema),
    async (c) => {
        const { id } = c.req.valid('param')
        const { stock } = c.req.valid('json')
        const result = await updateStock(id, stock)
        return c.json(result)
    },
)