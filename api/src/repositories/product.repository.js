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

export const insertProduct = (product) =>
    sql.begin(async (tx) => {
        const [created] = await tx`
        INSERT INTO product (slug, name, description, price, active, stock)
        VALUES (${product.slug}, ${product.name}, ${product.description}, ${product.price}, ${product.active}, ${product.stock})
        RETURNING id, slug, name, description, price, active, stock
      `

        if (product.images.length > 0) {
            const rows = product.images.map((link, position) => ({
                product_id: created.id,
                position,
                link,
            }))
            await tx`INSERT INTO product_image ${tx(rows, 'product_id', 'position', 'link')}`
        }

        return created
    })

export const updateProductById = (id, fields, images) =>
    sql.begin(async (tx) => {
        const hasFields = Object.keys(fields).length > 0

        const [product] = hasFields
            ? await tx`
                UPDATE product SET ${tx(fields)}
                WHERE id = ${id}
                RETURNING id, slug, name, description, price, active, stock
              `
            : await tx`
                SELECT id, slug, name, description, price, active, stock
                FROM product
                WHERE id = ${id}
              `

        if (!product) return undefined

        if (images) {
            await tx`DELETE FROM product_image WHERE product_id = ${id}`
            if (images.length > 0) {
                const rows = images.map((link, position) => ({ product_id: id, position, link }))
                await tx`INSERT INTO product_image ${tx(rows, 'product_id', 'position', 'link')}`
            }
        }

        return product
    })