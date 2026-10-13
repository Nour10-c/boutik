import { sql } from '../config/db.js'

export const findActiveProducts = (search) => sql`
  SELECT
    p.id,
    p.slug,
    p.name,
    p.description,
    p.price,
    p.stock,
    (
      SELECT pi.link
      FROM product_image pi
      WHERE pi.product_id = p.id
      ORDER BY pi.position NULLS LAST, pi.id
      LIMIT 1
    ) AS image
  FROM product p
  WHERE p.active = true
  ${search ? sql`AND p.name ILIKE ${'%' + search + '%'}` : sql``}
  ORDER BY p.id
`