import { findShippingOffers } from '../repositories/shipping.repository.js'

export const listShippingMethods = async () => {
    const rows = await findShippingOffers()
    return rows.map((row) => ({
        id: row.id,
        name: row.name,
        price: Number(row.price),
    }))
}