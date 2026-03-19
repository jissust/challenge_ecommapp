import { pool } from "../../database/config/db.js";

export const createWarehouseService = async ({ code, name }) => {
  await pool.query(
    "INSERT INTO warehouses (code, name) VALUES (?, ?)",
    [code, name]
  );

  return { ok: true };
};