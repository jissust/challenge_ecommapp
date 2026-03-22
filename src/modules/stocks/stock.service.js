import { pool } from "../../database/config/db.js";

export const assignStockService = async ({
  variant_id,
  warehouse_id,
  quantity,
}) => {
  await pool.query(
    `
    INSERT INTO stocks (variant_id, warehouse_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = ?
    `,
    [variant_id, warehouse_id, quantity, quantity],
  );

  return { ok: true };
};
