import { z } from 'zod'

export const createShippingSchema = z.object({
    name: z.string().trim().min(1).max(255),
    price: z.number().min(0),
})

export const shippingParamSchema = z.object({
    id: z.coerce.number().int().positive()
})