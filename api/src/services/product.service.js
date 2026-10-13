import {
    findActiveProducts,
    findActiveProductBySlug,
    findImagesByProductId,
    insertProduct,
    updateProductById,
} from '../repositories/product.repository.js'
import { AppError } from '../utils/errors.js'

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

export const getProductBySlug = async (slug) => {
    const product = await findActiveProductBySlug(slug)
    if (!product) {
        throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Produit introuvable')
    }

    const images = await findImagesByProductId(product.id)

    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        images: images.map((image) => image.link),
        availability: getAvailability(product.stock),
    }
}

const toAdminProduct = (product, images) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    active: product.active,
    stock: product.stock,
    images,
})

export const createProduct = async (data) => {
    try {
        const product = await insertProduct(data)
        return toAdminProduct(product, data.images)
    } catch (err) {
        if (err.code === '23505') {
            throw new AppError(409, 'SLUG_ALREADY_EXISTS', 'Ce slug existe déjà')
        }
        throw err
    }
}

export const updateProduct = async (id, data) => {
    const { images, ...fields } = data

    const product = await updateProductById(id, fields, images)
    if (!product) {
        throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Produit introuvable')
    }

    const links = images ?? (await findImagesByProductId(id)).map((image) => image.link)
    return toAdminProduct(product, links)
}
