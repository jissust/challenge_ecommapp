import { pool } from "../../database/config/db.js";
import { auditLog } from "../../utils/auditLog.js";

export const assignStockService = async ({
  variant_id,
  warehouse_id,
  quantity,
}) => {
  if (!variant_id || !warehouse_id) {
    throw new Error("variant_id and warehouse_id are required");
  }

  if (typeof quantity !== "number" || quantity < 0) {
    throw new Error("quantity must be a positive number");
  }

  const [[variant]] = await pool.query("SELECT id FROM variants WHERE id = ?", [
    variant_id,
  ]);

  if (!variant) {
    throw new Error("Variant not found");
  }

  const [[warehouse]] = await pool.query(
    "SELECT id FROM warehouses WHERE id = ?",
    [warehouse_id],
  );

  if (!warehouse) {
    throw new Error("Warehouse not found");
  }

  const [result] = await pool.query(
    `
    INSERT INTO stocks (variant_id, warehouse_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = ?
    `,
    [variant_id, warehouse_id, quantity, quantity],
  );
  
  const stockId = result.insertId;
  await auditLog(pool, {
    event: "STOCK_CREATED",
    entity: "stock",
    entityId: stockId,
    message: `Stock created for variant ${variant_id} in depot ${warehouse_id}.`,
  });

  return { ok: true, variant_id, warehouse_id, quantity };
};
