import { z } from 'zod'

export const listProductsSchema = z.object({
    search: z.string().trim().min(1).max(100).optional(),
})

export const productParamSchema = z.object({
    slug: z.string().trim().min(1).max(255),
})

export const createProductSchema = z.object({
    slug: z.string().trim().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug invalide (minuscules, chiffres et tirets)'),
    name: z.string().trim().min(1).max(255),
    description: z.string().trim().max(5000).nullable().default(null),
    price: z.number().min(0),
    active: z.boolean().default(true),
    stock: z.number().int().min(0).default(0),
    images: z.array(z.string().url().max(255)).max(10).default([]),
})

export const productIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
})

export const updateProductSchema = z
    .object({
        name: z.string().trim().min(1).max(255),
        description: z.string().trim().max(5000).nullable(),
        price: z.number().min(0),
        active: z.boolean(),
        images: z.array(z.string().url().max(255)).max(10),
    })
    .partial()
    .strict()
    .refine((data) => Object.keys(data).length > 0, 'Aucun champ à modifier')