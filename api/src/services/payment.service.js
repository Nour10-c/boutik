import { stripe } from '../config/stripe.js'
import { env } from '../config/env.js'
import { AppError } from '../utils/errors.js'

export const parseWebhookEvent = (rawBody, signature) => {
    if (!signature) {
        throw new AppError(400, 'MISSING_SIGNATURE', 'Signature Stripe manquante')
    }

    try {
        return stripe.webhooks.constructEvent(rawBody, signature, env.stripeWebhookSecret)
    } catch {
        throw new AppError(400, 'INVALID_SIGNATURE', 'Signature Stripe invalide')
    }
}