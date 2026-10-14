import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { env } from './config/env.js'
import { AppError } from './utils/errors.js'
import { adminRoutes } from './routes/admin.routes.js'
import { productsRoutes } from './routes/products.routes.js'
import { shippingRoutes } from './routes/shipping.routes.js'
import { HTTPException } from 'hono/http-exception'
import { paymentsRoutes } from './routes/payments.routes.js'

import { ordersRoutes } from './routes/orders.routes.js'
import { adminOrdersRoutes } from './routes/admin.orders.routes.js'

export const app = new Hono()

app.use('*', cors({ origin: env.frontendUrl }))

app.notFound((c) => {
    return c.json({ error: { code: 'NOT_FOUND', message: 'Route introuvable' } }, 404)
})

app.onError((err, c) => {
    if (err instanceof AppError) {
        return c.json({ error: { code: err.code, message: err.message } }, err.status)
    }


    if (err instanceof HTTPException) {
        return c.json({ error: { code: 'BAD_REQUEST', message: err.message } }, err.status)
    }

    console.error(err)
    return c.json({ error: { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' } }, 500)

})

app.route('/admin', adminRoutes)
app.route('/admin/orders', adminOrdersRoutes)
app.route('/products', productsRoutes)

app.route('/shipping', shippingRoutes)
app.route('/payments', paymentsRoutes)

app.route('/orders', ordersRoutes)
