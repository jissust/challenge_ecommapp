import { pool } from "../../database/config/db.js";
import { auditLog } from "../../utils/auditLog.js";

export const createProductService = async ({
  name,
  description,
  base_sku,
  variants,
}) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    if (!name) {
      throw new Error("Name is required");
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      throw new Error("Variants are required");
    }

    const [result] = await conn.query(
      "INSERT INTO products (name, description, base_sku) VALUES (?, ?, ?)",
      [name, description, base_sku],
    );

    const productId = result.insertId;

    for (const v of variants) {
      await conn.query(
        `INSERT INTO variants 
        (product_id, sku, title, color, size, price)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [productId, v.sku, v.title, v.color, v.size, v.price],
      );
    }

    await auditLog(conn, {
      event: "PRODUCT_CREATED",
      entity: "product",
      entityId: productId,
      message: `Product created with ${variants.length} variants`,
    });

    await conn.commit();

    return { ok: true, productId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
