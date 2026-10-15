import { apiFetch } from './api'

export const fetchShippingMethods = () => apiFetch('/shipping/methods')