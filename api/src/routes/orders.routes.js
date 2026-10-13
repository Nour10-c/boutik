import { Hono } from 'hono'
import { validate } from '../utils/validate.js'
import { createOrderSchema, orderIdParamSchema, orderKeyQuerySchema } from '../schemas/order.schema.js'
import { createOrder, getOrderWithKey } from '../services/order.service.js'

export const ordersRoutes = new Hono()


ordersRoutes.post('/', validate('json', createOrderSchema), async (c) => {
    const result = await createOrder(c.req.valid('json'))
    return c.json(result, 201)
})

ordersRoutes.get(
    '/:id',
    validate('param', orderIdParamSchema),
    validate('query', orderKeyQuerySchema),
    async (c) => {
        const { id } = c.req.valid('param')
        const { key } = c.req.valid('query')
        return c.json(await getOrderWithKey(id, key))
    },
)