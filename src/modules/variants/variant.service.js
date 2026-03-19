import { pool } from "../../database/config/db.js";

export const updateStockVariantWarehouseService = async ({
  variant_id,
  warehouse_id,
  quantity,
}) => {
  await pool.query(
    "UPDATE stocks SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE variant_id = ? AND warehouse_id = ?",
    [quantity, variant_id, warehouse_id],
  );
  return { ok: true };
};
