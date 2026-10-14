import { z } from 'zod'

export const checkoutSchema = z.object({
    order_id: z.number().int().positive(),
    key: z.string().uuid('Justificatif invalide'),
})