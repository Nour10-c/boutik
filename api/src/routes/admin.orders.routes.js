import { Hono } from 'hono'
import { adminAuth } from '../middlewares/adminAuth.js'
import { validate } from '../utils/validate.js'
import { orderIdParamSchema, updateOrderSchema } from '../schemas/order.schema.js'
import { listOrders, getOrderForAdmin, updateOrderAdmin } from '../services/order.service.js'

export const adminOrdersRoutes = new Hono()

adminOrdersRoutes.use('*', adminAuth)

// GET /admin/orders
adminOrdersRoutes.get('/', async (c) => c.json(await listOrders()))

// GET /admin/orders/:id
adminOrdersRoutes.get('/:id', validate('param', orderIdParamSchema), async (c) => {
    const { id } = c.req.valid('param')
    return c.json(await getOrderForAdmin(id))
})

// PATCH /admin/orders/:id
adminOrdersRoutes.patch(
    '/:id',
    validate('param', orderIdParamSchema),
    validate('json', updateOrderSchema),
    async (c) => {
        const { id } = c.req.valid('param')
        return c.json(await updateOrderAdmin(id, c.req.valid('json')))
    },
)