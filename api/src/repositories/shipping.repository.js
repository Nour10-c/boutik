import { sql } from '../config/db.js'

export const findShippingOffers = () => sql`
  SELECT id, name, price
  FROM shipping_offer
  ORDER BY price, id
`

export const findShippingCarriers = () => sql`
  SELECT sc.id, sc.name, so.name AS offer, sco.cost
  FROM shipping_company sc
  JOIN shipping_company_offer sco ON sco.company_id = sc.id
  JOIN shipping_offer so ON so.id = sco.offer_id
  ORDER BY sc.name, so.name
`
export const insertShippingMethods = (shippingMethods) => sql`
  INSERT INTO shipping_offer (name, price)
  VALUES (${shippingMethods.name}, ${shippingMethods.price})
  RETURNING id, name, price
`
export const findShippingOfferById = async (shippingId) => {
  const [shipping] = await sql`
  SELECT id, name, price
  FROM shipping_offer
  WHERE id = ${shippingId}
  `
  return shipping
}