import { sql } from '../config/db.js'

export const updateStockById = async (id, stock) => {
    const [product] = await sql`
    UPDATE product
    SET stock = ${stock}
    WHERE id = ${id}
    RETURNING id, slug, stock
  `
    return product
}