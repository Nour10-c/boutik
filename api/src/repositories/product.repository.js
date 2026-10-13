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

export const findActiveProductBySlug = async (slug) => {
    const [product] = await sql`
      SELECT id, slug, name, description, price, stock
      FROM product
      WHERE slug = ${slug} AND active = true
    `
    return product
}

export const findImagesByProductId = (productId) => sql`
    SELECT link, position
    FROM product_image
    WHERE product_id = ${productId}
    ORDER BY position NULLS LAST, id
  `