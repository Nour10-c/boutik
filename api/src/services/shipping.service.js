import { findShippingOffers, findShippingCarriers, insertShippingMethods, findShippingOfferById } from '../repositories/shipping.repository.js'
import { AppError } from '../utils/errors.js'

export const listShippingMethods = async () => {
    const rows = await findShippingOffers()
    return rows.map((row) => ({
        id: row.id,
        name: row.name,
        price: Number(row.price),
    }))
}

export const listShippingCarriers = async () => {
    const rows = await findShippingCarriers()
    return rows.map((row) => ({
        id: row.id,
        name: row.name,
        offerId: row.offer_id,
    }))
}

export const createShippingMethods = async (data) => {
    try {
        const shipping = await insertShippingMethods(data)
        return shipping
    } catch (err) {
        if (err.code === '23505') {
            throw new AppError(409, 'SHIPPING_METHODS_ALREADY_EXISTS', 'Ce type de livraison existe déjà')
        }
            throw err
    } 
}

export const getShippingById = async (id) => {
    const shipping = await findShippingOfferById(id)
    if (!shipping) {
        throw new AppError('404', 'SHIPPING_METHOD_NOT_FOUND', "Mode de livraison introuvable")
    }
    return {
        id: shipping.id,
        name: shipping.name,
        price: shipping.price,
    }
}