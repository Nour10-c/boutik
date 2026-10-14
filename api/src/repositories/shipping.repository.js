import { sql } from '../config/db.js'

export const findShippingOffers = () => sql`
  SELECT id, name, price
  FROM shipping_offer
  ORDER BY price, id
`

export const findShippingCarriers = () => sql`
  SELECT id, name, offer_id
  FROM shipping_company_offer
  ORDER BY name
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