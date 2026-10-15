import { sql } from '../config/db.js'


export const runInTransaction = (callback) => sql.begin(callback)

export const findShippingOfferById = async (id) => {
    const [offer] = await sql`SELECT id, name, price FROM shipping_offer WHERE id = ${id}`
    return offer
}

export const findActiveProductsByIds = (ids) => sql`
    SELECT id, price, stock FROM product WHERE id IN ${sql(ids)} AND active = true
`

export const insertOrder = async (db, o) => {
    const [order] = await db`
        INSERT INTO "order"
            (email, address, city, zip, ref, date, total, status,
             shipping_offer_name, shipping_offer_price)
        VALUES
            (${o.email}, ${o.address}, ${o.city}, ${o.zip}, ${o.ref}, NOW(), ${o.total},
             'en attente', ${o.shippingOfferName}, ${o.shippingOfferPrice})
        RETURNING id, ref, access_key
    `
    return order
}


export const decrementStock = async (db, productId, quantity) => {
    const rows = await db`
        UPDATE product SET stock = stock - ${quantity}
        WHERE id = ${productId} AND stock >= ${quantity}
        RETURNING id
    `
    return rows.length > 0
}

export const insertOrderProduct = (db, orderId, line) => db`
    INSERT INTO order_product (order_id, product_id, quantity, paid_price)
    VALUES (${orderId}, ${line.product_id}, ${line.quantity}, ${line.paid_price})
`

export const findOrderByIdAndKey = async (id, key) => {
    const [order] = await sql`
        SELECT id, ref, email, address, city, zip, date, total, status,
               shipping_offer_name, shipping_offer_price, shipping_company, tracking_number,
               (SELECT p.status FROM payment p WHERE p.order_id = "order".id
                ORDER BY p.id DESC LIMIT 1) AS payment_status
        FROM "order" WHERE id = ${id} AND access_key = ${key}
    `
    return order
}

export const findOrderItems = (orderId) => sql`
    SELECT op.product_id, p.name, op.quantity, op.paid_price
    FROM order_product op
    JOIN product p ON p.id = op.product_id
    WHERE op.order_id = ${orderId}
    ORDER BY op.id
`

export const findAllOrders = () => sql`SELECT * FROM "order" ORDER BY date DESC, id DESC`

export const findOrderById = async (id) => {
    const [order] = await sql`SELECT * FROM "order" WHERE id = ${id}`
    return order
}

export const findPaymentsByOrderId = (orderId) => sql`
    SELECT * FROM payment WHERE order_id = ${orderId} ORDER BY id
`

export const findOrderByIdForUpdate = async (db, id) => {
    const [order] = await db`SELECT * FROM "order" WHERE id = ${id} FOR UPDATE`
    return order
}

export const updateOrderById = async (db, id, { status, shippingCompany, trackingNumber }) => {
    const [order] = await db`
        UPDATE "order" SET
            status = ${status},
            shipping_company = ${shippingCompany},
            tracking_number = ${trackingNumber}
        WHERE id = ${id}
        RETURNING *
    `
    return order
}

export const carrierExistsByName = async (db, name) => {
    const rows = await db`SELECT 1 FROM shipping_company_offer WHERE name = ${name}`
    return rows.length > 0
}