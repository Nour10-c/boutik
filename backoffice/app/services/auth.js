import { apiFetch } from './api'

export const verifyToken = (token) =>
    apiFetch('/admin/verify', { headers: { Authorization: `Bearer ${token}` } })