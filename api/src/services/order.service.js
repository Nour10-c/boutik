import { sql } from '../config/db.js'
import { AppError } from '../utils/errors.js'

export const prepareOrder = async ({ items, shipping_offer_id }) => {
    
    const [offer] = await sql`
        SELECT id, name, price FROM shipping_offer WHERE id = ${shipping_offer_id}
    `
    if (!offer) throw new AppError(400, 'BAD_REQUEST', 'Offre de livraison invalide')

  
    const quantities = new Map()
    for (const { product_id, quantity } of items) {
        quantities.set(product_id, (quantities.get(product_id) ?? 0) + quantity)
    }


    const ids = [...quantities.keys()]
    const products = await sql`
        SELECT id, price, stock FROM product WHERE id IN ${sql(ids)} AND active = true
    `

   
    let total = Number(offer.price)
    const lines = []
    for (const [product_id, quantity] of quantities) {
        const product = products.find((p) => p.id === product_id)
        if (!product) throw new AppError(400, 'BAD_REQUEST', `Produit #${product_id} introuvable ou inactif`)
        if ((product.stock ?? 0) < quantity) {
            throw new AppError(400, 'BAD_REQUEST', `Stock insuffisant pour le produit #${product_id}`)
        }
        const paid_price = Number(product.price)
        total += paid_price * quantity
        lines.push({ product_id, quantity, paid_price })
    }

    return { offer, lines, total: Math.round(total * 100) / 100 }
}
const generateRef = () => Math.floor(100000 + Math.random() * 900000)

export const createOrder = async (data) => {
    const { offer, lines, total } = await prepareOrder(data)
    const { email, address, city, zip } = data

    for (let attempt = 0; attempt < 5; attempt++) {
        try {
            return await sql.begin(async (tx) => {
                const [order] = await tx`
                    INSERT INTO "order"
                        (email, address, city, zip, ref, date, total, status,
                         shipping_offer_name, shipping_offer_price)
                    VALUES
                        (${email}, ${address}, ${city}, ${zip}, ${generateRef()}, NOW(), ${total},
                         'en attente', ${offer.name}, ${offer.price})
                    RETURNING id, ref, access_key
                `

                for (const line of lines) {
                    const updated = await tx`
                        UPDATE product SET stock = stock - ${line.quantity}
                        WHERE id = ${line.product_id} AND stock >= ${line.quantity}
                        RETURNING id
                    `
                    if (updated.length === 0) {
                        throw new AppError(400, 'BAD_REQUEST', `Stock insuffisant pour le produit #${line.product_id}`)
                    }

                    await tx`
                        INSERT INTO order_product (order_id, product_id, quantity, paid_price)
                        VALUES (${order.id}, ${line.product_id}, ${line.quantity}, ${line.paid_price})
                    `
                }

                return { order_id: order.id, ref: order.ref, access_key: order.access_key, total }
            })
        } catch (err) {
            if (err.code === '23505' && err.constraint_name === 'order_ref_unique') continue
            throw err
        }
    }
    throw new AppError(500, 'INTERNAL_ERROR', 'Impossible de créer la commande')
}
export const getOrderWithKey = async (id, key) => {
    const [order] = await sql`
        SELECT id, ref, email, address, city, zip, date, total, status,
               shipping_offer_name, shipping_offer_price, shipping_company, tracking_number
        FROM "order"
        WHERE id = ${id} AND access_key = ${key}
    `

    if (!order) {
        throw new AppError(404, 'NOT_FOUND', 'Commande introuvable')
    }

    const items = await sql`
        SELECT op.product_id, p.name, op.quantity, op.paid_price
        FROM order_product op
        JOIN product p ON p.id = op.product_id
        WHERE op.order_id = ${id}
        ORDER BY op.id
    `

    return { ...order, items }
}