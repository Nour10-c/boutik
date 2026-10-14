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