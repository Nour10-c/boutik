import { findShippingOffers, findShippingCarriers } from '../repositories/shipping.repository.js'

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