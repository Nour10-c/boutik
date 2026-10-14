import { z } from 'zod'

export const createOrderSchema = z.object({
    items: z
        .array(
            z.object({
                product_id: z.number().int().positive(),
                quantity: z.number().int().min(1).max(100),
            }),
        )
        .min(1, 'Le panier est vide'),
    email: z.string().trim().toLowerCase().email().max(255),
    address: z.string().trim().min(1).max(255),
    city: z.string().trim().min(1).max(255),
    zip: z.string().trim().regex(/^[0-9A-Za-z -]{3,10}$/, 'Code postal invalide'),
    shipping_offer_id: z.number().int().positive(),
})
export const orderIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
})

export const orderKeyQuerySchema = z.object({
    key: z.string().uuid('Justificatif invalide'),
})