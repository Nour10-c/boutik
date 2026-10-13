import { Hono } from 'hono'
import { validate } from '../utils/validate.js'
import { listProductsSchema, productParamSchema } from '../schemas/product.schema.js'
import { listProducts, getProductBySlug } from '../services/product.service.js'

export const productsRoutes = new Hono()

productsRoutes.get('/', validate('query', listProductsSchema), async (c) => {
    const { search } = c.req.valid('query')
    const products = await listProducts(search)
    return c.json(products)
})

productsRoutes.get('/:slug', validate('param', productParamSchema), async (c) => {
    const { slug } = c.req.valid('param')
    const product = await getProductBySlug(slug)
    return c.json(product)
})

