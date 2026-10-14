import { apiFetch } from './api'

export const fetchProducts = (search) =>
    apiFetch('/products', { query: search ? { search } : undefined })

export const fetchProduct = (slug) => apiFetch(`/products/${slug}`)