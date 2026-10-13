import { Hono } from 'hono'
import { sql } from '../config/db.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import { AppError } from '../utils/errors.js'

export const adminOrdersRoutes = new Hono()

adminOrdersRoutes.use('*', adminAuth)


adminOrdersRoutes.get('/', async (c) => {
    const orders = await sql`SELECT * FROM "order" ORDER BY date DESC`
    return c.json(orders)
})


adminOrdersRoutes.patch('/:id', async (c) => {
    const id = c.req.param('id')
    const { status, shipping_company } = await c.req.json()

    const [currentOrder] = await sql`SELECT * FROM "order" WHERE id = ${id}`
    if (!currentOrder) {
        throw new AppError(404, 'NOT_FOUND', 'Commande introuvable')
    }

    const targetStatus = status || currentOrder.status
    const targetCompany = shipping_company || currentOrder.shipping_company

    if (targetStatus === 'traitée') {
        const payments = await sql`
            SELECT * FROM payment WHERE order_id = ${id} AND status = 'réussi'
        `

        const isPaid = payments.length > 0 || currentOrder.status === 'payée'
        if (!isPaid) {
            throw new AppError(400, 'BAD_REQUEST', 'Impossible de passer en "traitée" : le paiement n\'est pas confirmé')
        }

        if (!targetCompany) {
            throw new AppError(400, 'BAD_REQUEST', 'Impossible de passer en "traitée" : aucun transporteur assigné')
        }
    }

    const [updated] = await sql`
        UPDATE "order" 
        SET status = ${targetStatus}, 
            shipping_company = ${targetCompany ?? currentOrder.shipping_company}
        WHERE id = ${id} 
        RETURNING *
    `

    return c.json(updated)
})