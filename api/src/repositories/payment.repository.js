import { sql } from '../config/db.js'

export const findPaymentByOrderId = async (orderId) => {
    const [payment] = await sql`
    SELECT order_id, amount, currency, status FROM payment WHERE order_id = ${orderId}
  `
    return payment
}

export const upsertPayment = ({ orderId, stripeRef, amount, currency }) => sql`
  INSERT INTO payment (order_id, stripe_ref, amount, currency, status)
  VALUES (${orderId}, ${stripeRef}, ${amount}, ${currency}, 'en attente')
  ON CONFLICT (order_id) DO UPDATE
    SET stripe_ref = EXCLUDED.stripe_ref,
        amount = EXCLUDED.amount,
        currency = EXCLUDED.currency,
        status = 'en attente'
    WHERE payment.status <> 'réussi'
`

export const confirmPayment = (orderId, eventId) =>
    sql.begin(async (tx) => {
        const updated = await tx`
      UPDATE payment SET status = 'réussi', stripe_event_id = ${eventId}
      WHERE order_id = ${orderId}
        AND status <> 'réussi'
        AND stripe_event_id IS DISTINCT FROM ${eventId}
      RETURNING id
    `
        if (updated.length === 0) return false

        await tx`UPDATE "order" SET status = 'payée' WHERE id = ${orderId} AND status = 'en attente'`
        return true
    })

export const markPaymentFailed = (orderId, eventId) => sql`
  UPDATE payment SET status = 'échoué', stripe_event_id = ${eventId}
  WHERE order_id = ${orderId}
    AND status = 'en attente'
    AND stripe_event_id IS DISTINCT FROM ${eventId}
`