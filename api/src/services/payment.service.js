import { stripe } from '../config/stripe.js'
import { env } from '../config/env.js'
import { AppError } from '../utils/errors.js'
import { getOrderWithKey } from './order.service.js'
import {
    findPaymentByOrderId,
    upsertPayment,
    confirmPayment,
    markPaymentFailed,
} from '../repositories/payment.repository.js'

const CURRENCY = 'eur'
const toCents = (value) => Math.round(Number(value) * 100)

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

export const createCheckoutSession = async (orderId, key) => {
    const order = await getOrderWithKey(orderId, key)

    if (order.status !== 'en attente') {
        throw new AppError(409, 'ORDER_NOT_PAYABLE', 'Cette commande a déjà été payée')
    }

    const lineItems = order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
            currency: CURRENCY,
            unit_amount: toCents(item.paid_price),
            product_data: { name: item.name },
        },
    }))

    if (toCents(order.shipping_offer_price) > 0) {
        lineItems.push({
            quantity: 1,
            price_data: {
                currency: CURRENCY,
                unit_amount: toCents(order.shipping_offer_price),
                product_data: { name: `Livraison - ${order.shipping_offer_name}` },
            },
        })
    }

    const amountInCents = lineItems.reduce(
        (sum, line) => sum + line.price_data.unit_amount * line.quantity,
        0,
    )

    const metadata = { order_id: String(order.id) }
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: order.email,
        line_items: lineItems,
        metadata,
        payment_intent_data: { metadata },
        success_url: `${env.frontendUrl}/orders/${order.id}?key=${key}`,
        cancel_url: `${env.frontendUrl}/cart`,
    })

    await upsertPayment({
        orderId: order.id,
        stripeRef: session.id,
        amount: amountInCents / 100,
        currency: CURRENCY,
    })

    return { url: session.url }
}

const getOrderId = (stripeObject) => {
    const orderId = Number(stripeObject.metadata?.order_id)
    return Number.isInteger(orderId) && orderId > 0 ? orderId : null
}

export const handleWebhookEvent = async (event) => {
    const stripeObject = event.data.object
    const orderId = getOrderId(stripeObject)
    if (!orderId) return

    if (event.type === 'checkout.session.completed') {
        if (stripeObject.payment_status !== 'paid') return

        const payment = await findPaymentByOrderId(orderId)
        if (!payment) return

        const sameAmount =
            toCents(payment.amount) === stripeObject.amount_total &&
            payment.currency === stripeObject.currency
        if (!sameAmount) {
            throw new AppError(400, 'AMOUNT_MISMATCH', 'Le montant Stripe ne correspond pas à la commande')
        }

        await confirmPayment(orderId, event.id)
        return
    }

    if (event.type === 'checkout.session.expired' || event.type === 'payment_intent.payment_failed') {
        await markPaymentFailed(orderId, event.id)
    }
}