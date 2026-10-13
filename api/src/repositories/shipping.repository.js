import { sql } from '../config/db.js'

export const findShippingOffers = () => sql`
  SELECT id, name, price
  FROM shipping_offer
  ORDER BY price, id
`