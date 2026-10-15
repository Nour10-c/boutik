import { adminFetch } from './api'

export const fetchAdminOrders = () => adminFetch('/admin/orders')

export const fetchAdminOrder = (id) => adminFetch(`/admin/orders/${id}`)

export const fetchCarriers = () => adminFetch('/admin/shipping/carriers')

export const updateOrderStatus = (id, status) =>
    adminFetch(`/admin/orders/${id}`, { method: 'PATCH', body: { status } })

export const updateOrderShipping = (id, payload) =>
    adminFetch(`/admin/orders/${id}/shipping`, { method: 'PATCH', body: payload })