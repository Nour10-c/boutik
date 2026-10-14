import { apiFetch } from './api'

export const createOrder = (payload) => apiFetch('/orders', { method: 'POST', body: payload })