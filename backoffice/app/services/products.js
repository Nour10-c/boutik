import { adminFetch } from './api'

export const fetchAdminProducts = () => adminFetch('/admin/products')

export const updateProductStock = (id, stock) =>
    adminFetch(`/admin/products/${id}/stock`, { method: 'PATCH', body: { stock } })

export const updateProductActive = (id, active) =>
    adminFetch(`/admin/products/${id}`, { method: 'PATCH', body: { active } })

export const deleteProduct = (id) =>
    adminFetch(`/admin/products/${id}`, { method: 'DELETE' })

export const createProduct = (payload) =>
    adminFetch('/admin/products', { method: 'POST', body: payload })

export const updateProduct = (id, payload) =>
    adminFetch(`/admin/products/${id}`, { method: 'PATCH', body: payload })