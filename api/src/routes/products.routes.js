import { Hono } from 'hono'
import { validate } from '../utils/validate.js'
import { listProductsSchema } from '../schemas/product.schema.js'
import { listProducts } from '../services/product.service.js'

export const productsRoutes = new Hono()

productsRoutes.get('/', validate('query', listProductsSchema), async (c) => {
    const { search } = c.req.valid('query')
    const products = await listProducts(search)
    return c.json(products)
})