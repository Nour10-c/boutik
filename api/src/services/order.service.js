import { AppError } from '../utils/errors.js'
import {
    runInTransaction,
    findShippingOfferById,
    findActiveProductsByIds,
    insertOrder,
    decrementStock,
    insertOrderProduct,
    findOrderByIdAndKey,
    findOrderItems,
    findAllOrders,
    findOrderById,
    findPaymentsByOrderId,
    findOrderByIdForUpdate,
    updateOrderById,
    carrierExistsByName,
} from '../repositories/order.repository.js'

const generateRef = () => Math.floor(100000 + Math.random() * 900000)

const MANAGEABLE_STATUSES = ['payée', 'traitée']

export const prepareOrder = async ({ items, shipping_offer_id }) => {
    const offer = await findShippingOfferById(shipping_offer_id)
    if (!offer) throw new AppError(400, 'BAD_REQUEST', 'Offre de livraison invalide')

    const quantities = new Map()
    for (const { product_id, quantity } of items) {
        quantities.set(product_id, (quantities.get(product_id) ?? 0) + quantity)
    }

    const products = await findActiveProductsByIds([...quantities.keys()])

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

export const createOrder = async (data) => {
    const { offer, lines, total } = await prepareOrder(data)

    for (let attempt = 0; attempt < 5; attempt++) {
        try {
            return await runInTransaction(async (tx) => {
                const order = await insertOrder(tx, {
                    email: data.email,
                    address: data.address,
                    city: data.city,
                    zip: data.zip,
                    ref: generateRef(),
                    total,
                    shippingOfferName: offer.name,
                    shippingOfferPrice: offer.price,
                })

                for (const line of lines) {
                    const ok = await decrementStock(tx, line.product_id, line.quantity)
                    if (!ok) {
                        throw new AppError(400, 'BAD_REQUEST', `Stock insuffisant pour le produit #${line.product_id}`)
                    }
                    await insertOrderProduct(tx, order.id, line)
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
    const order = await findOrderByIdAndKey(id, key)
    if (!order) throw new AppError(404, 'NOT_FOUND', 'Commande introuvable')
    return { ...order, items: await findOrderItems(id) }
}

export const listOrders = () => findAllOrders()

export const getOrderForAdmin = async (id) => {
    const order = await findOrderById(id)
    if (!order) throw new AppError(404, 'NOT_FOUND', 'Commande introuvable')
    const [items, payments] = await Promise.all([findOrderItems(id), findPaymentsByOrderId(id)])
    return { ...order, items, payments }
}

export const updateOrderAdmin = async (id, { status, shipping_company, tracking_number }) => {
    return runInTransaction(async (tx) => {
        const current = await findOrderByIdForUpdate(tx, id)
        if (!current) throw new AppError(404, 'NOT_FOUND', 'Commande introuvable')

        const targetStatus = status ?? current.status
        const targetCompany = shipping_company ?? current.shipping_company


        if (!MANAGEABLE_STATUSES.includes(current.status) || !MANAGEABLE_STATUSES.includes(targetStatus)) {
            throw new AppError(409, 'CONFLICT', `Impossible de passer de « ${current.status} » à « ${targetStatus} »`)
        }

        if (targetStatus === 'traitée' && !targetCompany) {
            throw new AppError(409, 'CONFLICT', 'Impossible de traiter une commande sans transporteur')
        }

        return updateOrderById(tx, id, {
            status: targetStatus,
            shippingCompany: targetCompany ?? null,
            trackingNumber: tracking_number ?? current.tracking_number,
        })
    })
}

export const assignShipping = async (id, { shipping_company, tracking_number }) => {
    return runInTransaction(async (tx) => {
        const current = await findOrderByIdForUpdate(tx, id)
        if (!current) throw new AppError(404, 'NOT_FOUND', 'Commande introuvable')

        if (!MANAGEABLE_STATUSES.includes(current.status)) {
            throw new AppError(409, 'CONFLICT', "Un transporteur ne peut être affecté qu'à une commande payée")
        }

        if (shipping_company !== undefined && !(await carrierExistsByName(tx, shipping_company))) {
            throw new AppError(400, 'BAD_REQUEST', 'Transporteur inconnu')
        }

        return updateOrderById(tx, id, {
            status: current.status,
            shippingCompany: shipping_company ?? current.shipping_company,
            trackingNumber: tracking_number ?? current.tracking_number,
        })
    })
}