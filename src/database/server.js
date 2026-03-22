import { pool } from "./config/db.js";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Conectado a MySQL");
    console.log([rows]);
  } catch (err) {
    console.error("Error conexión", err);
  }
}

testConnection();
