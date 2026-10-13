import { findActiveProducts } from '../repositories/product.repository.js'

export const getAvailability = (stock) => {
    if (!stock || stock <= 0) return 'out_of_stock'
    if (stock <= 10) return 'low_stock'
    return 'in_stock'
}

const toPublicProduct = (row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    image: row.image,
    availability: getAvailability(row.stock),
})

export const listProducts = async (search) => {
    const rows = await findActiveProducts(search)
    return rows.map(toPublicProduct)
}