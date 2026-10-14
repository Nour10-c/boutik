import { apiFetch } from './api'

export const createOrder = (payload) => apiFetch('/orders', { method: 'POST', body: payload })

export const fetchOrder = (id, key) => apiFetch(`/orders/${id}`, { query: { key } })