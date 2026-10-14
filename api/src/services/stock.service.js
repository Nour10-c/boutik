import { updateStockById } from '../repositories/stock.repository.js'
import { AppError } from '../utils/errors.js'

export const getAvailability = (stock) => {
    if (!stock || stock <= 0) return 'out_of_stock'
    if (stock <= 10) return 'low_stock'
    return 'in_stock'
}

export const updateStock = async (id, stock) => {
    const product = await updateStockById(id, stock)
    if (!product) {
        throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Produit introuvable')
    }

    return {
        id: product.id,
        slug: product.slug,
        stock: product.stock,
        availability: getAvailability(product.stock),
    }
}