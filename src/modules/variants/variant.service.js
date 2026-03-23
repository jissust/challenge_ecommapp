import { pool } from "../../database/config/db.js";
import { stockQueue } from "../../queues/stock.queue.js";

export const updateStockVariantWarehouseService = async ({
  variant_id,
  warehouse_id,
  quantity,
}) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    if (!variant_id || !warehouse_id) {
      throw new Error("variant_id and warehouse_id are required");
    }

    if (typeof quantity !== "number" || quantity < 0) {
      throw new Error("quantity must be a positive number");
    }

    const [result] = await conn.query(
      "UPDATE stocks SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE variant_id = ? AND warehouse_id = ?",
      [quantity, variant_id, warehouse_id],
    );

    if (result.affectedRows === 0) {
      throw new Error("Stock record not found");
    }

    const [rows] = await conn.query(
      "SELECT SUM(quantity) AS total FROM stocks WHERE variant_id = ?",
      [variant_id],
    );

    const totalStock = rows[0].total || 0;
    if (totalStock < 0) {
      throw new Error("Total stock cannot be negative");
    }
    
    await conn.query("UPDATE variants SET stock_quantity = ? WHERE id = ?", [
      totalStock,
      variant_id,
    ]);

    await conn.commit();

    await stockQueue.add(
      "sync-stock",
      {
        variant_id,
        totalStock,
      },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      },
    );

    return { ok: true, totalStock };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
