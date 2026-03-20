import { pool } from "../../database/config/db.js";

export const updateStockVariantWarehouseService = async ({
  variant_id,
  warehouse_id,
  quantity,
}) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(
      "UPDATE stocks SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE variant_id = ? AND warehouse_id = ?",
      [quantity, variant_id, warehouse_id],
    );

    const [rows] = await conn.query(
      "SELECT SUM(quantity) AS total FROM stocks WHERE variant_id = ?",
      [variant_id],
    );

    const totalStock = rows[0].total || 0;

    await conn.query("UPDATE variants SET stock_quantity = ? WHERE id = ?", [
      totalStock,
      variant_id,
    ]);

    await conn.commit();
    return { ok: true, totalStock };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
