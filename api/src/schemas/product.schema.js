import { z } from 'zod'

export const listProductsSchema = z.object({
    search: z.string().trim().min(1).max(100).optional(),
})

export const productParamSchema = z.object({
    slug: z.string().trim().min(1).max(255),
})