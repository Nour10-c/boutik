import { apiFetch } from './api'

export const createCheckoutSession = (orderId, accessKey) =>
    apiFetch('/payments/checkout', {
        method: 'POST',
        body: { order_id: orderId, key: accessKey },
    })